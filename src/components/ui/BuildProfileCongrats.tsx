import { Box, Flex, HStack, Text, VStack, Image, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const BuildProfileCongrats = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    name: "",
    track: "",
    environment: "",
    bio: "",
    profileImage: null as string | null,
    languages: [] as string[],
    tools: [] as string[],
    interests: [] as string[],
    myRoles: [] as string[],
    neededRoles: [] as string[],
    personality: [] as string[],
    searchingStatus: "",
    ideaStatus: "",
  });

  useEffect(() => {
    // Load data from localStorage
    const name = localStorage.getItem('profile.name') || "";
    const track = localStorage.getItem('profile.track') || "";
    const environment = localStorage.getItem('profile.environment') || "";
    const bio = localStorage.getItem('profile.bio') || "";
    const profileImage = localStorage.getItem('profile.image');
    
    const languages = JSON.parse(localStorage.getItem('skills.languages') || '[]');
    const tools = JSON.parse(localStorage.getItem('skills.tools') || '[]');
    const interests = JSON.parse(localStorage.getItem('skills.interests') || '[]');
    
    const myRoles = JSON.parse(localStorage.getItem('roles.mine') || '[]');
    const neededRoles = JSON.parse(localStorage.getItem('roles.needed') || '[]');
    
    const personality = JSON.parse(localStorage.getItem('personality.tags') || '[]');
    
    const searchingStatus = localStorage.getItem('status.searching') || "";
    const ideaStatus = localStorage.getItem('status.idea') || "";

    setProfileData({
      name,
      track,
      environment,
      bio,
      profileImage,
      languages,
      tools,
      interests,
      myRoles,
      neededRoles,
      personality,
      searchingStatus,
      ideaStatus,
    });

    // Validate required fields
    const requiredFields = {
      name: name.trim(),
      track: track.trim(),
      environment: environment.trim(),
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([field, _]) => field);

    if (missingFields.length > 0) {
      // Redirect to start page with missing fields info
      localStorage.setItem('missingFields', JSON.stringify(missingFields));
      navigate("/build/start");
      return;
    }
  }, [navigate]);

  const renderTag = (text: string, color: string) => (
    <Badge
      key={text}
      bg={color}
      color="white"
      px={3}
      py={1}
      borderRadius="md"
      fontSize="sm"
      display="flex"
      alignItems="center"
      gap={2}
    >
      <Check size={14} />
      {text}
    </Badge>
  );

  return (
    <Box 
      w="100vw" 
      minH="100vh" 
      bg="linear-gradient(to right, #9CE8FF, #F2B0DE)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
    >

      {/* Main Content Card */}
      <Box
        bg="white"
        borderRadius="xl"
        p={12}
        maxW="800px"
        w="100%"
        boxShadow="2xl"
        textAlign="center"
      >
        {/* Title */}
        <Text fontSize="4xl" fontWeight="bold" color="#5A5EA7" mb={8}>
          Your Profile is Complete!
        </Text>

        {/* Profile Picture */}
        <Box mb={6}>
          <Image
            src={profileData.profileImage || "/default-avatar.png"}
            alt="Profile Picture"
            boxSize="120px"
            borderRadius="full"
            mx="auto"
            objectFit="cover"
          />
        </Box>

        {/* Profile Info */}
        <VStack gap={1} mb={8}>
          <Text fontSize="xl" fontWeight="bold" color="black">
            {profileData.name || "[name]"}
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color="black">
            {profileData.track || "[track]"}
          </Text>
          <Text fontSize="lg" fontWeight="semibold" color="black">
            | {profileData.environment || "[techni-environment]"}
          </Text>
        </VStack>

        {/* Tags Section */}
        <Box textAlign="left">
          <Text fontSize="lg" fontWeight="bold" color="black" mb={4}>
            Your Tags:
          </Text>
          
          <VStack align="start" gap={3}>
            {/* Languages */}
            {profileData.languages.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {profileData.languages.map(lang => renderTag(lang, "#10B981"))}
              </HStack>
            )}

            {/* Tools */}
            {profileData.tools.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {profileData.tools.map(tool => renderTag(tool, "#3B82F6"))}
              </HStack>
            )}

            {/* Roles */}
            {profileData.myRoles.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {profileData.myRoles.map(role => renderTag(role, "#8B5CF6"))}
              </HStack>
            )}

            {/* Interests */}
            {profileData.interests.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {profileData.interests.map(interest => renderTag(interest, "#8B5CF6"))}
              </HStack>
            )}

            {/* Personality */}
            {profileData.personality.length > 0 && (
              <HStack gap={2} flexWrap="wrap">
                {profileData.personality.map(trait => renderTag(trait, "#EC4899"))}
              </HStack>
            )}

            {/* Status */}
            {(profileData.searchingStatus || profileData.ideaStatus) && (
              <HStack gap={2} flexWrap="wrap">
                {profileData.searchingStatus && renderTag(profileData.searchingStatus, "#F59E0B")}
                {profileData.ideaStatus && renderTag(profileData.ideaStatus, "#EF4444")}
              </HStack>
            )}
          </VStack>
        </Box>

        {/* Action Buttons */}
        <HStack justify="center" gap={4} mt={8}>
          <Box
            as="button"
            bg="#5A5EA7"
            color="white"
            px={8}
            py={3}
            borderRadius="lg"
            fontWeight="semibold"
            _hover={{ bg: "#4E529E" }}
            cursor="pointer"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Box>
          
          <Box
            as="button"
            color="#5A5EA7"
            fontWeight="medium"
            px={6}
            py={3}
            border="2px solid #5A5EA7"
            borderRadius="lg"
            _hover={{ bg: "#5A5EA7", color: "white" }}
            cursor="pointer"
            onClick={() => navigate("/build/start")}
          >
            Edit Profile
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default BuildProfileCongrats;

