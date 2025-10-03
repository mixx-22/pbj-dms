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
      status: "In Progress",
      fileName: "proposal.pdf",
      fileUrl: "/files/proposal.pdf",
      size: "1.2 MB",
      dateCreated: "02/17/2024",
      lastUpdated: "2 hrs ago • Ava Wilson",
    },
    {
      id: 2,
      title: "Marketing Plan",
      author: "Ajad Singh Parmar",
      status: "Approved",
      fileName: "marketing-plan.pdf",
      fileUrl: "/files/marketing-plan.pdf",
      size: "3.0 MB",
      dateCreated: "03/19/2024",
      lastUpdated: "1 hr ago • Sophia Martinez",
    },
    {
      id: 3,
      title: "Financial Analysis",
      author: "Rhoy Sampaga",
      status: "Rejected",
      fileName: "financial-report.pdf",
      fileUrl: "/files/financial-report.pdf",
      size: "2.8 MB",
      dateCreated: "11/02/2023",
      lastUpdated: "13 hrs ago • Daniel Lewis",
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

      {/* Responsive Table */}
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
                  {/* File Name */}
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
                        PDF
                      </Box>
                      <Box>
                        <Box fontWeight="medium">{doc.title}</Box>
                        <Text fontSize="sm" color="gray.500">
                          {doc.size}
                        </Text>
                      </Box>
                    </Flex>
                  </Td>

                  {/* Owner */}
                  <Td>
                    <Flex align="center" gap={2}>
                      <Avatar size="sm" name={doc.author} />
                      <Box>{doc.author}</Box>
                    </Flex>
                  </Td>

                  <Td>{doc.size}</Td>
                  <Td>{doc.dateCreated}</Td>
                  <Td>{doc.lastUpdated}</Td>

                  {/* Status */}
                  <Td>
                    <Badge
                      colorScheme={getStatusColor(doc.status)}
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {doc.status}
                    </Badge>
                  </Td>

                  {/* Actions */}
                  <Td textAlign="right">
                    <IconButton
                      aria-label="View PDF"
                      icon={<ViewIcon />}
                      size="sm"
                      mr={2}
                      onClick={() => window.open(doc.fileUrl, "_blank")}
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
