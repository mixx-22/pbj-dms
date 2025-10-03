// src/pages/DocumentListPage.jsx
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon, SearchIcon } from "@chakra-ui/icons";

export default function Documents() {
  const toast = useToast();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([
    { id: 1, title: "Proposal Report", author: "Mike Jimenez", username: "mike", status: "In Progress", fileName: "proposal.pdf", fileUrl: "/files/proposal.pdf", size: "1.2 MB", dateCreated: "02/17/2024", lastUpdated: "2 hrs ago • Ajad Parmar" },
    { id: 2, title: "Marketing Plan", author: "Ajad Parmar", username: "ajad", status: "Approved", fileName: "marketing-plan.pdf", fileUrl: "/files/marketing-plan.pdf", size: "3.0 MB", dateCreated: "03/19/2024", lastUpdated: "1 hr ago • Ajad Parmar" },
    { id: 3, title: "Financial Analysis", author: "Rhoy Sampaga", username: "aristotle", status: "Rejected", fileName: "financial-report.docx", fileUrl: "/files/financial-report.docx", size: "2.8 MB", dateCreated: "11/02/2023", lastUpdated: "13 hrs ago • Ajad Parmar" },
    { id: 4, title: "Company Objectives", author: "Mike Jimenez", username: "mike", status: "Approved", fileName: "company-objectives.doc", fileUrl: "/files/company-objectives.doc", size: "2.8 MB", dateCreated: "10/15/2020", lastUpdated: "13 hrs ago • Mike Jimenez" },
    { id: 5, title: "Production Procedures", author: "Ajad Parmar", username: "ajad", status: "Approved", fileName: "production-procedures.pdf", fileUrl: "/files/production-procedures.pdf", size: "2.8 MB", dateCreated: "11/15/2020", lastUpdated: "10 hrs ago • Aristotle Bataan" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const cancelRef = useRef();

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
    doc =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "green";
      case "In Progress": return "yellow";
      case "Rejected": return "red";
      default: return "gray";
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

  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    const docToDelete = documents.find(d => d.id === deleteId);
    setDocuments(documents.filter(d => d.id !== deleteId));
    toast({ title: "Document deleted", description: `${docToDelete.title} has been removed.`, status: "success", duration: 3000, isClosable: true });
    setDeleteId(null);
  };

  // Drag & Drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setCurrentDoc(prev => ({
        ...prev,
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      }));
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const openAddModal = () => {
    setCurrentDoc({ id: null, title: "", author: "", status: "In Progress", fileName: "", fileUrl: "", size: "" });
    setIsModalOpen(true);
  };
  const openEditModal = (doc) => {
    setCurrentDoc(doc);
    setIsModalOpen(true);
  };
  const handleSave = () => {
    if (!currentDoc.title || !currentDoc.author || !currentDoc.fileUrl) {
      toast({ title: "Error", description: "Please fill all fields and upload a file.", status: "error", duration: 3000, isClosable: true });
      return;
    }
    if (currentDoc.id) {
      setDocuments(documents.map(d => d.id === currentDoc.id ? currentDoc : d));
      toast({ title: "Document updated", description: `${currentDoc.title} has been updated.`, status: "success", duration: 3000, isClosable: true });
    } else {
      setDocuments([...documents, { ...currentDoc, id: documents.length + 1, dateCreated: new Date().toLocaleDateString(), lastUpdated: "Just now" }]);
      toast({ title: "Document added", description: `${currentDoc.title} has been added.`, status: "success", duration: 3000, isClosable: true });
    }
    setIsModalOpen(false);
  };

  return (
    <Box p={6}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={3}>
        <Box fontSize="xl" fontWeight="bold">Documents</Box>
        <Flex align="center" gap={3} justifyContent="flex-end" flex="1">
          <Button colorScheme="blue" onClick={openAddModal} w="200px">+ Create Document</Button>
          <InputGroup maxW="500px">
            <InputLeftElement pointerEvents="none"><SearchIcon color="gray.400" /></InputLeftElement>
            <Input placeholder="Search by title or owner" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </InputGroup>
        </Flex>
      </Flex>

      {/* Table */}
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th><Th>Owner</Th><Th>Size</Th><Th>Date Created</Th><Th>Last Updated</Th><Th>Status</Th><Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredDocuments.length > 0 ? filteredDocuments.map(doc => (
              <Tr key={doc.id} _hover={{ bg: "gray.50" }}>
                <Td>
                  <Flex align="center" gap={3}>
                    <Box bg="red.100" color="red.600" px={2} py={1} borderRadius="md" fontSize="xs" fontWeight="bold">{doc.fileName.split(".").pop().toUpperCase()}</Box>
                    <Box>
                      <Box fontWeight="medium">{doc.title}</Box>
                      <Text fontSize="sm" color="gray.500">{doc.size}</Text>
                    </Box>
                  </Flex>
                </Td>
                <Td><Flex align="center" gap={2}><Avatar size="sm" name={doc.author} /><Box>{doc.author}</Box></Flex></Td>
                <Td>{doc.size}</Td>
                <Td>{doc.dateCreated}</Td>
                <Td>{doc.lastUpdated}</Td>
                <Td><Badge colorScheme={getStatusColor(doc.status)} px={2} py={1} borderRadius="full">{doc.status}</Badge></Td>
                <Td textAlign="right">
                  <IconButton aria-label="View" icon={<ViewIcon />} size="sm" mr={2} onClick={() => handleView(doc.fileUrl)} />
                  <IconButton aria-label="Edit" icon={<EditIcon />} size="sm" mr={2} onClick={() => openEditModal(doc)} />
                  <IconButton aria-label="Delete" icon={<DeleteIcon />} size="sm" colorScheme="red" onClick={() => confirmDelete(doc.id)} />
                </Td>
              </Tr>
            )) : (
              <Tr><Td colSpan={7} textAlign="center" py={6}><Text color="gray.500">No documents found</Text></Td></Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* Delete Confirmation */}
      <AlertDialog isOpen={deleteId !== null} leastDestructiveRef={cancelRef} onClose={() => setDeleteId(null)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Delete Document</AlertDialogHeader>
            <AlertDialogBody>Are you sure you want to delete this document? This action cannot be undone.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteId(null)}>Cancel</Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>Delete</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW="500px">
          <ModalHeader>{currentDoc.id ? "Edit Document" : "Add Document"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input value={currentDoc.title} onChange={e => setCurrentDoc({ ...currentDoc, title: e.target.value })} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Author</FormLabel>
              <Input value={currentDoc.author} onChange={e => setCurrentDoc({ ...currentDoc, author: e.target.value })} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Status</FormLabel>
              <Select value={currentDoc.status} onChange={e => setCurrentDoc({ ...currentDoc, status: e.target.value })}>
                <option value="In Progress">In Progress</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>File</FormLabel>
              <Box {...getRootProps()} border="2px dashed gray" borderRadius="md" p={4} textAlign="center" cursor="pointer" bg={isDragActive ? "gray.100" : "transparent"}>
                <input {...getInputProps()} />
                {currentDoc.fileName ? (
                  <Text>{currentDoc.fileName} ({currentDoc.size})</Text>
                ) : isDragActive ? (
                  <Text>Drop the file here ...</Text>
                ) : (
                  <Text color="gray.500">Drag & drop a file here, or click to select</Text>
                )}
              </Box>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSave}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
