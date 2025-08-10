import {
    Box,
    Button,
    CloseButton,
    Drawer,
    Portal,
    Stack,
    Checkmark,
    TreeView,
    createTreeCollection,
    useTreeViewNodeContext,
    useFilter,
    Input,
    Highlight,
    Avatar, 
    Text, 
    Badge, 
    Flex
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { LuSquareMinus, LuSquarePlus } from "react-icons/lu"
import { signOut } from "firebase/auth"
import { auth, db } from "../../firebase"
import { useNavigate } from "react-router-dom"
import { collection as firestoreCollection, getDocs } from "firebase/firestore";
import type { UserProfile } from "../../types/types";

const TreeNodeCheckbox = (props: TreeView.NodeCheckboxProps) => {
    const nodeState = useTreeViewNodeContext()
    return (
        <TreeView.NodeCheckbox aria-label="check node" {...props}>
            <Checkmark
                bg={{
                    base: "bg",
                    _checked: "colorPalette.solid",
                    _indeterminate: "colorPalette.solid",
                }}
                size="sm"
                checked={nodeState.checked === true}
                indeterminate={nodeState.checked === "indeterminate"}
            />
        </TreeView.NodeCheckbox>
    )
}

interface Node {
    id: string
    name: string
    children?: Node[]
}

const categoryColors: Record<string, string> = {
  languages: "#10B981",       
  tools: "#3B82F6",           
  myRoles: "#8B5CF6",         
  interests: "#8B5CF6",        
  personality: "#EC4899",     
  searchingStatus: "#F59E0B", 
  ideaStatus: "#EF4444",      
  default: "#2970c6ff",       
};

function ProfileCard({ name, environment, track, tags, bio }: any) {
    const [showBio, setShowBio] = useState(false);

    const getTagColor = (tag: string) => {
        const prefix = tag.includes('/') ? tag.split('/')[0] : null;
        const color = prefix && categoryColors[prefix] ? categoryColors[prefix] : categoryColors.default;
        return color;
    };

    const tagDisplayNames: Record<string, string> = {
    "myRoles/projectmanager": "Project Manager",
    "myRoles/mobiledeveloper": "Mobile Developer",
    "interests/ui/uxdesigner": "UI/UX Designer",
    "interests/ecommerce/retail": "E-Commerce / Retail",
    "interests/machinelearning/ai": "Machine Learning/AI",
    "interests/low/nocode": "Low/No Code",
    };

    function originalTagName(tag: string) {
        if (tagDisplayNames[tag]) {
            return tagDisplayNames[tag];
    }

    if (!tag.includes("/")) return capitalizeWords(tag);
        const afterSlash = tag.split("/").slice(1).join("/");
    return capitalizeWords(afterSlash);
    }

    function capitalizeWords(text: string) {
        return text
        .split(/[\s\/]+/) // split on space or slash
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            shadow="md"
            w="280px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            bg="whiteAlpha.900"
        >
            <Flex align="center" direction="column" mb={3}>
                <Avatar.Root mb={3} size="2xl">
                    <Avatar.Fallback name={name} />
                </Avatar.Root>
                <Text fontWeight={"bold"} textAlign="center" fontSize="lg">{name}</Text>
                <Text fontSize="md" color="gray.500" textAlign="center">
                    {environment} | {track}
                </Text>

            </Flex>
                    
           
            <Flex wrap="wrap" gap={2} justify="center" mb={3}>
                {tags.map((tag: string, index:number) => {
                return (
                <Badge key={index} bg={getTagColor(tag)} color="white" fontSize="sm" px={2} py={1} borderRadius="full">
                    {originalTagName(tag)}
                </Badge>
                )
            })}

            </Flex>

            {showBio && (
                <Text fontSize="sm" mb={3} mt={3} color="gray.800">
                    {bio}
                </Text>
            )}
            <Text as="button" alignSelf="flex-end" mt={3} fontSize="sm" color="gray.800" _hover={{ textDecoration: "underline" }} onClick={() => setShowBio(!showBio)}>
                {showBio ? "hide bio" : "see bio"}
            </Text>
        </Box>
    );
};

function Dashboard({profiles}: { profiles: any[] }) {
    return (
        <Box p={8} overflowY="auto" h="100vh" bg="transparent" mx="auto">
            <Flex direction="column" align="center" mb={8}>
                <Box textAlign="center">
                    <Text fontSize="5xl" fontWeight="black" color="#5A5EA7">
                        Dashboard
                    </Text>
                    <Text fontSize="xl" fontWeight="semibold" color="#5A5EA7" mb={20}>
                        Browse hacker profiles we think you'd match perfectly with!
                    </Text>
                </Box>
            </Flex>

            <Box maxH="70vh" overflowY="auto">
                <Flex wrap="wrap" gap={6} justify="center" align="flex-start">
                    {profiles.map((profile, index) => (
                        <ProfileCard key={index} {...profile} />
                    ))}
                </Flex>
            </Box>
        </Box>
    )
}

const fetchTagCategories = async () => {
  const querySnapshot = await getDocs(firestoreCollection(db, "tagCategories"));
  const categories: { id: string; name: string; tags: string[] }[] = [];
  
  querySnapshot.forEach(doc => {
    const data = doc.data();
    categories.push({
      id: doc.id,
      name: data.name,
      tags: data.tags || []
    });
  });

  return categories;
}

const fixedStatusTags = [
  {
    id: "searchingStatus",
    name: "Searching Status",
    tags: ["Solo", "Have Small Group"]
  },
  {
    id: "ideaStatus",
    name: "Idea Status",
    tags: ["Have an idea", "Open to ideas"]
  }
];

const buildTreeCollection = (categories: { id: string; name: string; tags: string[] }[]) => {
  const filteredCategories = categories.filter(
    (cat) => cat.id !== "searchingStatus" && cat.id !== "ideaStatus"
  );

  const mergedCategories = [...filteredCategories, ...fixedStatusTags];

  return createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: "ROOT",
      name: "",
      children: mergedCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        children: cat.tags.map((tag) => ({
            id: `${cat.id}/${tag.toLowerCase().replace(/\s+/g, "")}`,
            name: tag,
        })),
    })),
    },
  });
};

