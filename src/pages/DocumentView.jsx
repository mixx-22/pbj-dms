// src/pages/DocumentView.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Badge,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

export default function DocumentView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy fetch: you can replace with API later
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    author: "",
    category: "",
    status: "Pending",
    fileName: "",
  });

  useEffect(() => {
    // simulate fetching the document by ID
    const dummyDocs = [
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
    ];
    const doc = dummyDocs.find((d) => d.id === Number(id));
    if (doc) setFormData(doc);
  }, [id]);

  const handleSave = () => {
    Swal.fire("Saved!", "The document has been updated.", "success");
  };

  const handleDelete = () => {
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
        Swal.fire("Deleted!", "The document has been removed.", "success").then(
          () => {
            navigate("/documents");
          }
        );
      }
    });
  };

  // Dropzone
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFormData({ ...formData, fileName: acceptedFiles[0].name });
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box p={6}>
      <Box fontSize="xl" fontWeight="bold" mb={4}>
        Document Details
      </Box>

      <FormControl mb={3}>
        <FormLabel>Title</FormLabel>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Author</FormLabel>
        <Input
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>Upload File</FormLabel>
        <Box
          {...getRootProps()}
          p={5}
          border="2px dashed"
          borderColor={isDragActive ? "blue.400" : "gray.300"}
          borderRadius="md"
          textAlign="center"
          cursor="pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text color="blue.400">Drop the file here...</Text>
          ) : (
            <Text color="gray.500">
              Drag & drop a file here, or click to select one
            </Text>
          )}
        </Box>
        {formData.fileName && (
          <Box mt={2} fontSize="sm" color="gray.500">
            Selected: {formData.fileName}
          </Box>
        )}
      </FormControl>

      <Box mt={6} display="flex" gap={3}>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
        <Spacer />
        <Button variant="ghost" onClick={() => navigate("/documents")}>
          Back to List
        </Button>
        <Button colorScheme="blue" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
