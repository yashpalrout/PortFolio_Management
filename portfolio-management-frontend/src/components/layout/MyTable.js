import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function MyTable() {
  const dummyData = [
    { name: "tata", current: 440, change: 1.2, high: 450, low: 420 },
    { name: "tata", current: 440, change: 1.2, high: 450, low: 420 },
    { name: "tata", current: 440, change: 1.2, high: 450, low: 420 },
    { name: "tata", current: 440, change: 1.2, high: 450, low: 420 },
  ];
  return (
    <TableContainer maxWidth="80%" pl={"20%"}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Stocks</Th>
            <Th>Current</Th>
            <Th>Change(%)</Th>
            <Th>Days's High(Rs)</Th>
            <Th>Days's Low(Rs)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dummyData.map((stocks, index) => (
            <Tr key={index}>
              <Td>{stocks.name}</Td>
              <Td color={"red"}>{stocks.current}</Td>
              <Td>{stocks.change}</Td>
              <Td>{stocks.high}</Td>
              <Td>{stocks.low}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>Tata</Td>
            <Td>1300</Td>
            <Td>+3.8</Td>
            <Td>1350</Td>
            <Td>1330</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
