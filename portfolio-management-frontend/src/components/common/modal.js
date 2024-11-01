import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text
} from "@chakra-ui/react";

// The simplified modal component
const InvestmentDetailModal = ({ isOpen, onClose, investment }) => {
  // Return null if no investment data is passed
  if (!investment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg="white" color="gray.800" borderRadius="lg" shadow="lg">
        <ModalHeader>Investment Details for {investment.mutualFund}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Display investment details */}
          <Box p={4}>
            <Text><strong>Quantity:</strong> {investment.qty}</Text>
            <Text><strong>Invested Amount:</strong> ${investment.investedAmount}</Text>
            <Text><strong>Current NAV:</strong> ${investment.currentNAV}</Text>
            <Text><strong>Total Amount:</strong> ${investment.totalAmount}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestmentDetailModal;
