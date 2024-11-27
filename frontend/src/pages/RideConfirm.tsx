import React from 'react';
import { Box, Heading, VStack, Text, Button, useToast } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRideConfirm } from '../hooks/useRideConfirm';

const RideConfirm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { confirmRide, isLoading, error } = useRideConfirm();

  // Assumindo que os dados da viagem são passados através do estado da rota
  const rideData = location.state?.rideData;

  const handleConfirm = async () => {
    if (!rideData) {
      toast({
        title: 'Erro',
        description: 'Dados da viagem não encontrados.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await confirmRide(rideData);
      toast({
        title: 'Viagem confirmada',
        description: 'Sua viagem foi confirmada com sucesso!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/history');
    } catch (err) {
      toast({
        title: 'Erro ao confirmar viagem',
        description: error || 'Ocorreu um erro ao confirmar sua viagem.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!rideData) {
    return (
      <Box maxWidth="800px" margin="auto" padding={8}>
        <Text>Nenhuma informação de viagem disponível.</Text>
      </Box>
    );
  }

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Confirmar Viagem
        </Heading>
        <VStack spacing={4} align="stretch">
          <Text><strong>Origem:</strong> {rideData.origin}</Text>
          <Text><strong>Destino:</strong> {rideData.destination}</Text>
          <Text><strong>Motorista:</strong> {rideData.driver.name}</Text>
          <Text><strong>Valor:</strong> R$ {rideData.value.toFixed(2)}</Text>
        </VStack>
        <Button onClick={handleConfirm} colorScheme="green" isLoading={isLoading}>
          Confirmar Viagem
        </Button>
      </VStack>
    </Box>
  );
};

export default RideConfirm;

