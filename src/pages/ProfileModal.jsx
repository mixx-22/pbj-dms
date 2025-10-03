// src/components/ProfileModal.jsx
import { useState, useEffect, useMemo } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  Collapse,
  ButtonGroup,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileModal({ isOpen, onClose, account, onSave }) {
  const { user = { type: "user" } } = useAuth();
  const isAdmin = useMemo(() => user?.userType === "admin", [user]);
  const toast = useToast();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    role: "",
    status: "",
    userType: "",
  });

  useEffect(() => {
    if (account) {
      setFormData(account);
    }
  }, [account]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.username || !formData.email) {
      toast({
        title: "Error",
        description: "Name, username, and email are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Call onSave from App.jsx to update accounts state
    onSave(formData);

    toast({
      title: "Profile updated",
      description: "Your account information has been saved.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input
              isReadOnly={!isAdmin}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Username</FormLabel>
            <Input
              isReadOnly={!isAdmin}
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Email</FormLabel>
            <Input
              isReadOnly={!isAdmin}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Role</FormLabel>
            <Input
              isReadOnly={!isAdmin}
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>Status</FormLabel>
            <Select
              isDisabled={!isAdmin}
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </Select>
          </FormControl>
          <FormControl mb={3}>
            <FormLabel>User Type</FormLabel>
            <Select
              isDisabled={!isAdmin}
              value={formData.userType}
              onChange={(e) => handleChange("userType", e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Collapse unmountOnExit in={!isAdmin}>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </Collapse>
          <Collapse unmountOnExit in={isAdmin}>
            <ButtonGroup spacing={2}>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleSave}>
                Save
              </Button>
            </ButtonGroup>
          </Collapse>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
