import React, { useState } from 'react';
import { Box, Heading, VStack, useToast } from '@chakra-ui/react';
import RideForm from '../components/RideForm';
import RideOptions, { Driver } from '../components/RideOptions';
import { useRideEstimate } from '../hooks/useRideEstimate';

interface EstimateData {
  options: Driver[];
}

const RideEstimate: React.FC = () => {
  const [estimateData, setEstimateData] = useState<EstimateData | null>(null);
  const toast = useToast();
  const { estimateRide, isLoading, error } = useRideEstimate();

  const handleEstimateSubmit = async (customerId: string, origin: string, destination: string) => {
    try {
      const data = await estimateRide(customerId, origin, destination);
      setEstimateData(data as EstimateData);
    } catch (err) {
      toast({
        title: 'Erro ao estimar viagem',
        description: error || 'Ocorreu um erro ao processar sua solicitação.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDriverSelect = (driver: Driver) => {
    // Implementar lógica para selecionar motorista e navegar para a página de confirmação
    console.log('Motorista selecionado:', driver);
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Solicitar Estimativa de Viagem
        </Heading>
        <RideForm onSubmit={handleEstimateSubmit} />
        {estimateData && (
          <RideOptions options={estimateData.options} onSelectDriver={handleDriverSelect} />
        )}
      </VStack>
    </Box>
  );
};

export default RideEstimate;

