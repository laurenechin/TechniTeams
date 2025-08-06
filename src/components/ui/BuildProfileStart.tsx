import {
  Box,
  Heading,
  Text,
  Button,
  HStack
} from "@chakra-ui/react";

const BuildProfileStart = () => {
  return (
    <Box p={8} maxW="800px" mx="auto">
      <Heading as="h1" size="xl" mb={4}>
        Build Your Profile
      </Heading>

      <Text fontSize="md" mb={6}>
        Let’s get started with some basic info.
      </Text>

      <Box display="flex" flexDirection="column" gap="1rem">
        <Button colorScheme="teal" variant="outline" size="lg">
          Start With Status & Skills
        </Button>
        <Button colorScheme="teal" variant="outline" size="lg">
          Team Preferences
        </Button>
        <Button colorScheme="teal" variant="outline" size="lg">
          Bio Prompts & Tags
        </Button>

        <HStack justify="flex-end" pt={4}>
          <Button colorScheme="blue" size="md">
            Continue
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default BuildProfileStart;
