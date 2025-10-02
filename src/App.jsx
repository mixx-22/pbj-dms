import { Routes, Route, Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DocumentListPage from "./pages/DocumentListPage";
import AccountListPage from "./pages/AccountListPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import DocumentView from "./pages/DocumentView";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <Box>
      <Flex bg="teal.500" p={4} color="white" justify="space-between">
        <Box fontWeight="bold">📂 DocuManage</Box>
        <Flex gap={3}>
          {user ? (
            <>
              <Button
                as={Link}
                to="/"
                size="sm"
                colorScheme="whiteAlpha"
                variant="ghost"
              >
                Home
              </Button>
              <Button
                as={Link}
                to="/documents"
                size="sm"
                colorScheme="whiteAlpha"
                variant="ghost"
              >
                Documents
              </Button>
              <Button
                as={Link}
                to="/accounts"
                size="sm"
                colorScheme="whiteAlpha"
                variant="ghost"
              >
                Accounts
              </Button>
              <Button
                onClick={logout}
                size="sm"
                colorScheme="red"
                variant="outline"
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login" size="sm" colorScheme="whiteAlpha">
              Login
            </Button>
          )}
        </Flex>
      </Flex>

      <Box p={6}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <PrivateRoute>
                <DocumentListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts"
            element={
              <PrivateRoute>
                <AccountListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/documents/:id"
            element={
              <PrivateRoute>
                <DocumentView />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}
