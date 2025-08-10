import { Link as RouterLink} from "react-router-dom"
import { Box, Flex, Text, Button, ButtonGroup, VStack, Heading, Image } from "@chakra-ui/react";
import homeImage from "@/assets/homeClipart.png";

const HomePage = () => {
    return (
        <Box 
            w="100vw" 
            h="100vh"
            bg="linear-gradient(to right, #9CE8FF, #F2B0DE)"
        >
            <Flex
                justify={'space-between'}
                align={'center'}
                bg={'#5A5EA7'}
                color="white"
                px={8}
                py={3}
            >
                <Text fontWeight={"bold"} fontSize={"sm"}>
                    Designed for TECHNICA 2025 - BRING YOUR IDEAS TO LIFE
                </Text>
                <ButtonGroup size="sm">
                    <Button bg="white" color="black" _hover={{ bg: "gray.200" }}>
                        <RouterLink to='/signup'>SIGN UP</RouterLink>
                    </Button>
                    <Button bg="gray.700" color="white" _hover={{ bg: "gray.600" }}>
                        <RouterLink to='/login'>LOG IN</RouterLink>
                    </Button>
                </ButtonGroup>
            </Flex>
            <VStack textAlign="center">
                <Heading as="h1" pt={150} fontSize="90px" color="#474E85" fontWeight="extrabold">
                    TechniTeams
                </Heading>
                <Heading as="h2" pt={20} size="4xl" color="#474E85" fontWeight="bold">
                    You are not alone.
                </Heading>
                <Text maxW="800px" color="#474E85" fontSize="2xl" fontWeight="semibold">
                Whether you are solo and searching, have the next big idea,
                or looking for those final additions to your team—TechniTeams helps you connect 
                with other hackers who match your goals, interests, & vision ✨
                </Text>
                <Button
                    asChild
                    size="2xl"
                    bg="#EAE3FF"
                    color="#5A5EA7"
                    fontSize={"3xl"}
                    fontWeight={"bold"}
                    _hover={{ bg: "#D2C9F0" }}
                    borderRadius="lg"
                    shadow="md"
                    mt={10}
                    zIndex={1}
                >
                    <RouterLink to='/signup'>Get Started</RouterLink>
                </Button>
                <Image
                    src={homeImage}
                    boxSize="600px"  
                    position="absolute"
                    bottom="-20"
                    left="-20"
                    objectFit="contain"
                    zIndex={0}
                />
            </VStack>
        </Box>
    );
};

export default HomePage;