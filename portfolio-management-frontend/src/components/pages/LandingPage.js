import React, { useState } from 'react';
import { Box, Flex } from "@chakra-ui/react";

import Sidebar from '../layout/Sidebar';
import Login from './Login';
import SignupCard from './SignUp';

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const sidebarData = {
        title: "Welcome to the App",
        message: "Please log in or sign up to continue",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Contact", path: "/contact" },
        ],
        user: {
            username: "Guest",
            profileImage: "", // Optional placeholder
        },
    };

    return (
        <Flex minH="100vh">
            <Box width="250px" bg="gray.100">
                <Sidebar {...sidebarData} />
            </Box>
            <Box flex="1" p={4} bg="gray.200" minH="100vh">
                {isLogin ? (
                    <Login onSignupClick={() => setIsLogin(false)} />
                ) : (
                    <SignupCard onLoginClick={() => setIsLogin(true)} />
                )}
            </Box>
        </Flex>
    );
};

export default LandingPage;
