// src/components/layout/Sidebar.js
import React from 'react';
import { Box, Heading, List, ListItem, Link } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box w="250px" h="100vh" bg="gray.100" p={5} boxShadow="md">
            <Heading as="h2" size="md" mb={6} color="gray.700">Portfolio Management</Heading>
            <List spacing={4}>
                <ListItem>
                    <Link as={RouterLink} to="/login?role=investor" color="blue.600">
                        Investor Login
                    </Link>
                </ListItem>
                <ListItem>
                    <Link as={RouterLink} to="/login?role=fund-manager" color="blue.600">
                        Fund Manager Login
                    </Link>
                </ListItem>
                <ListItem>
                    <Link as={RouterLink} to="/login?role=portal-manager" color="blue.600">
                        Portal Manager Login
                    </Link>
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;
