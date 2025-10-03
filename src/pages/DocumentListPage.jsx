// src/pages/DocumentListPage.jsx
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
  Badge,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function Documents() {
  const toast = useToast();
  const navigate = useNavigate();

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

  // NEW: Handle viewing files (PDF opens in-browser, DOC/DOCX triggers download)
  const handleView = (fileUrl) => {
    const ext = fileUrl.split(".").pop().toLowerCase();

    if (ext === "pdf") {
      window.open(fileUrl, "_blank");
    } else if (ext === "doc" || ext === "docx") {
      // Fallback: download the file
      const link = document.createElement("a");
      link.href = fileUrl;
      link.target = "_blank";
      link.download = fileUrl.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <Box p={6}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap" gap={3}>
        <Box fontSize="xl" fontWeight="bold">
          Documents
        </Box>
        <Flex align="center" gap={3} justifyContent="flex-end" flex="1">
          <Button colorScheme="blue" onClick={() => navigate("/documents/new")} w="200px">
            + Create Document
          </Button>
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
        </Flex>
      </Flex>

      {/* Documents Table */}
      <Box overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Owner</Th>
              <Th>Size</Th>
              <Th>Date Created</Th>
              <Th>Last Updated</Th>
              <Th>Status</Th>
              <Th textAlign="right">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <Tr key={doc.id} _hover={{ bg: "gray.50" }}>
                  <Td>
                    <Flex align="center" gap={3}>
                      <Box
                        bg="red.100"
                        color="red.600"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {doc.fileName.split(".").pop().toUpperCase()}
                      </Box>
                      <Box>
                        <Box fontWeight="medium">{doc.title}</Box>
                        <Text fontSize="sm" color="gray.500">
                          {doc.size}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center" gap={2}>
                      <Avatar size="sm" name={doc.author} />
                      <Box>{doc.author}</Box>
                    </Flex>
                  </Td>
                  <Td>{doc.size}</Td>
                  <Td>{doc.dateCreated}</Td>
                  <Td>{doc.lastUpdated}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(doc.status)} px={2} py={1} borderRadius="full">
                      {doc.status}
                    </Badge>
                  </Td>
                  <Td textAlign="right">
                    <IconButton
                      aria-label="View Document"
                      icon={<ViewIcon />}
                      size="sm"
                      mr={2}
                      onClick={() => handleView(doc.fileUrl)}
                    />
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      mr={2}
                      onClick={() => navigate(`/documents/${doc.id}`)}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(doc.id)}
                    />
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
      </Box>
    </Box>
  );
}
