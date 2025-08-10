import { Box, Flex, HStack, Text, VStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BuildProfileStatus = () => {
  const navigate = useNavigate();
  const [searchingStatus, setSearchingStatus] = useState<string | null>(null);
  const [ideaStatus, setIdeaStatus] = useState<string | null>(null);

  // Load saved data when component mounts
  useEffect(() => {
    const savedSearchingStatus = localStorage.getItem('status.searching') || null;
    const savedIdeaStatus = localStorage.getItem('status.idea') || null;
    
    setSearchingStatus(savedSearchingStatus);
    setIdeaStatus(savedIdeaStatus);
  }, []);

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
              style={{ textDecoration: tab === "Status" ? "underline" : "none" }}
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
        <Text fontSize="3xl" fontWeight="bold" color="black">
          Let's set your status 😎
        </Text>
        <Text color="gray.600" maxW="720px" textAlign="center">
          Help us find your perfect match!
        </Text>

        <HStack gap={10} mt={6} w="100%" justify="center" flexWrap="wrap">
          {/* Searching Status Card */}
          <Box bg="#BDE4F4" p={6} borderRadius="lg" w="320px" boxShadow="md">
            <Text fontWeight="bold" mb={4} color="black">
              Searching Status
            </Text>
            <VStack gap={3}>
              <Button
                w="100%"
                bg={searchingStatus === 'solo' ? '#5A5EA7' : 'white'}
                color={searchingStatus === 'solo' ? 'white' : 'black'}
                border="1px solid #CBD5E0"
                _hover={{
                  bg: searchingStatus === 'solo' ? '#4E529E' : '#F7FAFC',
                }}
                onClick={() => setSearchingStatus('solo')}
              >
                Solo — Looking for a team
              </Button>
              <Button
                w="100%"
                bg={searchingStatus === 'group' ? '#5A5EA7' : 'white'}
                color={searchingStatus === 'group' ? 'white' : 'black'}
                border="1px solid #CBD5E0"
                _hover={{
                  bg: searchingStatus === 'group' ? '#4E529E' : '#F7FAFC',
                }}
                onClick={() => setSearchingStatus('group')}
              >
                Small Group — Looking for teammates
              </Button>
            </VStack>
          </Box>

          {/* Idea Status Card */}
          <Box bg="#F7C6E0" p={6} borderRadius="lg" w="320px" boxShadow="md">
            <Text fontWeight="bold" mb={4} color="black">
              Idea Status
            </Text>
            <VStack gap={3}>
              <Button
                w="100%"
                bg={ideaStatus === 'have' ? '#5A5EA7' : 'white'}
                color={ideaStatus === 'have' ? 'white' : 'black'}
                border="1px solid #CBD5E0"
                _hover={{
                  bg: ideaStatus === 'have' ? '#4E529E' : '#F7FAFC',
                }}
                onClick={() => setIdeaStatus('have')}
              >
                Have an idea!
              </Button>
              <Button
                w="100%"
                bg={ideaStatus === 'open' ? '#5A5EA7' : 'white'}
                color={ideaStatus === 'open' ? 'white' : 'black'}
                border="1px solid #CBD5E0"
                _hover={{
                  bg: ideaStatus === 'open' ? '#4E529E' : '#F7FAFC',
                }}
                onClick={() => setIdeaStatus('open')}
              >
                Open to ideas
              </Button>
            </VStack>
          </Box>
        </HStack>

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
            onClick={() => {
              localStorage.setItem('status.searching', searchingStatus || '');
              localStorage.setItem('status.idea', ideaStatus || '');
              console.log("Searching Status:", searchingStatus);
              console.log("Idea Status:", ideaStatus);
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
            onClick={() => {
              localStorage.setItem('status.searching', searchingStatus || '');
              localStorage.setItem('status.idea', ideaStatus || '');
              navigate("/build/congrats");
            }}
          >
            Complete Profile →
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default BuildProfileStatus;

