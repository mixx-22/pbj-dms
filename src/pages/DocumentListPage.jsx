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
  Badge,
  Avatar,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ViewIcon, SearchIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Documents() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      title: "Proposal Report",
      author: "Emily Thompson",
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
      author: "Sophia Martinez",
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
      author: "Daniel Lewis",
      status: "Rejected",
      fileName: "financial-report.pdf",
      fileUrl: "/files/financial-report.pdf",
      size: "2.8 MB",
      dateCreated: "11/02/2023",
      lastUpdated: "13 hrs ago • Daniel Lewis",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState(""); // search state
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

  // filter documents based on search query (title or author)
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={6}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" mb={6}>
        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Button colorScheme="blue" onClick={() => navigate("/documents/new")}>
          + Create Document
        </Button>
      </Flex>

      {/* Documents Table */}
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
                {/* File name */}
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
                    colorScheme={
                      doc.status === "Approved"
                        ? "green"
                        : doc.status === "In Progress"
                        ? "yellow"
                        : doc.status === "Rejected"
                        ? "red"
                        : "gray"
                    }
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
  );
}
