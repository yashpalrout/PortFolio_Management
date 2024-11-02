// src/pages/FundManagerPage.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Box, Flex, IconButton, SimpleGrid } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "../layout/Sidebar";
import CardView from "../common/CardView"; // Import CardView

const FundManagerPage = () => {
  let { fund_type } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fundManagerData = {
    title: "Welcome, Fund Manager",
    message: "Here are your fund details",
    links: [
      { label: "Active funds", path: "/FundManagerPage/active" },
      { label: "Create new funds", path: "/new-funds" },
      { label: "Stocks", path: "/stocks" },
      { label: "Closed Funds", path: "/FundManagerPage/closed" },
    ],
    user: {
      username: "YashPal Rout",
      profileImage: "/path/to/profileImage.jpg",
    },
  };

  // Sample fund data
  const funds = [
    { name: "Fund A", investedAmount: 1000, totalAmount: 1200, type: "closed" },
    { name: "Fund B", investedAmount: 2000, totalAmount: 2500, type: "active" },
    { name: "Fund C", investedAmount: 1500, totalAmount: 1800, type: "active" },
    { name: "Fund D", investedAmount: 3000, totalAmount: 3500, type: "closed" },
  ];

  const filterFunds = funds.filter(checkFunction);
  function checkFunction(fund) {
    return fund.type == fund_type;
  }

  return (
    // SideBar code
    <Flex minH="100vh">
      {isSidebarOpen ? (
        <Box width="250px" bg="gray.100" position="sticky" top="0">
          <Sidebar {...fundManagerData} />
          <IconButton
            aria-label="Close sidebar"
            icon={<CloseIcon />}
            onClick={() => setIsSidebarOpen(false)}
            position="absolute"
            top="10px"
            right="10px"
          />
        </Box>
      ) : (
        <IconButton
          aria-label="Open sidebar"
          icon={<HamburgerIcon />}
          onClick={() => setIsSidebarOpen(true)}
          position="fixed"
          top="10px"
          left="10px"
          zIndex="1"
        />
      )}
      {/* SideBar ended */}
      {/* Boxes for different funds */}
      <Box
        flex="1"
        p={4}
        bg="gray.200"
        minH="100vh"
        maxH="100vh"
        overflowY="auto"
      >
        <Box padding="10px" borderRadius="md" bg="white">
          <Heading as="h2" size="3xl" noOfLines={1} pl="35%">
            {fund_type == "active" ? "Active Funds" : "Closed Funds"}
          </Heading>
          <br />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {filterFunds.map((fund, index) => (
              <CardView key={index} fund={fund} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Flex>
  );
};

export default FundManagerPage;
