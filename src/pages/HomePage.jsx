import { Box, Heading, Text, VStack, HStack, Button, SimpleGrid, Card, CardBody, Badge, Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  // Mock data (replace with actual context or API data)
  const documents = [
    { id: 1, title: "Proposal Report", dateAdded: "2025-10-01" },
    { id: 2, title: "Marketing Plan", dateAdded: "2025-09-28" },
    { id: 3, title: "Financial Analysis", dateAdded: "2025-09-25" },
  ];

  const accounts = [
    { id: 1, name: "Mike Jimenez", dateAdded: "2025-10-01" },
    { id: 2, name: "Ajad Singh Parmar", dateAdded: "2025-09-30" },
    { id: 3, name: "Rhoy Sampaga", dateAdded: "2025-09-28" },
  ];

  const logs = [
    { id: 1, action: "User Mike Jimenez logged in", date: "2025-10-03 08:10" },
    { id: 2, action: "Added document 'Proposal Report'", date: "2025-10-01 14:32" },
    { id: 3, action: "Added account 'Ajad Singh Parmar'", date: "2025-09-30 09:15" },
  ];

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <VStack spacing={6} align="start">
        {/* Hero */}
        <Heading size="2xl" color="teal.600">
          Welcome to DocuManage
        </Heading>
        <Text fontSize="lg" color="gray.600">
          This is your document management dashboard. Use the navigation above to
          access documents and accounts.
        </Text>

        <HStack spacing={4}>
          <Button colorScheme="teal" onClick={() => navigate("/documents")}>
            View Documents
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/accounts")}>
            Manage Accounts
          </Button>
        </HStack>

        <Divider />

        {/* Summary Cards */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <Card>
            <CardBody>
              <Text fontSize="sm" color="gray.500">Total Documents</Text>
              <Heading size="lg">{documents.length}</Heading>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text fontSize="sm" color="gray.500">Total Accounts</Text>
              <Heading size="lg">{accounts.length}</Heading>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Recent Additions */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <Card>
            <CardBody>
              <Text fontSize="sm" color="gray.500" mb={2}>Recent Documents</Text>
              {documents.slice(0, 3).map(doc => (
                <HStack key={doc.id} justify="space-between" mb={1}>
                  <Text>{doc.title}</Text>
                  <Badge colorScheme="teal">{doc.dateAdded}</Badge>
                </HStack>
              ))}
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Text fontSize="sm" color="gray.500" mb={2}>Recent Accounts</Text>
              {accounts.slice(0, 3).map(acc => (
                <HStack key={acc.id} justify="space-between" mb={1}>
                  <Text>{acc.name}</Text>
                  <Badge colorScheme="blue">{acc.dateAdded}</Badge>
                </HStack>
              ))}
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Activity Log */}
        <Box w="full">
          <Text fontSize="md" fontWeight="bold" mb={2}>Activity Log</Text>
          <Box bg="gray.50" p={4} borderRadius="md">
            {logs.map(log => (
              <HStack key={log.id} justify="space-between" mb={2}>
                <Text>{log.action}</Text>
                <Badge colorScheme="gray">{log.date}</Badge>
              </HStack>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
