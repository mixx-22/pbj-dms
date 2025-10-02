// src/pages/Documents.jsx
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
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Documents() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Project Proposal",
      author: "Olivia Rhye",
      category: "Business",
      status: "Approved",
      fileName: "proposal.pdf",
    },
    {
      id: 2,
      title: "Marketing Plan",
      author: "Phoenix Baker",
      category: "Marketing",
      status: "Pending",
      fileName: "marketing-plan.docx",
    },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    author: "",
    category: "",
    status: "Pending",
    fileName: "",
  });

  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This document will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDocuments(documents.filter((d) => d.id !== id));
        Swal.fire("Deleted!", "The document has been removed.", "success");
      }
    });
  };

  const handleEdit = (doc) => {
    setFormData(doc);
    onOpen();
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      title: "",
      author: "",
      category: "",
      status: "Pending",
      fileName: "",
    });
    onOpen();
  };

  const handleSave = () => {
    if (formData.id) {
      // update existing
      setDocuments(documents.map((d) => (d.id === formData.id ? formData : d)));
    } else {
      // add new
      setDocuments([...documents, { ...formData, id: documents.length + 1 }]);
    }
    onClose();
  };

  return (
    <Box p={6}>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box fontSize="xl" fontWeight="bold">
          Documents
        </Box>
        <Button colorScheme="blue" onClick={handleAdd}>
          Add Document
        </Button>
      </Box>

      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>File</Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {documents.map((doc) => (
            <Tr
              key={doc.id}
              _hover={{ bg: "gray.50", cursor: "pointer" }}
              onClick={() => navigate(`/documents/${doc.id}`)}
            >
              <Td>{doc.title}</Td>
              <Td>{doc.author}</Td>
              <Td>{doc.category}</Td>
              <Td>
                <Badge
                  colorScheme={
                    doc.status === "Approved"
                      ? "green"
                      : doc.status === "Pending"
                      ? "yellow"
                      : "red"
                  }
                >
                  {doc.status}
                </Badge>
              </Td>
              <Td>{doc.fileName || "—"}</Td>
              <Td textAlign="right">
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row navigation
                    handleEdit(doc);
                  }}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent row navigation
                    handleDelete(doc.id);
                  }}
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
            {formData.id ? "Edit Document" : "Add Document"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Author</FormLabel>
              <Input
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Category</FormLabel>
              <Input
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Status</FormLabel>
              <Input
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              />
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
