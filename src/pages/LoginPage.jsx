import { useState } from "react";
import { Box, Button, Input, Heading, VStack, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate("/");
    } else {
      setError("Invalid credentials. Try admin / 123.");
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={20}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      shadow="md"
    >
      <Heading mb={6} textAlign="center">
        Login
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="teal" w="full" onClick={handleLogin}>
          Sign In
        </Button>
      </VStack>
    </Box>
  );
}
