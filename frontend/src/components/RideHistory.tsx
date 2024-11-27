import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';

interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

interface RideHistoryProps {
  rides: Ride[];
}

const RideHistory: React.FC<RideHistoryProps> = ({ rides }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Histórico de Viagens</TableCaption>
        <Thead>
          <Tr>
            <Th>Data</Th>
            <Th>Motorista</Th>
            <Th>Origem</Th>
            <Th>Destino</Th>
            <Th isNumeric>Distância (km)</Th>
            <Th>Duração</Th>
            <Th isNumeric>Valor (R$)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rides.map((ride) => (
            <Tr key={ride.id}>
              <Td>{new Date(ride.date).toLocaleString()}</Td>
              <Td>{ride.driver.name}</Td>
              <Td>{ride.origin}</Td>
              <Td>{ride.destination}</Td>
              <Td isNumeric>{ride.distance.toFixed(2)}</Td>
              <Td>{ride.duration}</Td>
              <Td isNumeric>{ride.value.toFixed(2)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default RideHistory;

