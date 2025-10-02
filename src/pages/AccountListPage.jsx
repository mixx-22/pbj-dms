// src/pages/Accounts.jsx
import { useState } from "react";
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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";

export default function Accounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Olivia Rhye",
      username: "olivia",
      role: "Product Designer",
      email: "olivia@untitledui.com",
      status: "Active",
      userType: "Admin",
    },
    {
      id: 2,
      name: "Phoenix Baker",
      username: "phoenix",
      role: "Product Manager",
      email: "phoenix@untitledui.com",
      status: "Active",
      userType: "User",
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    username: "",
    role: "",
    email: "",
    status: "Active",
    userType: "User",
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setAccounts(accounts.filter((a) => a.id !== id));
        Swal.fire("Deleted!", "The account has been removed.", "success");
      }
    });
  };

  const handleEdit = (account) => {
    setFormData(account);
    onOpen();
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      name: "",
      username: "",
      role: "",
      email: "",
      status: "Active",
      userType: "User",
    });
    onOpen();
  };

  const handleSave = () => {
    if (formData.id) {
      setAccounts(accounts.map((a) => (a.id === formData.id ? formData : a)));
    } else {
      setAccounts([...accounts, { ...formData, id: accounts.length + 1 }]);
    }
    onClose();
  };

  return (
    <Box p={6}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box fontSize="xl" fontWeight="bold">
          Team Members
        </Box>
        <Button colorScheme="blue" onClick={handleAdd}>
          Add Account
        </Button>
      </Box>

      <Table variant="simple" size="md">
        <Thead>
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
          {accounts.map((acc) => (
            <Tr key={acc.id}>
              <Td>
                <Box display="flex" alignItems="center">
                  <Avatar size="sm" name={acc.name} mr={3} />
                  <Box>
                    <Box fontWeight="semibold">{acc.name}</Box>
                    <Box fontSize="sm" color="gray.500">
                      @{acc.username}
                    </Box>
                  </Box>
                </Box>
              </Td>
              <Td>
                <Badge colorScheme="green">{acc.status}</Badge>
              </Td>
              <Td>{acc.role}</Td>
              <Td>{acc.email}</Td>
              <Td>{acc.userType}</Td>
              <Td textAlign="right">
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => handleEdit(acc)}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(acc.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {formData.id ? "Edit Account" : "Add Account"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Username</FormLabel>
              <Input
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Role</FormLabel>
              <Input
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>User Type</FormLabel>
              <Select
                value={formData.userType}
                onChange={(e) =>
                  setFormData({ ...formData, userType: e.target.value })
                }
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
