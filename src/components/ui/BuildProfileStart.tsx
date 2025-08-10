import {
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Technica_Circle from "../../assets/Technica_Circle.png";
import { Image } from "@chakra-ui/react";

const BuildProfileStart = () => {
  const [name, setName] = useState("");
  const [track, setTrack] = useState("");
  const [environment, setEnvironment] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Load saved data when component mounts
  useEffect(() => {
    const savedName = localStorage.getItem('profile.name') || "";
    const savedTrack = localStorage.getItem('profile.track') || "";
    const savedEnvironment = localStorage.getItem('profile.environment') || "";
    const savedBio = localStorage.getItem('profile.bio') || "";
    const savedImage = localStorage.getItem('profile.image');

    setName(savedName);
    setTrack(savedTrack);
    setEnvironment(savedEnvironment);
    setBio(savedBio);
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setProfileImage(imageData);
        localStorage.setItem('profile.image', imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Save individual field when it changes
  const saveField = (field: string, value: string) => {
    localStorage.setItem(`profile.${field}`, value);
  };

  const saveProfileData = () => {
    localStorage.setItem('profile.name', name);
    localStorage.setItem('profile.track', track);
    localStorage.setItem('profile.environment', environment);
    localStorage.setItem('profile.bio', bio);
    console.log("Profile data saved:", { name, track, environment, bio });
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
                textDecoration: tab === "Start" ? "underline" : "none",
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

      {/* Main two-column layout */}
      <Flex px={12} py={8} gap={12} justify="center" align="center">
        {/* Left Column */}
        <Box
          w="300px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={6}
          h="100%"
        >
          {/* Profile Circle */}
          <Image
            src={profileImage || Technica_Circle}
            alt="Profile Picture"
            boxSize="300px"
            borderRadius="full"
            objectFit="cover"
            boxShadow="lg"
          />

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          {/* Upload Button */}
          <Box
            as="button"
            bg="#EAE3FF"
            color="black"
            px={6}
            py={3}
            borderRadius="lg"
            fontWeight="semibold"
            cursor="pointer"
            _hover={{ bg: "#D2C9F0" }}
            boxShadow="md"
            onClick={triggerFileUpload}
          >
            Upload a profile picture!
          </Box>
        </Box>

        {/* Right Column */}
        <Box flex="1" maxW="500px" color="black">
          <Text fontSize="2xl" fontWeight="bold" mb={6}>
            Welcome! Start Building your Profile!
          </Text>

          <Box mb={4}>
            <Text mb={1}>Name (will be displayed) *</Text>
            <input
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#F3EEFF",
                borderRadius: "8px",
                border: "1px solid #ccc",
                color: "black",
              }}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                saveField('name', e.target.value);
              }}
            />
          </Box>

          <Box mb={5}>
            <Text mb={1}>Track *</Text>
            <select
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#F3EEFF",
                borderRadius: "8px",
                border: "1px solid #ccc",
                color: "black",
              }}
              value={track}
              onChange={(e) => {
                setTrack(e.target.value);
                saveField('track', e.target.value);
              }}
            >
              <option value="">Select track</option>
              <option value="General">General</option>
              <option value="Beginner">Beginner</option>
              <option value="Start-Up">Start-Up</option>
              <option value="Research">Research</option>
            </select>
          </Box>

          <Box mb={4}>
            <Text mb={1}>Techni-Environment *</Text>
            <select
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#F3EEFF",
                borderRadius: "8px",
                border: "1px solid #ccc",
                color: "black",
              }}
              value={environment}
              onChange={(e) => {
                setEnvironment(e.target.value);
                saveField('environment', e.target.value);
              }}
            >
              <option value="">Select environment</option>
              <option value="Virtual">Virtual</option>
              <option value="In-Person">In-person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </Box>

          <Box mb={4}>
            <Text mb={1}>Bio</Text>
            <textarea
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#F3EEFF",
                borderRadius: "8px",
                border: "1px solid #ccc",
                minHeight: "80px",
                color: "black",
              }}
              placeholder="Write a short bio"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                saveField('bio', e.target.value);
              }}
            />
          </Box>

          {(() => {
            const missingFields = JSON.parse(localStorage.getItem('missingFields') || '[]');
            if (missingFields.length > 0) {
              return (
                <Box 
                  bg="red.50" 
                  border="1px solid" 
                  borderColor="red.200" 
                  borderRadius="md" 
                  p={3} 
                  mb={4}
                >
                  <Text color="red.600" fontSize="sm" fontWeight="medium">
                    Please complete the following required fields: {missingFields.join(', ')}
                  </Text>
                </Box>
              );
            }
            return null;
          })()}

          <Flex justify="space-between" pt={4}>
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
              onClick={saveProfileData}
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
              onClick={() => {
                saveProfileData();
                navigate("/build/skills");
              }}
            >
              Next →
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default BuildProfileStart;
