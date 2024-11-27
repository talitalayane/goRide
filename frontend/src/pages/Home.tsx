import React from 'react';
import { Box, Heading, VStack, Button, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Bem-vindo ao goRide
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Seu aplicativo de transporte particular
        </Text>
        <VStack spacing={4}>
          <Button as={RouterLink} to="/estimate" colorScheme="blue" size="lg" width="100%">
            Solicitar Viagem
          </Button>
          <Button as={RouterLink} to="/history" colorScheme="green" size="lg" width="100%">
            Histórico de Viagens
          </Button>
          <Button as={RouterLink} to="/create-user" colorScheme="purple" size="lg" width="100%">
            Criar Novo Usuário
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Home;

