import { useState } from "react"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, db } from "../../firebase"
import type { UserData } from "../types"

import { Box, Field, Input, Text, Button, VStack, Heading, HStack, Link as ChakraLink} from "@chakra-ui/react"
import { FiMail, FiLock } from "react-icons/fi"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async () => {
        try {
                const userCred = await createUserWithEmailAndPassword(auth, email, password);

                const defaultData: UserData = { email: email };
                
                await setDoc(doc(db, "users", userCred.user.uid), defaultData);
                console.log("User created, navigating to dashboard...");

                navigate("/dashboard");
            
            }   catch (error: any) {
                alert(error.message);
            }
    };

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
                        <Field.Label><FiMail size={40}/></Field.Label>
                        <Input 
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                            bg="white" 
                            color="black"
                            size="2xl"
                            fontSize="xl"
                            fontWeight="semibold"
                            w="500px" />
                    </Field.Root>

                    <Field.Root orientation="horizontal">
                        <Field.Label><FiLock size={40}/></Field.Label>
                        <Input 
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            bg="white" 
                            color="black"
                            size="2xl"
                            fontSize="xl"
                            fontWeight="semibold"
                            w="500px" />
                    </Field.Root>

                    <Button
                        onClick={handleSignUp}
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
                        <Text color="black" fontSize="xl" fontWeight="semibold" mt={16}>Already have an account?</Text>
                        <ChakraLink asChild color="#5A5EA7" fontSize="xl" fontWeight="semibold" mt={16}>
                            <RouterLink to='/login'>Log In</RouterLink>
                        </ChakraLink>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    )
};
