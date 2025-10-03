// src/pages/HomePage.jsx
import {
  Box,
  Stack,
  Heading,
  Text,
  HStack,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Divider,
  Flex,
  Progress,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data
  const documents = [
    {
      id: 1,
      title: "Proposal Report",
      status: "Approved",
      dateAdded: "2025-10-01",
    },
    {
      id: 2,
      title: "Marketing Plan",
      status: "Pending",
      dateAdded: "2025-09-28",
    },
    {
      id: 3,
      title: "Financial Analysis",
      status: "Rejected",
      dateAdded: "2025-09-25",
    },
    {
      id: 4,
      title: "Company Objectives",
      status: "Approved",
      dateAdded: "10/15/2020",
    },
    {
      id: 5,
      title: "Production Procedures",
      status: "Approved",
      dateAdded: "11/15/2020",
    },
  ];

  const accounts = [
    { id: 1, name: "Mike Jimenez", dateAdded: "2025-10-01" },
    { id: 2, name: "Ajad Singh Parmar", dateAdded: "2025-09-30" },
    { id: 3, name: "Rhoy Sampaga", dateAdded: "2025-09-28" },
  ];

  const logs = [
    { id: 1, action: "User Mike Jimenez logged in", date: "2025-10-03 08:10" },
    {
      id: 2,
      action: "Added document 'Proposal Report'",
      date: "2025-10-01 14:32",
    },
    {
      id: 3,
      action: "Added account 'Ajad Singh Parmar'",
      date: "2025-09-30 09:15",
    },
  ];

  const statusCounts = {
    Approved: documents.filter((d) => d.status === "Approved").length,
    Pending: documents.filter((d) => d.status === "Pending").length,
    Rejected: documents.filter((d) => d.status === "Rejected").length,
  };

  const totalDocs = documents.length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "yellow";
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box p={8} maxW="1400px" mx="auto">
      {/* Header */}
      <Flex justify="space-between" align="flex-end" mb={6} flexWrap="wrap">
        <Box>
          {user && (
            <>
              <Heading size="xl" color="blackAlpha.600">
                Welcome,
              </Heading>
              <Heading size="2xl" color="purple.600">
                {user.username}!
              </Heading>
            </>
          )}
          <Text fontSize="lg" color="gray.600" mt={2}>
            This is your
            <Badge
              colorScheme={user.userType === "admin" ? "purple" : "blue"}
              px={2}
              py={1}
              mx={1}
            >
              {user.userType}
            </Badge>
            document management dashboard.
          </Text>
        </Box>
        <Button
          colorScheme="purple"
          onClick={() => navigate("/documents")}
          h="40px"
        >
          + New Document
        </Button>
      </Flex>

      <Divider mb={6} />

      {/* Summary Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} mb={6}>
        <Card>
          <CardBody>
            <Text fontSize="sm" color="gray.500">
              Documents
            </Text>
            <Heading size="lg">{totalDocs}</Heading>
          </CardBody>
        </Card>
        <Card bg="green.50">
          <CardBody>
            <Text fontSize="sm" color="gray.500">
              Approved
            </Text>
            <Heading size="lg">{statusCounts.Approved}</Heading>
          </CardBody>
        </Card>
        <Card bg="orange.50">
          <CardBody>
            <Text fontSize="sm" color="gray.500">
              Pending
            </Text>
            <Heading size="lg">{statusCounts.Pending}</Heading>
          </CardBody>
        </Card>
        <Card bg="red.50">
          <CardBody>
            <Text fontSize="sm" color="gray.500">
              Rejected
            </Text>
            <Heading size="lg">{statusCounts.Rejected}</Heading>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Detailed Cards */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <Card>
          <CardBody>
            <Heading size="md" mb={3}>
              Recent Documents
            </Heading>
            {documents.map((doc) => (
              <HStack key={doc.id} justify="space-between" mb={2}>
                <Text>{doc.title}</Text>
                <Badge colorScheme={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
              </HStack>
            ))}
          </CardBody>
        </Card>

        {user.userType !== "user" && (
          <Card>
            <CardBody>
              <Heading size="md" mb={3}>
                Recent Accounts
              </Heading>
              {accounts.map((acc) => (
                <HStack key={acc.id} justify="space-between" mb={2}>
                  <Text>{acc.name}</Text>
                  <Badge colorScheme="blue">New</Badge>
                </HStack>
              ))}
            </CardBody>
          </Card>
        )}

        <Card>
          <CardBody>
            <Heading size="md" mb={3}>
              Activity Timeline
            </Heading>
            {logs.map((log) => (
              <HStack key={log.id} justify="space-between" mb={2}>
                <Text fontSize="sm">{log.action}</Text>
                <Text color="blackAlpha.600" fontSize="xs">
                  {/* {moment(new Date(log.date)).format("MMM DD, YYYY HH:mm")} */}
                  {moment(new Date(log.date)).fromNow()}
                </Text>
              </HStack>
            ))}
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Document Status Progress */}
      <Stack mt={6} spacing={6}>
        <Text fontSize="md" fontWeight="bold" mb={2}>
          Document Summary
        </Text>
        <Box>
          <Tooltip
            hasArrow
            label={`You have ${statusCounts.Approved} Approved Documents out of ${totalDocs} Total Documents`}
          >
            <Progress
              value={(statusCounts.Approved / totalDocs) * 100}
              colorScheme="green"
              borderRadius="md"
            />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            hasArrow
            label={`You have ${statusCounts.Pending} Pending Documents out of ${totalDocs} Total Documents`}
          >
            <Progress
              value={(statusCounts.Pending / totalDocs) * 100}
              colorScheme="yellow"
              borderRadius="md"
            />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip
            hasArrow
            label={`You have ${statusCounts.Rejected} Rejected Documents out of ${totalDocs} Total Documents`}
          >
            <Progress
              value={(statusCounts.Rejected / totalDocs) * 100}
              colorScheme="red"
              borderRadius="md"
            />
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  );
}
