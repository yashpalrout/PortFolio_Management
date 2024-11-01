import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import InvestmentDetailModal from './InvestmentDetailModal'; // Import the modal

const TableView = () => {
  // Sample data for the table
  const data = [
    { mutualFund: 'Fund A', qty: 100, investedAmount: 1000, currentNAV: 12, totalAmount: 1200 },
    { mutualFund: 'Fund B', qty: 50, investedAmount: 500, currentNAV: 15, totalAmount: 750 },
    { mutualFund: 'Fund C', qty: 200, investedAmount: 2000, currentNAV: 10, totalAmount: 2000 },
  ];

  // State for modal
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate totals
  const totalInvestedAmount = data.reduce((acc, item) => acc + item.investedAmount, 0);
  const totalAmount = data.reduce((acc, item) => acc + item.totalAmount, 0);

  const handleRowClick = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      width="100%" 
      maxW="4xl" 
      bg="white"
      mx="auto"
      mt={8}
    >
      <Table variant="striped" colorScheme="brand">
        <TableCaption>Investment Details</TableCaption>
        <Thead>
          <Tr>
            <Th>Mutual Fund</Th>
            <Th>Qty</Th>
            <Th isNumeric>Invested Amount</Th>
            <Th isNumeric>Current NAV</Th>
            <Th isNumeric>Total Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
              <Td>{item.mutualFund}</Td>
              <Td>{item.qty}</Td>
              <Td isNumeric>{item.investedAmount}</Td>
              <Td isNumeric>{item.currentNAV}</Td>
              <Td isNumeric>{item.totalAmount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack spacing={4} justify="space-between" mt={4} p={4} bg="gray.100" borderRadius="md">
        <Text fontWeight="bold">Total Invested Amount:</Text>
        <Text isNumeric>{totalInvestedAmount}</Text>
      </HStack>
      <HStack spacing={4} justify="space-between" mt={2} p={4} bg="gray.100" borderRadius="md">
        <Text fontWeight="bold">Total Amount:</Text>
        <Text isNumeric>{totalAmount}</Text>
      </HStack>

      {/* Investment Detail Modal */}
      <InvestmentDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        investment={selectedInvestment} 
      />
    </Box>
  );
};

export default TableView;
