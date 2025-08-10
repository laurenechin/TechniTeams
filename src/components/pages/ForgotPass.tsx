/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { Link as RouterLink } from "react-router-dom"
import { Box, Field, Input, Button, VStack, Heading, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { FiMail } from "react-icons/fi"

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error: any) {
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
                        Reset Password 
                    </Heading>
                    <Heading as="h2" size="xl" color="#5A5EA7" fontWeight="semibold">
                        Enter your email
                    </Heading>

                    <Field.Root orientation="horizontal" mt={20} mb={6}>
                        <Field.Label><FiMail size={40}/></Field.Label>
                        <Input 
                            placeholder="Email Address" 
                            bg="white" 
                            color="black"
                            size="2xl"
                            fontSize="xl"
                            fontWeight="semibold"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
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
                        onClick={handleReset}
                    >
                        {sent ? "Email Sent!" : "Send Reset Email"}
                    </Button>

                    <HStack gap={1}>
                        <ChakraLink asChild color="#5A5EA7" fontSize="xl" fontWeight="semibold" mt={6}>
                            <RouterLink to="/login">Return to Log In</RouterLink>
                        </ChakraLink>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    )
};
