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
import { useState, useRef } from "react";
import { LuSquareMinus, LuSquarePlus } from "react-icons/lu"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useNavigate } from "react-router-dom"


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

const initialCollection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
        id: "ROOT",
        name: "",
        children: [
            {
                id: "languages",
                name:"Programming Languages",
                children: [
                    { id: "languages/py", name: "Python" },
                    { id: "languages/js", name: "JavaSript"},
                    { id: "languages/cpp", name: "C++"},
                    { id: "languages/java", name: "Java"},
                    { id: "languages/ts", name: "TypeScript"},
                    { id: "languages/htmlcss", name: "HTML/CSS"}    
                ],
            },
            {
                id: "tools",
                name:"Tools",
                children: [
                    { id: "tools/git", name: "GitHub" },
                    { id: "tools/fig", name: "Figma"},
                    { id: "tools/firebase", name: "Firebase"},
                    { id: "tools/vscode", name: "VS Code"},
                    { id: "tools/react", name: "React"},
                    { id: "tools/node", name: "Node.js"}    
                ],
            },
            {
                id: "int",
                name:"Interests",
                children: [
                    { id: "int/bgfriendly", name: "Beginner Friendly" },
                    { id: "int/retail", name: "E-commerce/Retail"},
                    { id: "int/enterprise", name: "Enterprise"},
                    { id: "int/lifehacks", name: "Life Hacks"},
                    { id: "int/lowcode", name: "Low/No Code"},
                    { id: "int/mlai", name: "Machine Learning/AI"},
                    { id: "int/open", name: "Open-Ended"},
                    { id: "int/prod", name: "Productivity"},
                    { id: "int/health", name: "Health"}    
                ],
            },
        ]
    }
})

function ProfileCard({ name, techniEnv, track, tags, bio }: any) {
    const [showBio, setShowBio] = useState(false);

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
                    {techniEnv} | {track}
                </Text>

            </Flex>
                    
           
            <Flex wrap="wrap" gap={2} justify="center" mb={3}>
                {tags.map((tag: string, index:number) => (
                    <Badge key={index} bg="#2970c6ff" color="white" fontSize="sm" px={2} py={1} borderRadius="full">
                        {tag}
                    </Badge> 
                ))}
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
}

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

export default function DrawerFeature() {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const [collection, setCollection] = useState(initialCollection)
    const [query, setQuery] = useState("")

    const { contains } = useFilter({ sensitivity: "base" })

    const search = (search: string) => {
        setQuery(search)
        const nextCollection = initialCollection.filter((node) =>
        contains(node.name, search),
        )

        setCollection(nextCollection)

        setExpanded(nextCollection.getBranchValues())
    }

    const handleToggle = (nodeId: string) => {
        setExpanded((prev) =>
        prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]
        );
    };

    const handleCheck = (tagId: string) => {
        setSelectedTags((prev) =>
        prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
        );
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login")
        } catch (error: any) {
            alert(error.message)
        }
    };

    const profiles = [
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS", "filler", "filler", "filler", "filler"],
            bio: "beginner hacker interested in product design"
        },
    ];

    const filtProf = 
        selectedTags.length === 0
        ? profiles 
        : profiles.filter((profile) =>
            selectedTags.every((tag) => profile.tags.includes(tag))
        );

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
                    checkedValue={selectedTags}
                    onCheckedChange={(details) => {
                        setSelectedTags(details.checkedValue as string[]);
                    }}
                    expandedValue={expanded}
                    onExpandedChange={(details) => setExpanded(details.expandedValue)}
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
              <Button variant="outline">Cancel</Button>
              <Button>Apply</Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>

    </Box>
  );
}
