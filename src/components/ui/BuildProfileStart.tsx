import {
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";
import Technica_Circle from "../../assets/Technica_Circle.png";
import { Image } from "@chakra-ui/react";


const BuildProfileStart = () => {
  const [name, setName] = useState("");
  const [track, setTrack] = useState("");
  const [environment, setEnvironment] = useState("");
  const [bio, setBio] = useState("");

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
      >
        {tab}
        
      </Text>
    ))}
  </HStack>
</Flex>






      {/* Main two-column layout */}
<Flex px={12} py={8} gap={12} justify="center" align="center">  {/* align="center" fixes vertical centering */}
  {/* Left Column */}
  <Box
    w="300px"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center" // 👈 centers content vertically inside the column
    gap={6}
    h="100%" // keep full height
  >
    {/* Profile Circle */}
    <Image
      src={Technica_Circle}
      alt="Technica Gradient Circle"
      boxSize="300px"
      borderRadius="full"
      objectFit="cover"
      boxShadow="lg"
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
      cursor="pointer" // 👈 makes it clickable cursor
      _hover={{ bg: "#D2C9F0" }}
      boxShadow="md"
    >
      Upload a profile picture!
    </Box>
  </Box>


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
      }}
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
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
      }}
      value={track}
      onChange={(e) => setTrack(e.target.value)}
      bg="#F3EEFF"
      color="black"
      placeholder="Select track"
      value={track}
      onChange={(e) => setTrack(e.target.value)}
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
      }}
      value={environment}
      onChange={(e) => setEnvironment(e.target.value)}
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
      }}
      bg="#F3EEFF"
      color="black"
      placeholder="Write a short bio"
      value={bio}
      onChange={(e) => setBio(e.target.value)}
    />
  </Box>

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
  cursor="pointer" // 👈 added
  onClick={() => {
    console.log("Name:", name);
    console.log("Track:", track);
    console.log("Environment:", environment);
    console.log("Bio:", bio);
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
  cursor="pointer" // 👈 added
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
