import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Spinner,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      const success = login(username, password);
      setLoading(false);
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials. Try admin / 123.");
      }
    }, 800); // fake delay
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <Box
        maxW="md"
        w="full"
        p={8}
        bg="white"
        borderRadius="lg"
        shadow="lg"
      >
        <Heading mb={6} textAlign="center" color="teal.600">
          Login
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </FormControl>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Button
            colorScheme="teal"
            w="full"
            onClick={handleLogin}
            isLoading={loading}
            loadingText="Signing In"
          >
            Sign In
          </Button>

          <Text fontSize="sm" color="gray.500" textAlign="center">
            Demo credentials: <b>admin / 123</b>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
