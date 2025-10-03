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
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        maxW="sm"
        w="full"
        p={8}
        bg="white"
        borderWidth="1px"
        borderRadius="lg"
        shadow="lg"
      >
        <Heading mb={6} textAlign="center" color="teal.600">
          Login
        </Heading>
        <VStack spacing={4}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
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
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Sign In"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
