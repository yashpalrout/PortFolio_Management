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
  Flex,
} from "@chakra-ui/react";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import InvestmentDetailModal from './InvestmentDetailModal';

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TableView = () => {
  // Sample data for the table
  const data = [
    { mutualFund: 'Fund A', qty: 100, investedAmount: 1000, currentNAV: 12, totalAmount: 1200 },
    { mutualFund: 'Fund B', qty: 50, investedAmount: 500, currentNAV: 15, totalAmount: 750 },
    { mutualFund: 'Fund C', qty: 200, investedAmount: 2000, currentNAV: 10, totalAmount: 2000 },
    { mutualFund: 'Fund D', qty: 100, investedAmount: 1000, currentNAV: 12, totalAmount: 1200 },
    { mutualFund: 'Fund E', qty: 50, investedAmount: 500, currentNAV: 15, totalAmount: 750 },
    { mutualFund: 'Fund F', qty: 200, investedAmount: 2000, currentNAV: 10, totalAmount: 2000 }
  ];

  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate totals
  const totalInvestedAmount = data.reduce((acc, item) => acc + item.investedAmount, 0);
  const totalAmount = data.reduce((acc, item) => acc + item.totalAmount, 0);

  const handleRowClick = (investment) => {
    setSelectedInvestment(investment);
    setIsModalOpen(true);
  };

  // Bar chart data for individual fund details
  const chartData = {
    labels: data.map(item => item.mutualFund),
    datasets: [
      {
        label: 'Invested Amount',
        data: data.map(item => item.investedAmount),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Total Amount',
        data: data.map(item => item.totalAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Investment vs. Total Amount per Fund',
      },
    },
  };

  // Line chart data for total invested vs. total amount comparison
  const totalComparisonData = {
    labels: ['Invested Amount', 'Total Amount'],
    datasets: [
      {
        label: 'Total Comparison',
        data: [totalInvestedAmount, totalAmount],
        borderColor: totalAmount >= totalInvestedAmount ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 99, 132, 0.8)',
        backgroundColor: totalAmount >= totalInvestedAmount ? 'rgba(75, 192, 192, 0.4)' : 'rgba(255, 99, 132, 0.4)',
        pointBackgroundColor: totalAmount >= totalInvestedAmount ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        pointBorderColor: totalAmount >= totalInvestedAmount ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
        fill: true,
      },
    ],
  };

  const totalComparisonOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Total Invested Amount vs Total Amount',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Category',
        },
      },
    },
  };

  return (
    <Box 
      p={5} 
      shadow="md" 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      width="100%" 
      maxW="6xl" 
      bg="white"
      mx="auto"
      mt={8}
    >
      <Flex direction="row" gap={8} align="start">
        {/* Table Section */}
        <Box flex="1">
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
                <Tr 
                  key={index} 
                  onClick={() => handleRowClick(item)} 
                  style={{ 
                    cursor: 'pointer', 
                    backgroundColor: index % 2 === 0 ? 'rgba(54, 162, 235, 0.8)' : 'rgba(200, 200, 2500, 1)',
                    color: 'white' // Adjust text color for visibility
                  }} // Alternating colors
                >
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
        </Box>

        {/* Chart Section */}
        <Flex direction="column" flex="1" p={4} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
          <Box>
            <Bar data={chartData} options={chartOptions} />
          </Box>
          <Box mt={8}>
            <Line data={totalComparisonData} options={totalComparisonOptions} />
          </Box>
        </Flex>
      </Flex>

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
