import { Box, Flex, HStack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BuildProfileSkills = () => {
  const navigate = useNavigate();

  // State for selections
  const [languages, setLanguages] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);

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

  // Toggle selection helper
  const toggleSelection = (
    item: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <Box w="100vw" h="100vh" bg="white">
      {/* Top Navigation Tabs */}
      <Flex
        bg="#5A5EA7"
        h="60px"
        align="center"
        justify="space-evenly"
        color="white"
        fontWeight="bold"
      >
        <HStack spacing={16}>
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
                if (tab === "Skills") {
                  navigate("/build-profile-skills"); // ✅ dash version
                } else {
                  navigate(`/build-profile/${tab.toLowerCase()}`);
                }
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
      <Flex px={12} py={8} direction="column" gap={8} align="center">
        {/* Title */}
        <Text fontSize="2xl" fontWeight="bold" color="black">
          Select Your Skills & Interests
        </Text>
        <Text maxW="600px" textAlign="center" color="black">
          We’ll do our best to find people who complement your existing skills & who are just as excited about a specific topic!
        </Text>

        {/* Languages */}
        <Box bg="#F7C6E0" p={4} borderRadius="md" w="100%" maxW="600px">
          <Text fontWeight="bold" mb={2} color="black">
            Programming Languages
          </Text>
          <Wrap>
            {languageOptions.map((lang) => (
              <WrapItem key={lang}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="md"
                  cursor="pointer"
                  bg={languages.includes(lang) ? "blue.500" : "white"}
                  color={languages.includes(lang) ? "white" : "black"}
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{
                    bg: languages.includes(lang) ? "blue.600" : "gray.100",
                  }}
                  onClick={() =>
                    toggleSelection(lang, languages, setLanguages)
                  }
                >
                  {lang}
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        {/* Tools */}
        <Box bg="#C9C7F5" p={4} borderRadius="md" w="100%" maxW="600px">
          <Text fontWeight="bold" mb={2} color="black">
            Tools
          </Text>
          <Wrap>
            {toolOptions.map((tool) => (
              <WrapItem key={tool}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="md"
                  cursor="pointer"
                  bg={tools.includes(tool) ? "blue.500" : "white"}
                  color={tools.includes(tool) ? "white" : "black"}
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{
                    bg: tools.includes(tool) ? "blue.600" : "gray.100",
                  }}
                  onClick={() => toggleSelection(tool, tools, setTools)}
                >
                  {tool}
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        {/* Interests */}
        <Box bg="#BDE4F4" p={4} borderRadius="md" w="100%" maxW="600px">
          <Text fontWeight="bold" mb={2} color="black">
            Interests
          </Text>
          <Wrap>
            {interestOptions.map((interest) => (
              <WrapItem key={interest}>
                <Box
                  px={3}
                  py={1}
                  borderRadius="md"
                  cursor="pointer"
                  bg={interests.includes(interest) ? "blue.500" : "white"}
                  color={interests.includes(interest) ? "white" : "black"}
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{
                    bg: interests.includes(interest)
                      ? "blue.600"
                      : "gray.100",
                  }}
                  onClick={() =>
                    toggleSelection(interest, interests, setInterests)
                  }
                >
                  {interest}
                </Box>
              </WrapItem>
            ))}
          </Wrap>
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
            onClick={() => {
              console.log("Languages:", languages);
              console.log("Tools:", tools);
              console.log("Interests:", interests);
            }}
          >
            Save
          </Box>

          <Box
            as="button"
            color="black"
            fontWeight="medium"
            px={4}
            py={3}
            _hover={{ textDecoration: "underline" }}
            cursor="pointer"
            onClick={() => navigate("/build-profile/roles")}
          >
            Next →
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BuildProfileSkills;
