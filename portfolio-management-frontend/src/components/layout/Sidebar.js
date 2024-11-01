// src/layout/Sidebar.js
import React from 'react';
import { Box, Heading, VStack, Text, List, ListItem, Link, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = ({ title, message, links, user }) => {
    return (
        <Box w="250px" h="100vh" bg="blue.500" p={5} boxShadow="md" display="flex" flexDirection="column">
            {/* Top section with welcome message */}
            <VStack align="start" spacing={4} mb={6}>
                <Heading as="h2" size="md" color="white">{title}</Heading>
                <Text color="white">{message}</Text>
            </VStack>

            {/* Spacer to push links and profile to the bottom */}
            <Box flex="1" />

            {/* Links and Profile Section at the bottom */}
            <Box>
                <List spacing={2} mb={4}>
                    {links.map((link, index) => (
                        <ListItem key={index}>
                            <Link as={RouterLink} to={link.path} color="blue.100">
                                {link.label}
                            </Link>
                        </ListItem>
                    ))}
                </List>

                {/* User Section */}
                <Box textAlign="center" pt={4} borderTop="1px solid" borderColor="blue.300">
                    <Avatar name={user.username} src={user.profileImage} size="lg" mb={2} />
                    <Text color="white" fontSize="lg" fontWeight="bold">{user.username}</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
