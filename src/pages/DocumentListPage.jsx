// src/pages/DocumentListPage.jsx
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
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
  IconButton,
  Badge,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
  Container,
  Stack,
  TableContainer,
  Card,
  CardBody,
  ButtonGroup,
  Heading,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  ViewIcon,
  SearchIcon,
  AddIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";

export default function Documents() {
  const toast = useToast();

  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Proposal Report",
      author: "Mike Jimenez",
      username: "mike",
      status: "In Progress",
      fileName: "proposal.pdf",
      fileUrl: "/files/proposal.pdf",
      size: "1.2 MB",
      dateCreated: "02/17/2024",
      lastUpdated: "2 hrs ago • Ajad Parmar",
    },
    {
      id: 2,
      title: "Marketing Plan",
      author: "Ajad Parmar",
      username: "ajad",
      status: "Approved",
      fileName: "marketing-plan.pdf",
      fileUrl: "/files/marketing-plan.pdf",
      size: "3.0 MB",
      dateCreated: "03/19/2024",
      lastUpdated: "1 hr ago • Ajad Parmar",
    },
    {
      id: 3,
      title: "Financial Analysis",
      author: "Rhoy Sampaga",
      username: "aristotle",
      status: "Rejected",
      fileName: "financial-report.docx",
      fileUrl: "/files/financial-report.docx",
      size: "2.8 MB",
      dateCreated: "11/02/2023",
      lastUpdated: "13 hrs ago • Ajad Parmar",
    },
    {
      id: 4,
      title: "Company Objectives",
      author: "Mike Jimenez",
      username: "mike",
      status: "Approved",
      fileName: "company-objectives.doc",
      fileUrl: "/files/company-objectives.doc",
      size: "2.8 MB",
      dateCreated: "10/15/2020",
      lastUpdated: "13 hrs ago • Mike Jimenez",
    },
    {
      id: 5,
      title: "Production Procedures",
      author: "Ajad Parmar",
      username: "ajad",
      status: "Approved",
      fileName: "production-procedures.pdf",
      fileUrl: "/files/production-procedures.pdf",
      size: "2.8 MB",
      dateCreated: "11/15/2020",
      lastUpdated: "10 hrs ago • Aristotle Bataan",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState({
    id: null,
    title: "",
    author: "",
    status: "In Progress",
    fileName: "",
    fileUrl: "",
    size: "",
  });

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "In Progress":
        return "yellow";
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };

  const handleView = (fileUrl) => {
    const ext = fileUrl.split(".").pop().toLowerCase();
    if (ext === "pdf") window.open(fileUrl, "_blank");
    else {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.download = fileUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // SweetAlert2 Delete
  const handleDelete = (id) => {
    const docToDelete = documents.find((d) => d.id === id);
    setDocuments(documents.filter((d) => d.id !== id));
    toast({
      title: "Document deleted",
      description: `${docToDelete.title} has been removed.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) handleDelete(id);
    });
  };

  // Drag & Drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setCurrentDoc((prev) => ({
        ...prev,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // Modal Handlers
  const openAddModal = () => {
    setCurrentDoc({
      id: null,
      title: "",
      author: "",
      status: "In Progress",
      fileName: "",
      fileUrl: "",
      size: "",
    });
    setIsModalOpen(true);
  };
  const openEditModal = (doc) => {
    setCurrentDoc(doc);
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!currentDoc.title || !currentDoc.author || !currentDoc.fileUrl) {
      toast({
        title: "Error",
        description: "Please fill all fields and upload a file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (currentDoc.id) {
      setDocuments(
        documents.map((d) => (d.id === currentDoc.id ? currentDoc : d))
      );
      toast({
        title: "Document updated",
        description: `${currentDoc.title} has been updated.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setDocuments([
        ...documents,
        {
          ...currentDoc,
          id: documents.length + 1,
          dateCreated: new Date().toLocaleDateString(),
          lastUpdated: "Just now",
        },
      ]);
      toast({
        title: "Document added",
        description: `${currentDoc.title} has been added.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <Container p={[1, 2, 2, 8]} maxW="container.xl" mx="auto">
      {/* Header */}
      <Stack spacing={4}>
        <Stack w="full" spacing={1}>
          <Text
            fontSize="2xs"
            opacity={0.8}
            textTransform="uppercase"
            letterSpacing={1}
          >
            You are viewing
          </Text>
          <Heading size="md" fontWeight="bold">
            Documents
          </Heading>
        </Stack>
        <Flex justify="space-between" align="center" mb={6} gap={3}>
          <InputGroup maxW="500px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by title or owner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            colorScheme="purple"
            onClick={openAddModal}
            leftIcon={<SmallAddIcon />}
          >
            Create Document
          </Button>
        </Flex>
      </Stack>

      {/* Table */}
      <Card>
        <CardBody p={0}>
          <TableContainer>
            <Table variant="simple" size="md">
              <Thead bg="purple.50">
                <Tr>
                  <Th>Item</Th>
                  <Th>Owner</Th>
                  <Th>Last Updated</Th>
                  <Th textAlign="right">Status</Th>
                  <Th textAlign="right">Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <Tr key={doc.id} _hover={{ bg: "gray.50" }}>
                      <Td>
                        <Stack spacing={0}>
                          <Heading size="sm">{doc.title}</Heading>
                          <Text
                            fontSize="sm"
                            color="gray.500"
                            verticalAlign="middle"
                          >
                            <Badge as="span" colorScheme="purple" size="2xs">
                              {doc.fileName.split(".").pop().toUpperCase()}
                            </Badge>{" "}
                            &middot; {doc.size}
                          </Text>
                        </Stack>
                      </Td>
                      <Td>
                        <Flex align="center" gap={2}>
                          <Avatar size="sm" name={doc.author} />
                          <Box>{doc.author}</Box>
                        </Flex>
                      </Td>
                      <Td>{doc.lastUpdated}</Td>
                      <Td textAlign="right">
                        <Badge colorScheme={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </Td>
                      <Td textAlign="right">
                        <ButtonGroup spacing={2}>
                          <IconButton
                            aria-label="View"
                            icon={<ViewIcon />}
                            size="sm"
                            colorScheme="blue"
                            variant="outline"
                            onClick={() => handleView(doc.fileUrl)}
                          />
                          <IconButton
                            aria-label="Edit"
                            icon={<EditIcon />}
                            size="sm"
                            colorScheme="green"
                            variant="outline"
                            onClick={() => openEditModal(doc)}
                          />
                          <IconButton
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => confirmDelete(doc.id)}
                          />
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7} textAlign="center" py={6}>
                      <Text color="gray.500">No documents found</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW="500px">
          <ModalHeader>
            {currentDoc.id ? "Edit Document" : "Add Document"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                value={currentDoc.title}
                onChange={(e) =>
                  setCurrentDoc({ ...currentDoc, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Author</FormLabel>
              <Input
                value={currentDoc.author}
                onChange={(e) =>
                  setCurrentDoc({ ...currentDoc, author: e.target.value })
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Status</FormLabel>
              <Select
                value={currentDoc.status}
                onChange={(e) =>
                  setCurrentDoc({ ...currentDoc, status: e.target.value })
                }
              >
                <option value="In Progress">In Progress</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>File</FormLabel>
              <Box
                {...getRootProps()}
                border="2px dashed gray"
                borderRadius="md"
                p={4}
                textAlign="center"
                cursor="pointer"
                bg={isDragActive ? "gray.100" : "transparent"}
              >
                <input {...getInputProps()} />
                {currentDoc.fileName ? (
                  <Text>
                    {currentDoc.fileName} ({currentDoc.size})
                  </Text>
                ) : isDragActive ? (
                  <Text>Drop the file here ...</Text>
                ) : (
                  <Text color="gray.500">
                    Drag & drop a file here, or click to select
                  </Text>
                )}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
