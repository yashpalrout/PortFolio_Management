// src/pages/FundManagerPage.js
import React, { useState } from 'react';
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from '../layout/Sidebar';

const FundManagerPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const fundManagerData = {
        title: "Welcome, Fund Manager",
        message: "Here are your created fund details",
        links: [
            { label: "Your Previous Funds", path: "/previous-funds" },
        ],
        user: {
            username: "FundManagerName",
            profileImage: "/path/to/profileImage.jpg",
        },
    };

    return (
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
            <Box flex="1" p={4} bg="gray.200" minH="100vh" maxH="100vh" overflowY="auto">
                {/* Content for FundManagerPage goes here */}
            </Box>
        </Flex>
    );
};

export default FundManagerPage;