export default function DrawerFeature() {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [profiles, setProfiles] = useState<UserProfile[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const [tempSelectedTags, setTempSelectedTags] = useState<string[]>([]);
    const [collection, setCollection] = useState(() =>
        createTreeCollection<Node>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: { id: "ROOT", name: "", children: [] }
    })
);
    const [query, setQuery] = useState("")

    const { contains } = useFilter({ sensitivity: "base" })

    useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(firestoreCollection(db, "users"));
        const fetchedProfiles: UserProfile[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProfiles.push({
            name: data.name,
            environment: data.environment,
            track: data.track,
            bio: data.bio,
            languages: data.languages,
            tools: data.tools,
            interests: data.interests,
            myRoles: data.myRoles,
            neededRoles: data.neededRoles,
            personality: data.personality,
            ideaStatus: data.ideaStatus,
            searchingStatus: data.searchingStatus,
            profileImage: data.profileImage,
            tags: [
                ...(Array.isArray(data.languages) ? data.languages.map((t: string) => `languages/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
                ...(Array.isArray(data.tools) ? data.tools.map((t: string) => `tools/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
                ...(Array.isArray(data.interests) ? data.interests.map((t: string) => `interests/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
                ...(Array.isArray(data.myRoles) ? data.myRoles.map((t: string) => `myRoles/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
                ...(Array.isArray(data.personality) ? data.personality.map((t: string) => `personality/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
                ...(Array.isArray(data.ideaStatus) ? data.ideaStatus.map((t: string) => `ideaStatus/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
                ...(Array.isArray(data.searchingStatus) ? data.searchingStatus.map((t: string) => `searchingStatus/${t.toLowerCase().replace(/\s+/g, "")}`) : []),
            ]
          });
        });
        
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

    useEffect(() => {
        const loadTags = async () => {
            try {
                const categories = await fetchTagCategories();
                const newCollection = buildTreeCollection(categories);
                setCollection(newCollection);
                setExpanded(newCollection.getBranchValues());
            } catch (error) {
                console.error("Failed to load tag categories:", error);
            }
  };
  loadTags();
}, []);

    const search = (searchTerm: string) => {
        setQuery(searchTerm);

        const nextCollection = collection.filter(node => contains(node.name, searchTerm));

        setCollection(nextCollection);
        setExpanded(nextCollection.getBranchValues());
    };

    console.log("Selected Tags:", selectedTags);
    console.log("Profiles sample tags:", profiles[0]?.tags);

    const filtProf = selectedTags.length === 0
    ? profiles
    : profiles.filter(profile =>
      selectedTags.every(selTag => {
        const selTagSuffix = selTag.includes("/")
          ? selTag.split("/").slice(1).join("/").toLowerCase().trim()
          : selTag.toLowerCase().trim();

        return profile.tags?.some(profileTag => {
          const profileTagSuffix = profileTag.includes("/")
            ? profileTag.split("/").slice(1).join("/").toLowerCase().trim()
            : profileTag.toLowerCase().trim();

          return profileTagSuffix === selTagSuffix;
        }) ?? false;
      })
    );




    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login")
        } catch (error: any) {
            alert(error.message)
        }
    };

return (
<Box minH="100vh" bg="linear-gradient(to right, #9CE8FF, #F2B0DE)">
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} closeOnInteractOutside={false}>

        <Box position="relative">
            <Box position="absolute" top={48} left={40} zIndex={2}>
                <Drawer.Trigger asChild>
                    <Button variant="subtle" size="md" bg="#28a4fc" color="white" fontWeight={"semibold"}>
                    Filter by Tags
                    </Button>
                </Drawer.Trigger>
            </Box>

             <Box position="absolute" top={6} right={6} zIndex={2}>
                    <Button 
                    onClick={handleLogout}
                    variant="subtle" 
                    size="md" 
                    bg="#b71a63ff" 
                    color="white" 
                    fontWeight={"semibold"}>
                    Log Out
                    </Button>
            </Box>
            
            <Box position="absolute" top={6} right={32} zIndex={2}>
                <Button
                    onClick={() => navigate("/build/congrats")}
                    variant="subtle"
                    size="md"
                    bg="#137b5cff"
                    color="white"
                    fontWeight="semibold"
                >
                    See Profile
                </Button>
            </Box>

            <Dashboard profiles={filtProf}/>
        </Box>

      <Portal container={portalRef}>
        <Drawer.Backdrop pos="absolute" boxSize="full" />
        <Drawer.Positioner pos="absolute" boxSize="full">
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Filter by Tags</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
                <Stack gap="3">
                <Input
                    size="sm"
                    placeholder="Search for tags: 'Python'"
                    onChange={(e) => search(e.target.value)}
                />

                <TreeView.Root 
                    collection={collection} 
                    maxW="sm" 
                    defaultCheckedValue={[]}
                    expandedValue={expanded}
                    onExpandedChange={(details) => setExpanded(details.expandedValue)}
                    checkedValue={tempSelectedTags}
                    onCheckedChange={(details) => {
                    setTempSelectedTags(details.checkedValue as string[]);
  }}
                >
                    <TreeView.Label>Tag Category</TreeView.Label>
                    <TreeView.Tree>
                    <TreeView.Node
                        render={({ node, nodeState }) =>
                            nodeState.isBranch ? (
                                <TreeView.BranchControl role="none">
                                    {nodeState.expanded ? <LuSquareMinus /> : <LuSquarePlus />}
                                    <TreeView.BranchText>
                                        <Highlight
                                            query={[query]}
                                            styles={{ bg: "gray.emphasized" }}
                                        > 
                                            {node.name}
                                        </Highlight>
                                    </TreeView.BranchText>
                                </TreeView.BranchControl>  
                            ) : (
                                <TreeView.Item>
                                    <TreeNodeCheckbox />
                                    <TreeView.ItemText>
                                        <Highlight
                                            query={[query]}
                                            styles={{ bg: "gray.emphasized" }}
                                        >
                                            {node.name}
                                        </Highlight>
                                    </TreeView.ItemText>
                                </TreeView.Item>
                            )
                        }
                    />
                    </TreeView.Tree>
                </TreeView.Root>
                </Stack>

            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline"
                onClick={() => {
                    setSelectedTags([]);
                  }}>Clear</Button>
              <Button onClick={() => {
                    setSelectedTags(tempSelectedTags);
                    setOpen(false);
                }}>Apply</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>

    </Box>
  );
}
