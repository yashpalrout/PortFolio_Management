// src/common/CardView.js
import React from 'react';
import { Box, Text, Heading, Badge } from "@chakra-ui/react";

const CardView = ({ fund }) => {
    // Check if fund is defined before accessing its properties
    if (!fund) {
        return null; // Return null or a placeholder if fund is not available
    }

    return (
        <Box 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden" 
            bg="white" 
            shadow="md" 
            p={4} 
            width="200px" 
            margin="10px"
        >
            <Heading as="h3" size="md" mb={2}>
                {fund.name}
            </Heading>
            <Text>Invested Amount: ${fund.investedAmount}</Text>
            <Text>Total Amount: ${fund.totalAmount}</Text>
            <Badge colorScheme="green" mt={2}>
                Active
            </Badge>
        </Box>
    );
};

export default CardView;
