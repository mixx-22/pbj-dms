// src/pages/AccountListPage.jsx
import { useState } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, LockIcon, SearchIcon } from "@chakra-ui/icons";

export default function Accounts() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isPwdOpen, onOpen: onPwdOpen, onClose: onPwdClose } = useDisclosure();

  const [accounts, setAccounts] = useState([
    { id: 1, name: "Mike Jimenez", username: "mike", role: "Product Designer", email: "mjimenez@pbj.com", status: "Active", userType: "Admin" },
    { id: 2, name: "Ajad Singh Parmar", username: "Ajad", role: "Product Manager", email: "aparmar@pbj.com", status: "Active", userType: "Admin" },
    { id: 3, name: "Aristotle Bataan", username: "docyummy", role: "Product Supervisor", email: "abataan@pbj.com", status: "Active", userType: "User" },
    { id: 4, name: "Rhoy Sampaga", username: "Rhoy", role: "Accounting Manager", email: "rsampaga@pbj.com", status: "Inactive", userType: "User" },
  ]);

  const [formData, setFormData] = useState({ id: null, name: "", username: "", password: "", role: "", email: "", status: "Active", userType: "User" });
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [search, setSearch] = useState("");

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const handlePwdChange = (field, value) => setPasswordData(prev => ({ ...prev, [field]: value }));

  const handleDelete = (id) => {
    const accountToDelete = accounts.find(a => a.id === id);
    setAccounts(accounts.filter(a => a.id !== id));
    toast({ title: "Account deleted", description: `${accountToDelete.name} has been removed.`, status: "success", duration: 3000, isClosable: true });
  };

  const confirmDelete = (id) => {
    const account = accounts.find(a => a.id === id);
    Swal.fire({
      title: 'Are you sure?',
      html: `Delete <strong>${account.name}</strong>? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) handleDelete(id);
    });
  };

  const handleEdit = (account) => { setFormData(account); onOpen(); };
  const handleAdd = () => { setFormData({ id: null, name: "", username: "", password: "", role: "", email: "", status: "Active", userType: "User" }); onOpen(); };
  const handleSave = () => {
    if (formData.id) {
      setAccounts(accounts.map(a => a.id === formData.id ? formData : a));
      toast({ title: "Account updated", description: `${formData.name} has been updated.`, status: "success", duration: 3000, isClosable: true });
    } else {
      setAccounts([...accounts, { ...formData, id: accounts.length + 1 }]);
      toast({ title: "Account added", description: `${formData.name} has been added.`, status: "success", duration: 3000, isClosable: true });
    }
    onClose();
  };

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", status: "error", duration: 3000, isClosable: true });
      return;
    }
    toast({ title: "Password changed", description: `Password has been updated successfully.`, status: "success", duration: 3000, isClosable: true });
    onPwdClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "green";
      case "Inactive": return "red";
      case "Pending": return "yellow";
      default: return "gray";
    }
  };

  const filteredAccounts = accounts.filter(
    a => a.name.toLowerCase().includes(search.toLowerCase()) || a.username.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={6}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6} gap={6}>
        <Box fontSize="xl" fontWeight="bold">Accounts</Box>
        <Box display="flex" alignItems="center" gap={3} justifyContent="flex-end" flex="1">
          <Button colorScheme="blue" onClick={handleAdd} w="150px">+ Add Account</Button>
          <InputGroup maxW="500px" flex="1">
            <InputLeftElement pointerEvents="none"><SearchIcon color="gray.400" /></InputLeftElement>
            <Input placeholder="Search by name, username, or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </InputGroup>
        </Box>
      </Box>

      {/* Table */}
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead bg="gray.50">
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Role</Th>
              <Th>Email</Th>
              <Th>User Type</Th>
              <Th textAlign="right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAccounts.map(acc => (
              <Tr key={acc.id} _hover={{ bg: "gray.50" }}>
                <Td>
                  <Box display="flex" alignItems="center">
                    <Avatar size="sm" name={acc.name} mr={3} />
                    <Box>
                      <Box fontWeight="semibold">{acc.name}</Box>
                      <Box fontSize="sm" color="gray.500">@{acc.username}</Box>
                    </Box>
                  </Box>
                </Td>
                <Td><Badge colorScheme={getStatusColor(acc.status)}>{acc.status}</Badge></Td>
                <Td>{acc.role}</Td>
                <Td>{acc.email}</Td>
                <Td><Badge colorScheme={acc.userType === "Admin" ? "purple" : "blue"}>{acc.userType}</Badge></Td>
                <Td textAlign="right">
                  <IconButton aria-label="Edit" icon={<EditIcon />} size="sm" mr={2} onClick={() => handleEdit(acc)} />
                  <IconButton aria-label="Change Password" icon={<LockIcon />} size="sm" mr={2} onClick={onPwdOpen} />
                  <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => confirmDelete(acc.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={{ base: "90vw", md: "500px" }}>
          <ModalHeader>{formData.id ? "Edit Account" : "Add Account"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}><FormLabel>Name</FormLabel><Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} /></FormControl>
            <FormControl mb={3}><FormLabel>Username</FormLabel><Input value={formData.username} onChange={(e) => handleChange("username", e.target.value)} /></FormControl>
            {!formData.id && <FormControl mb={3}><FormLabel>Password</FormLabel><Input type="password" value={formData.password || ""} onChange={(e) => handleChange("password", e.target.value)} /></FormControl>}
            <FormControl mb={3}><FormLabel>Role</FormLabel><Input value={formData.role} onChange={(e) => handleChange("role", e.target.value)} /></FormControl>
            <FormControl mb={3}><FormLabel>Email</FormLabel><Input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} /></FormControl>
            {formData.id && <FormControl mb={3}><FormLabel>Status</FormLabel><Select value={formData.status} onChange={(e) => handleChange("status", e.target.value)}><option value="Active">Active</option><option value="Inactive">Inactive</option></Select></FormControl>}
            <FormControl mb={3}><FormLabel>User Type</FormLabel><Select value={formData.userType} onChange={(e) => handleChange("userType", e.target.value)}><option value="Admin">Admin</option><option value="User">User</option><option value="Manager">Manager</option></Select></FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={isPwdOpen} onClose={onPwdClose}>
        <ModalOverlay />
        <ModalContent maxW={{ base: "90vw", md: "400px" }}>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}><FormLabel>New Password</FormLabel><Input type="password" value={passwordData.newPassword} onChange={(e) => handlePwdChange("newPassword", e.target.value)} /></FormControl>
            <FormControl mb={3}><FormLabel>Confirm Password</FormLabel><Input type="password" value={passwordData.confirmPassword} onChange={(e) => handlePwdChange("confirmPassword", e.target.value)} /></FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onPwdClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handlePasswordSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
