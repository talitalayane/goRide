import React, { useState } from 'react';
import { Box, Heading, VStack, FormControl, FormLabel, Input, Select, Button, useToast } from '@chakra-ui/react';
import RideHistory from '../components/RideHistory';
import { useRideHistory } from '../hooks/useRideHistory';

const History: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [rides, setRides] = useState([]);
  const toast = useToast();
  const { fetchRideHistory, isLoading, error } = useRideHistory();

  const handleFetchHistory = async () => {
    try {
      const data = await fetchRideHistory(customerId, selectedDriver);
      setRides(data.rides);
    } catch (err) {
      toast({
        title: 'Erro ao buscar histórico',
        description: error || 'Ocorreu um erro ao buscar o histórico de viagens.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Histórico de Viagens
        </Heading>
        <VStack as="form" spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>ID do Usuário</FormLabel>
            <Input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Digite o ID do usuário"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Filtrar por Motorista</FormLabel>
            <Select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              placeholder="Selecione um motorista (opcional)"
            >
              <option value="">Todos os motoristas</option>
              {/* Adicione opções de motoristas aqui */}
            </Select>
          </FormControl>
          <Button onClick={handleFetchHistory} colorScheme="blue" isLoading={isLoading}>
            Buscar Histórico
          </Button>
        </VStack>
        {rides.length > 0 && <RideHistory rides={rides} />}
      </VStack>
    </Box>
  );
};

export default History;

