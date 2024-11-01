import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';

const InvestmentDetailModal = ({ isOpen, onClose, investment }) => {
  if (!investment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Investment Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text><strong>Mutual Fund:</strong> {investment.mutualFund}</Text>
          <Text><strong>Quantity:</strong> {investment.qty}</Text>
          <Text><strong>Invested Amount:</strong> {investment.investedAmount}</Text>
          <Text><strong>Current NAV:</strong> {investment.currentNAV}</Text>
          <Text><strong>Total Amount:</strong> {investment.totalAmount}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InvestmentDetailModal;
