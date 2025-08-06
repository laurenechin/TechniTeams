import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";

const BuildProfileStart = () => {
  const bg = useColorModeValue("gray.50", "gray.800"); // light/dark mode support

  return (
    <Box bg={bg} minH="100vh" py={10}>
      <Container maxW="3xl">
        {/* Top Nav (placeholder for now) */}
        <HStack spacing={4} justify="flex-end" mb={6}>
          <Button variant="ghost" colorScheme="gray" fontWeight="medium">
            Status & Skills
          </Button>
          <Button variant="ghost" colorScheme="gray" fontWeight="medium">
            Roles
          </Button>
          <Button variant="ghost" colorScheme="gray" fontWeight="medium">
            Personality
          </Button>
        </HStack>

        {/* Main Content */}
        <Heading as="h1" size="2xl" mb={4} color="teal.600">
          Build Your Profile
        </Heading>

        <Text fontSize="lg" mb={8} color="gray.600">
          Let’s get started with some basic info.
        </Text>

        <VStack spacing={4} align="stretch">
          <Button colorScheme="teal" variant="solid" size="lg">
            Start With Status & Skills
          </Button>
          <Button colorScheme="teal" variant="solid" size="lg">
            Team Preferences
          </Button>
          <Button colorScheme="teal" variant="solid" size="lg">
            Bio Prompts & Tags
          </Button>
        </VStack>

        <HStack justify="flex-end" pt={10}>
          <Button colorScheme="blue" size="md">
            Continue
          </Button>
        </HStack>
      </Container>
    </Box>
  );
};

export default BuildProfileStart;
