// src/components/InvestmentDetailModal.js
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  ModalFooter,
  VStack,
} from '@chakra-ui/react';

const InvestmentDetailModal = ({ isOpen, onClose, investment }) => {
  const handleSell = () => {
    console.log(`Selling investment in ${investment?.mutualFund}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Investment Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="gray.500">
              Mutual Fund:
              <Text as="span" ml={2} color="teal.600" fontWeight="semibold">
                {investment?.mutualFund}
              </Text>
            </Text>
            
            <Text fontWeight="bold" color="gray.500">
              Quantity:
              <Text as="span" ml={2} color="blue.500" fontWeight="semibold">
                {investment?.qty}
              </Text>
            </Text>

            <Text fontWeight="bold" color="gray.500">
              Invested Amount:
              <Text as="span" ml={2} color="green.600" fontWeight="semibold">
                ${investment?.investedAmount}
              </Text>
            </Text>

            <Text fontWeight="bold" color="gray.500">
              Current NAV:
              <Text as="span" ml={2} color="purple.500" fontWeight="semibold">
                ${investment?.currentNAV}
              </Text>
            </Text>

            <Text fontWeight="bold" color="gray.500">
              Total Amount:
              <Text as="span" ml={2} color="red.500" fontWeight="bold">
                ${investment?.totalAmount}
              </Text>
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={handleSell}>
            Sell
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestmentDetailModal;
