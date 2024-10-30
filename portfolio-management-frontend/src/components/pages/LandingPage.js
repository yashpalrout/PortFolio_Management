// src/components/pages/LandingPage.js
import React from 'react';
import { Box, VStack, Input, Button, Heading, Text } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    FormErrorIcon,
  } from "@chakra-ui/form-control"
import Sidebar from '../layout/Sidebar';

const LandingPage = () => {
    return (
        <Box display="flex" h="100vh">
            <Sidebar />
            <Box flex="1" p={10} bg="gray.50" display="flex" justifyContent="center" alignItems="center">
                <Box bg="white" p={8} rounded="lg" shadow="md" maxW="md" w="full">
                    <Heading as="h2" size="lg" mb={4} color="gray.700" textAlign="center">
                        Welcome Back!
                    </Heading>
                    <Text mb={6} color="gray.500" textAlign="center">
                        Please log in to access your account
                    </Text>
                    <VStack spacing={4} as="form">
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" placeholder="Enter your username" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder="Enter your password" />
                        </FormControl>
                        <Button colorScheme="blue" width="full" mt={4}>
                            Log In
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </Box>
    );
};

export default LandingPage;
