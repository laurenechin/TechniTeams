import {
    Box,
    Button,
    CloseButton,
    Drawer,
    Portal,
    Stack,
    type StackProps,
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
import { useState, useRef, forwardRef } from "react";
import { LuSquareMinus, LuSquarePlus } from "react-icons/lu"

const DrawerContainer = forwardRef<HTMLDivElement, StackProps>(
  function DrawerContainer(props, ref) {
    return (
      <Stack
        pos="relative"
        overflow="hidden"
        align="flex-start"
        p="8"
        w="100vw" 
        h="100vh"
        layerStyle="fill.subtle"
        outline="2px solid gray"
        ref={ref}
        {...props}
      />
    );
  }
);

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
            bg="white"
            shadow="md"
            w="300px"
        >
            <Flex align="center" mb={3}>
                <Avatar.Root>
                    <Avatar.Fallback name={name} />
                </Avatar.Root>
                <Box>
                    <Text fontWeight={"bold"}>{name}</Text>
                    <Text fontSize="sm" color="gray.500">
                        {techniEnv} | {track}
                    </Text>
                </Box>
            </Flex>

            <Flex wrap="wrap" gap={2} mb={3}>
                {tags.map((tag: string, index:number) => (
                    <Badge key={index} colorScheme="blue" px={2} py={1} borderRadius="full">
                        {tag}
                    </Badge> 
                ))}
            </Flex>

            {showBio && (
                <Text fontSize="sm" mb={3}>
                    {bio}
                </Text>
            )}
            <Button size="sm" onClick={() => setShowBio(!showBio)}>
                {showBio ? "hide bio" : "see bio"}
            </Button>
        </Box>
    );
}

function Dashboard() {
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
            tags: ["React", "HTML/CSS"],
            bio: "beginner hacker interested in product design"
        },
        {
            name: "Lauren Chin",
            techniEnv: "In-Person",
            track: "Beginner",
            tags: ["React", "HTML/CSS"],
            bio: "beginner hacker interested in product design"
        }
    ];

    return (
        <Box p={6} overflowY="auto" maxH="calc(100vh-100px)">
            <Flex wrap="wrap" gap={6} justify="flex-start">
                {profiles.map((profile, index) => (
                    <ProfileCard key={index} {...profile} />
                ))}
            </Flex>
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

return (
<>
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} closeOnInteractOutside={false}>
      <DrawerContainer ref={portalRef}>
        <Box mt={6}>
            <Dashboard />
        </Box>

        <Drawer.Trigger asChild>
          <Button variant="subtle" size="md" bg="#28a4fc" color="white" fontWeight={"semibold"}>
            Filter
          </Button>
        </Drawer.Trigger>
      </DrawerContainer>
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

    </>
  );
}
