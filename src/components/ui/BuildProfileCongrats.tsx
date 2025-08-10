import { Box, Flex, Text, VStack, Image, HStack, Tag } from "@chakra-ui/react";
import Technica_Circle from "@/assets/Technica_Circle.png";

const BuildProfileCongrats = () => {
  const name = localStorage.getItem('start.name') || 'name';
  const track = localStorage.getItem('start.track') || 'track';
  const env = localStorage.getItem('start.environment') || 'techni-environment';

  const languageTags = JSON.parse(localStorage.getItem('skills.languages') || '[]');
  const toolTags = JSON.parse(localStorage.getItem('skills.tools') || '[]');
  const interestTags = JSON.parse(localStorage.getItem('skills.interests') || '[]');
  const roleTags = JSON.parse(localStorage.getItem('roles.mine') || '[]');
  const needTags = JSON.parse(localStorage.getItem('roles.needed') || '[]');

  const allTags: string[] = [
    ...languageTags,
    ...toolTags,
    ...interestTags,
    ...roleTags,
    ...needTags,
  ];

  return (
    <Box w="100vw" minH="100vh" bgGradient="linear(to-r, #9CE8FF, #F2B0DE)" color="black">
      <VStack py={16} gap={6}>
        <Text fontSize="2xl" fontWeight="bold" color="#5A5EA7">Your Profile is Complete!</Text>
        <Image src={Technica_Circle} alt="profile" boxSize="140px" borderRadius="full" />
        <VStack gap={1}>
          <Text fontWeight="bold">{name}</Text>
          <Text fontWeight="semibold">[{track}] | [{env}]</Text>
        </VStack>
        <Box>
          <Text textAlign="center" mb={2}>Your Tags:</Text>
          <HStack wrap="wrap" gap={2} justify="center">
            {allTags.map((t, i) => (
              <Tag.Root key={`${t}-${i}`} bg="white" color="black">{t}</Tag.Root>
            ))}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default BuildProfileCongrats;

