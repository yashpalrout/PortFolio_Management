// src/components/pages/LandingPage.js
import React from 'react';
import { Box, Flex } from "@chakra-ui/react";

import Sidebar from '../layout/Sidebar';
import TableView from '../common/TableView'

const InvestorPage = () => {
    
    return (
        <Flex display="flex" minH={'100vh'}>
            <Box width="250px" bg="gray.100"> {/* Set width for the sidebar */}
                <Sidebar />
            </Box>
            <Box flex="1" p={4} bg="gray.200" minH={'100vh'}> {/* Allow login/signup to take the remaining space */}
                <TableView />
            </Box>
        </Flex>
    );
};

export default InvestorPage;
