import { Box, Flex, Text, Heading, VStack, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import type { UserProfile } from "../../types/types"

const ALL_OPTIONS = [
  "Collaborative • loves brainstorming",
  "Independent focus • deep work",
  "Planner • builds timelines",
  "Flexible • go-with-the-flow",
  "Detail-oriented • pixel/perf nitpicky",
  "Big-picture • strategy first",
  "Fast-paced • iterate quickly",
  "Thorough • quality over speed",
  "Early bird 🌅",
  "Night owl 🌙",
  "Prefers async (text/Slack)",
  "Prefers live calls/huddles",
  "Quiet workspace • heads down",
  "Talk-through ideas out loud",
  "Design-first • UX & visuals",
  "Code-first • prototype fast",
  "Risk-taking • experimenter",
  "Measured • minimize risk",
  "Mentor energy • guides others",
  "Learner mindset • asks Qs",
  "Ownership-heavy • takes charge",
  "Pair programming friendly"
];

const BuildProfilePersonality = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  // Load saved data when component mounts
  useEffect(() => {
    const savedPersonality = JSON.parse(localStorage.getItem('personality.tags') || '[]');
    setSelected(savedPersonality);
  }, []);

  const toggleSelection = (option: string) => {
    setSelected(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const savePersonalityToFirestore = async (personalityTags: Pick<UserProfile, "personality">) => {
    if (!auth.currentUser) throw new Error("No authenticated user");

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDocRef, {
      personality: personalityTags || [],
    });
    console.log("Personality updated");
  } catch (error) {
    console.error("Error updating personality:", error);
  }
  }
  const savePersonalityData = async () => {
    localStorage.setItem('personality.tags', JSON.stringify(selected));
    console.log("Personality data saved:", selected);

    await savePersonalityToFirestore({personality: selected});
  };

  return (
    <Box w="100vw" minH="100vh" bg="white">
      {/* Top Navigation Tabs */}
      <Flex bg="#5A5EA7" h="60px" align="center" justify="space-evenly" color="white" fontWeight="bold">
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
              style={{ textDecoration: tab === "Personality" ? "underline" : "none" }}
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

      {/* Content */}
      <VStack gap={6} px={8} py={10} align="center">
        <Heading size="2xl" color="black">
          Find people who get you.
        </Heading>
        <Text fontSize="lg" maxW="800px" textAlign="center" color="gray.700">
          Skills matter, but team dynamics do too. Pick the tags that best describe your working style 😌
        </Text>

        {/* Grid of pill tags matching Figma */}
        <Box w="100%" maxW="900px" bg="#F3EEFF" borderRadius="md" p={6}>
          <Text fontWeight="semibold" mb={4} color="black">
            Personality & Work Style
          </Text>
          <Box 
            display="grid" 
            gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))" 
            gap={3}
          >
            {ALL_OPTIONS.map((option) => {
              const isSelected = selected.includes(option);
              return (
                <Button
                  key={option}
                  size="lg"
                  borderRadius="full"
                  bg={isSelected ? "#5A5EA7" : "white"}
                  color={isSelected ? "white" : "black"}
                  border="1px solid"
                  borderColor={isSelected ? "#5A5EA7" : "#E2E8F0"}
                  cursor="pointer"
                  onClick={() => toggleSelection(option)}
                  _hover={{
                    bg: isSelected ? "#4E529E" : "#F7FAFC",
                    transform: "scale(1.02)",
                  }}
                  transition="all 0.2s ease-in-out"
                  fontWeight="medium"
                  fontSize="sm"
                  py={3}
                  px={4}
                  textAlign="left"
                  justifyContent="flex-start"
                >
                  {option}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* Bottom actions */}
        <Flex justify="space-between" w="100%" maxW="900px" pt={4}>
          <Button
            bg="#5A5EA7"
            color="white"
            px={6}
            py={3}
            borderRadius="md"
            fontWeight="semibold"
            _hover={{ bg: "#4E529E" }}
            onClick={async () => {
              await savePersonalityData();
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
            onClick={async () => {
              await savePersonalityData();
              navigate("/build/status");
            }}
          >
            Next →
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default BuildProfilePersonality;
