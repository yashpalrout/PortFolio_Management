// src/components/pages/LandingPage.js
import React, { useState } from 'react';
import { Box, Flex } from "@chakra-ui/react";

import Sidebar from '../layout/Sidebar';
import Login from './Login';
import SignupCard from './SignUp'; // Import the SignupCard component

const LandingPage = () => {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup

    return (
        <Flex display="flex" minH={'100vh'}>
            <Box width="250px" bg="gray.100"> {/* Set width for the sidebar */}
                <Sidebar />
            </Box>
            <Box flex="1" p={4} bg="gray.200" minH={'100vh'}> {/* Allow login/signup to take the remaining space */}
                {isLogin ? ( // Conditional rendering based on isLogin state
                    <Login onSignupClick={() => setIsLogin(false)} /> // Pass the function to switch to Signup
                ) : (
                    <SignupCard onLoginClick={() => setIsLogin(true)} /> // Pass the function to switch to Login
                )}
            </Box>
        </Flex>
    );
};

export default LandingPage;
