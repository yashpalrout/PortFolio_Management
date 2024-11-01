// src/components/layout/Sidebar.js
import React from 'react';
import { Box, Heading, List, ListItem, Link, VStack, Spacer, Text } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Box w="250px" h="100vh" bg="blue.500" p={5} boxShadow="md" display="flex" flexDirection="column">
            {/* Top section: Welcome message */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading as="h2" size="md" color="white">Welcome</Heading>
                <Text color="white">Manage your portfolio with ease and learn more about us!</Text>
            </VStack>
            
            {/* Spacer to push information section to the bottom */}
            <Spacer />

            {/* Bottom section: Information links */}
            <Box>
                <Heading as="h3" size="sm" color="white" mt={4}>Information</Heading>
                <List spacing={2} mt={2}>
                    <ListItem>
                        <Link as={RouterLink} to="/about" color="blue.100">
                            About Us
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link as={RouterLink} to="/terms" color="blue.100">
                            Terms and Conditions
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Link as={RouterLink} to="/privacy" color="blue.100">
                            Privacy Policy
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;
