import { Link as RouterLink } from "react-router-dom"
import { Box, Field, Input, Text, Button, VStack, Heading, HStack, Link as ChakraLink} from "@chakra-ui/react"
import { FiMail } from "react-icons/fi"
import { FiLock } from "react-icons/fi"
import { FiUser } from "react-icons/fi"

const SignUp = () => {
    return (
        <Box 
            w="100vw" 
            h="100vh"
            bg="linear-gradient(to right, #9CE8FF, #F2B0DE)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <Box 
                bg="gray.100"
                borderRadius="2xl"
                w="862px"
                h="760px"
                boxShadow="lg"
                display="flex"
                flexDirection="column"
                alignItems="center"
                pt={24}
            >

                <VStack textAlign="center" gap="6">
                    <Heading as="h1" size="6xl" color="#000000ff" fontWeight="extrabold">
                        Sign Up
                    </Heading>
                    <Heading as="h2" size="xl" color="#5A5EA7" fontWeight="semibold">
                        Create your account
                    </Heading>
                    
                     <Field.Root orientation="horizontal">
                        <Field.Label><FiUser size={40}/></Field.Label>
                        <Input 
                            placeholder="Username" 
                            bg="white" 
                            color="black"
                            size="2xl"
                            fontSize="xl"
                            fontWeight="semibold"
                            w="500px"/>
                    </Field.Root>

                    <Field.Root orientation="horizontal">
                        <Field.Label><FiMail size={40}/></Field.Label>
                        <Input 
                            placeholder="Email Address" 
                            bg="white" 
                            color="black"
                            size="2xl"
                            fontSize="xl"
                            fontWeight="semibold"/>
                    </Field.Root>

                    <Field.Root orientation="horizontal">
                        <Field.Label><FiLock size={40}/></Field.Label>
                        <Input 
                            placeholder="Password" 
                            bg="white" 
                            color="black"
                            size="2xl"
                            fontSize="xl"
                            fontWeight="semibold"/>
                    </Field.Root>

                    <Button
                        size="2xl"
                        bg="#EAE3FF"
                        color="#000000ff"
                        fontSize={"2xl"}
                        fontWeight={"bold"}
                        _hover={{ bg: "#D2C9F0" }}
                        borderRadius="lg"
                        shadow="lg"
                        w="250px"
                    >
                        Sign Up
                    </Button>

                    <HStack gap={1}>
                        <Text color="black" fontSize="xl" fontWeight="semibold" mt={6}>Already have an account?</Text>
                        <ChakraLink asChild color="#5A5EA7" fontSize="xl" fontWeight="semibold" mt={6}>
                            <RouterLink to='/login'>Log In</RouterLink>
                        </ChakraLink>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
};

export default SignUp;