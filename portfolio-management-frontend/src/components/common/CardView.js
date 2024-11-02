import React from "react";
import { Box, Text, Heading, Badge, Button } from "@chakra-ui/react";

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
      <Badge colorScheme={fund.type === "active" ? "green" : "red"} mt={2}>
        {fund.type}
      </Badge>
      <br />
      <br />
      <Button colorScheme="blue">More Details</Button>
    </Box>
  );
};

export default CardView;
