// src/App.jsx
import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Heading,
  Stack,
  MenuDivider,
  MenuGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DocumentListPage from "./pages/DocumentListPage";
import AccountListPage from "./pages/AccountListPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./contexts/AuthContext";
import DocumentView from "./pages/DocumentView";
import ProfileModal from "./pages/ProfileModal";

export default function App() {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Hide navbar on Login page
  const hideNav = location.pathname === "/login";

  // Mobile drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Profile modal
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();

  // Accounts data
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Mike Jimenez",
      username: "mike",
      role: "Product Designer",
      email: "mjimenez@pbj.com",
      status: "Active",
      userType: "Admin",
    },
    {
      id: 2,
      name: "Ajad Singh Parmar",
      username: "Ajad",
      role: "Product Manager",
      email: "aparmar@pbj.com",
      status: "Active",
      userType: "Admin",
    },
    {
      id: 3,
      name: "Aristotle Bataan",
      username: "docyummy",
      role: "Product Supervisor",
      email: "abataan@pbj.com",
      status: "Active",
      userType: "User",
    },
    {
      id: 4,
      name: "Rhoy Sampaga",
      username: "Rhoy",
      role: "Accounting Manager",
      email: "rsampaga@pbj.com",
      status: "Inactive",
      userType: "User",
    },
  ]);

  // Find logged-in user account
  const loggedInUserAccount = accounts.find(
    (a) => a.username === user?.username
  );

  // Active link styling helper
  const getButtonVariant = (path) =>
    location.pathname === path ? "solid" : "ghost";

  // Navbar links
  const links = [
    { name: "Home", to: "/" },
    { name: "Documents", to: "/documents" },
  ];
  if (user?.userType === "admin")
    links.push({ name: "Accounts", to: "/accounts" });

  // Update account info
  const handleProfileSave = (updatedAccount) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === updatedAccount.id ? updatedAccount : a))
    );
    onProfileClose();
  };

  return (
    <Box>
      {/* Navbar */}
      {!hideNav && (
        <Box bg="purple.600" borderBottom="1px solid" borderColor="purple.700">
          <Box w="full" maxW="container.xl" mx="auto">
            <Flex
              w="full"
              alignItems="center"
              justifyContent="space-between"
              py={4}
              px={8}
            >
              <Stack spacing={0}>
                <Heading m={0} fontSize="sm" color="white">
                  PBJ
                  <Heading fontSize="inherit" as="span" color="yellow.300">
                    Automations
                  </Heading>
                </Heading>
                <Heading
                  m={0}
                  color="white"
                  fontWeight="extrabold"
                  fontSize="4xl"
                  lineHeight={7}
                >
                  DOCS
                </Heading>
              </Stack>

              {/* Desktop links */}
              <HStack spacing={4} display={{ base: "none", md: "flex" }}>
                {links.map((link) => (
                  <Button
                    key={link.to}
                    as={Link}
                    to={link.to}
                    variant={getButtonVariant(link.to)}
                  >
                    {link.name}
                  </Button>
                ))}
              </HStack>

              {/* Mobile Hamburger */}
              <IconButton
                icon={<HamburgerIcon />}
                display={{ base: "flex", md: "none" }}
                aria-label="Menu"
                onClick={onOpen}
              />
              {/* User Menu */}
              {user ? (
                <>
                  <Menu isLazy>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      px={0}
                      borderRadius={"full"}
                    >
                      <Avatar size="sm" name={user.name} />
                    </MenuButton>
                    <MenuList>
                      <MenuGroup
                        title={
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.500">
                              @{user.username}
                            </Text>
                          </VStack>
                        }
                      >
                        <MenuItem onClick={onProfileOpen}>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                      </MenuGroup>
                      <MenuDivider />
                      <MenuItem onClick={logout}>Log Out</MenuItem>
                    </MenuList>
                  </Menu>

                  {loggedInUserAccount && (
                    <ProfileModal
                      isOpen={isProfileOpen}
                      onClose={onProfileClose}
                      account={loggedInUserAccount}
                      onSave={handleProfileSave}
                    />
                  )}
                </>
              ) : (
                <Button as={Link} to="/login" colorScheme="blue">
                  Log In
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      )}

      {/* Mobile Drawer */}
      {!hideNav && (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <VStack align="start" spacing={4} mt={6}>
                {links.map((link) => (
                  <Button
                    key={link.to}
                    as={Link}
                    to={link.to}
                    variant={getButtonVariant(link.to)}
                    w="full"
                    onClick={onClose}
                  >
                    {link.name}
                  </Button>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      {/* Content */}
      <Box p={6} bg="gray.50" minH="calc(100vh - 72px)">
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
            path="/documents/:id"
            element={
              <PrivateRoute>
                <DocumentView />
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
        </Routes>
      </Box>
    </Box>
  );
}
