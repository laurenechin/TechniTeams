import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import type { UserProfile } from "../../types/types"

const BuildProfileSkills = () => {
  const navigate = useNavigate();

  // State for selections
  const [languages, setLanguages] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    const savedLanguages = JSON.parse(localStorage.getItem('skills.languages') || '[]');
    const savedTools = JSON.parse(localStorage.getItem('skills.tools') || '[]');
    const savedInterests = JSON.parse(localStorage.getItem('skills.interests') || '[]');
    
    setLanguages(savedLanguages);
    setTools(savedTools);
    setInterests(savedInterests);
  }, []);
  // Options
  const languageOptions = ["Python", "JavaScript", "C++", "Java", "TypeScript", "HTML/CSS"];
  const toolOptions = ["GitHub", "Figma", "Firebase", "VS Code", "React", "Node.js"];
  const interestOptions = [
    "Beginner Friendly",
    "E-commerce/Retail",
    "Enterprise",
    "Lifehacks",
    "Low/No Code",
    "Machine Learning/AI",
    "Open Ended",
    "Productivity",
  ];

  type Option = { label: string; value: string };
  const toOptions = (items: string[]): Option[] => items.map((i) => ({ label: i, value: i }));
  const fromOptions = (options: readonly Option[] | null): string[] => (options ?? []).map((o) => o.value);

  const selectStyles = {
    control: (base: any) => ({
      ...base,
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      minHeight: 44,
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

  const saveSkillsToFirestore = async (profileData: Pick<UserProfile, 'languages' | 'tools' | 'interests'>) => {
    if (!auth.currentUser) throw new Error ("No authenticated user");

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        languages: profileData.languages || [],
        tools: profileData.tools || [],
        interests: profileData.interests || [],
      });
      console.log("skills and interests updated")
    } catch (error) {
      console.error("error updating skills:", error);
    }
  }
  const saveSkillsData = async () => {
    localStorage.setItem('skills.languages', JSON.stringify(languages));
    localStorage.setItem('skills.tools', JSON.stringify(tools));
    localStorage.setItem('skills.interests', JSON.stringify(interests));
    console.log("Skills data saved:", { languages, tools, interests });

    try {
      await saveSkillsToFirestore({ languages, tools, interests });
    } catch (error) {
      console.error("failed to save skills to firestore", error)
    }
    
    await addNewTagsToCategory("languages", languages);
    await addNewTagsToCategory("tools", tools);
    await addNewTagsToCategory("interests", interests);
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
              onClick={() => {
                if (tab === "Start") navigate("/build/start");
                if (tab === "Skills") navigate("/build/skills");
                if (tab === "Roles") navigate("/build/roles");
                if (tab === "Personality") navigate("/build/personality");
                if (tab === "Status") navigate("/build/status");

              }}
              style={{
                textDecoration: tab === "Skills" ? "underline" : "none",
              }}
            >
              {tab}
            </Text>
          ))}
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex px={12} py={8} direction="column" gap={8} align="center" pb={12}>

        {/* Title */}
        <Text fontSize="2xl" fontWeight="bold" color="black">
          Select Your Skills & Interests
        </Text>
        <Text maxW="600px" textAlign="center" color="black">
          We'll do our best to find people who complement your existing skills & who are just as excited about a specific topic!
        </Text>

        {/* Languages - Figma bar with chips and search */}

        <Box bg="#F7C6E0" p={4} borderRadius="md" w="100%" maxW="600px">
          <Text fontWeight="bold" mb={2} color="black">
            Programming Languages
          </Text>
          <CreatableSelect
            isMulti
            options={toOptions(languageOptions)}
            value={toOptions(languages)}
            onChange={(opts) => setLanguages(fromOptions(opts))}
            placeholder="Search or add languages..."
            styles={selectStyles}
          />

        </Box>

        {/* Tools */}
        <Box bg="#C9C7F5" p={4} borderRadius="md" w="100%" maxW="600px">
          <Text fontWeight="bold" mb={2} color="black">
            Tools
          </Text>
          <CreatableSelect
            isMulti
            options={toOptions(toolOptions)}
            value={toOptions(tools)}
            onChange={(opts) => setTools(fromOptions(opts))}
            placeholder="Search or add tools..."
            styles={selectStyles}
          />

        </Box>

        {/* Interests */}
        <Box bg="#BDE4F4" p={4} borderRadius="md" w="100%" maxW="600px">
          <Text fontWeight="bold" mb={2} color="black">
            Interests
          </Text>
          <CreatableSelect
            isMulti
            options={toOptions(interestOptions)}
            value={toOptions(interests)}
            onChange={(opts) => setInterests(fromOptions(opts))}
            placeholder="Search or add interests..."
            styles={selectStyles}
          />

        </Box>

        {/* Buttons */}
        <Flex justify="space-between" w="100%" maxW="600px" pt={4}>
          <Box
            as="button"
            bg="#5A5EA7"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            fontWeight="semibold"
            _hover={{ bg: "#4E529E" }}
            cursor="pointer"
            onClick={async () => {
              await saveSkillsData();
            }}
          >
            Save
          </ Box>

          <Box
            as="button"
            color="black"
            fontWeight="medium"
            px={4}
            py={3}
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
            onClick={() => {
              saveSkillsData();
              navigate("/build/roles");
            }}
          >
            Next →
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BuildProfileSkills;
