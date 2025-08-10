import { Box, Flex, HStack, Text, Button, IconButton } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import type { UserProfile } from "../../types/types"

const BuildProfileRoles = () => {
  const navigate = useNavigate();

  // State for selections
  const [myRoles, setMyRoles] = useState<string[]>([]);
  const [neededRoles, setNeededRoles] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    const savedMyRoles = JSON.parse(localStorage.getItem('roles.mine') || '[]');
    const savedNeededRoles = JSON.parse(localStorage.getItem('roles.needed') || '[]');
    
    setMyRoles(savedMyRoles);
    setNeededRoles(savedNeededRoles);
  }, []);

  const roleSuggestions = [
    "Frontend Developer",
    "Backend Developer",
    "Full-Stack Developer",
    "Mobile Developer",
    "UI/UX Designer",
    "Product Manager",
    "Project Manager",
    "Data Scientist",
    "ML Engineer",
    "DevOps Engineer",
    "QA Tester",
    "Researcher",
    "Team Lead",
    "Content Designer",
  ];

  type Option = { label: string; value: string };

  const toOptions = (items: string[]): Option[] =>
    items.map((i) => ({ label: i, value: i }));

  const fromOptions = (options: readonly Option[] | null): string[] =>
    (options ?? []).map((o) => o.value);

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      minHeight: 40,
    }),
    valueContainer: (base: any) => ({ ...base, paddingLeft: 0 }),
    multiValue: (base: any) => ({
      ...base,
      background: "white",
      borderRadius: 999,
      paddingLeft: 6,
    }),
    multiValueLabel: (base: any) => ({ ...base, color: "#1a202c" }),
    multiValueRemove: (base: any) => ({ ...base, ':hover': { background: 'transparent', color: '#1a202c' } }),
    placeholder: (base: any) => ({ ...base, color: 'rgba(0,0,0,0.6)' }),
    indicatorsContainer: (base: any) => ({ ...base, display: 'none' }),
    input: (base: any) => ({ ...base, color: '#1a202c' }),
    menu: (base: any) => ({ ...base, zIndex: 5, backgroundColor: 'white' }),
    option: (base: any, state: any) => ({
      ...base,
      color: '#1a202c',
      backgroundColor: state.isFocused ? '#EDF2F7' : 'white',
      ':hover': {
        backgroundColor: '#EDF2F7',
      }
    }),
    singleValue: (base: any) => ({ ...base, color: '#1a202c' }),
  } as const;

  const saveRolesToFirestore = async (rolesData: Pick<UserProfile, "myRoles" | "neededRoles">) => {
    if (!auth.currentUser) throw new Error("no authenticated user");

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        myRoles: rolesData.myRoles || [],
        neededRoles: rolesData.neededRoles || [],
      });
      console.log("roles updated");
    } catch (error) {
      console.error("error updating roles:", error);
    }
  }

  const saveRolesData = async () => {
    localStorage.setItem('roles.mine', JSON.stringify(myRoles));
    localStorage.setItem('roles.needed', JSON.stringify(neededRoles));
    console.log("Roles data saved:", { myRoles, neededRoles });

    await saveRolesToFirestore({ myRoles, neededRoles });

    await addNewTagsToCategory("myRoles", myRoles);
    await addNewTagsToCategory("neededRoles", neededRoles);
  };

  async function addNewTagsToCategory(categoryId: string, newTags: string[]) {
  if (!auth.currentUser) throw new Error("No authenticated user");

  const categoryDocRef = doc(db, "tagCategories", categoryId);
  try {
    const categorySnapshot = await getDoc(categoryDocRef);
    const existingTags: string[] = categorySnapshot.data()?.tags || [];

    // Filter only new tags that don't exist yet
    const tagsToAdd = newTags.filter(tag => !existingTags.includes(tag));

    if (tagsToAdd.length > 0) {
      await updateDoc(categoryDocRef, {
        tags: arrayUnion(...tagsToAdd)
      });
      console.log(`Added new tags to ${categoryId}:`, tagsToAdd);
    }
  } catch (error) {
    console.error("Error updating tags:", error);
  }
}

  return (
    <Box w="100vw" minH="100vh" bg="white">
      {/* Top Navigation Tabs */}
      <Flex
        bg="#5A5EA7"
        h="60px"
        align="center"
        justify="space-evenly"
        color="white"
        fontWeight="bold"
      >
        <HStack gap={16}>
          {["Start", "Skills", "Roles", "Personality", "Status"].map((tab) => (
            <Text
              key={tab}
              cursor="pointer"
              transition="all 0.2s ease-in-out"
              _hover={{
                textDecoration: "underline",
                textUnderlineOffset: "6px",
                transform: "scale(1.1)",
              }}
              style={{
                textDecoration: tab === "Roles" ? "underline" : "none",
              }}
              onClick={() => {
                if (tab === "Start") navigate("/build/start");
                if (tab === "Skills") navigate("/build/skills");
                if (tab === "Roles") navigate("/build/roles");
                if (tab === "Personality") navigate("/build/personality");
                if (tab === "Status") navigate("/build/status");
              }}
            >
              {tab}
            </Text>
          ))}
        </HStack>
      </Flex>

      {/* Main Content - matches Figma stacked bars */}
      <Flex px={12} py={8} direction="column" align="center" gap={8} pb={12}>
        <Text fontSize="3xl" fontWeight="bold" color="black">
          What role do you play?
        </Text>
        <Text color="gray.600" maxW="720px" textAlign="center">
          and more importantly, what roles do you still need for your team?
        </Text>

        {/* My Role bar */}
        <Box w="100%" maxW="900px">
          <Text fontWeight="semibold" mb={2} color="black">
            My Role
          </Text>
          <Flex
            bg="#F7C6E0"
            borderRadius="md"
            minH="44px"
            align="center"
            justify="space-between"
            px={3}
          >
            <Box flex="1" pr={2}>
              <CreatableSelect
                isMulti
                options={toOptions(roleSuggestions)}
                value={toOptions(myRoles)}
                onChange={(opts) => setMyRoles(fromOptions(opts))}
                placeholder="Search or add roles..."
                styles={selectStyles}
              />
            </Box>
            <IconButton aria-label="search roles" variant="ghost">
              <Search size={18} />
            </IconButton>
          </Flex>
        </Box>

        {/* Needed Roles bar */}
        <Box w="100%" maxW="900px">
          <Text fontWeight="semibold" mb={2} color="black">
            Needed Roles
          </Text>
          <Flex
            bg="#BDE4F4"
            borderRadius="md"
            minH="44px"
            align="center"
            justify="space-between"
            px={3}
          >
            <Box flex="1" pr={2}>
              <CreatableSelect
                isMulti
                options={toOptions(roleSuggestions)}
                value={toOptions(neededRoles)}
                onChange={(opts) => setNeededRoles(fromOptions(opts))}
                placeholder="Search or add needed roles..."
                styles={selectStyles}
              />
            </Box>
            <IconButton aria-label="search needed roles" variant="ghost">
              <Search size={18} />
            </IconButton>
          </Flex>
        </Box>

        {/* Bottom actions */}
        <Flex justify="space-between" w="100%" maxW="900px" pt={6}>
          <Button
            bg="#5A5EA7"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            fontWeight="semibold"
            _hover={{ bg: "#4E529E" }}
            onClick={ async () => {
              await saveRolesData();
            }}
          >
            Save
          </Button>

          <Button
            color="black"
            fontWeight="medium"
            px={4}
            py={3}
            variant="ghost"
            _hover={{ textDecoration: "underline" }}
            onClick={ async () => {
              await saveRolesData();
              navigate("/build/personality");
            }}
          >
            Next →
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BuildProfileRoles;
