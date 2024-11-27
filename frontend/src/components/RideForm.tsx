import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Input,
  FormLabel,
  FormControl,
  Heading,
} from '@chakra-ui/react';

interface RideFormProps {
  onSubmit: (customerId: string, origin: string, destination: string) => void;
}

const RideForm: React.FC<RideFormProps> = ({ onSubmit }) => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(customerId, origin, destination);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxWidth="400px" margin="auto">
      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="lg" textAlign="center">
          Solicitar Viagem
        </Heading>
        <FormControl isRequired>
          <FormLabel htmlFor="customerId">ID do Usuário</FormLabel>
          <Input
            id="customerId"
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Digite o ID do usuário"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="origin">Origem</FormLabel>
          <Input
            id="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Digite o endereço de origem"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="destination">Destino</FormLabel>
          <Input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Digite o endereço de destino"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" size="lg">
          Estimar Viagem
        </Button>
      </VStack>
    </Box>
  );
};

export default RideForm;
