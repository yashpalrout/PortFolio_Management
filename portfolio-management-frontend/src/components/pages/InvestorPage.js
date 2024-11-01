// src/pages/InvestorPage.js
import React, { useState } from 'react';
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from '../layout/Sidebar';
import TableView from '../common/TableView'; // Ensure this component exists

const InvestorPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const investorData = {
        title: "Welcome, Investor",
        message: "Here are your investment details",
        links: [
            { label: "Wallet", path: "/wallet" },
            { label: "Your Profile", path: "/profile" },
        ],
        user: {
            username: "InvestorName",
            profileImage: "/path/to/profileImage.jpg", // Replace with actual path
        },
    };

    return (
        <Flex minH="100vh">
            {isSidebarOpen ? (
                <Box width="250px" bg="gray.100" position="sticky" top="0">
                    <Sidebar {...investorData} />
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
            <Box flex="1" p={4} bg="gray.200" minH="100vh" maxH="100vh" overflowY="auto">
                {/* Render main content of the InvestorPage */}
                <TableView />
            </Box>
        </Flex>
    );
};

export default InvestorPage;
