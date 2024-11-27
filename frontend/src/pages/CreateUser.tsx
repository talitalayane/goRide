import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useCreateUser } from '../hooks/useCreateUser';

const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { createUser, isLoading, error } = useCreateUser();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = await createUser({ name, email, phone });
      toast({
        title: 'Usuário criado com sucesso',
        description: `ID do usuário: ${userId}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Limpar o formulário após o sucesso
      setName('');
      setEmail('');
      setPhone('');
    } catch (err) {
      toast({
        title: 'Erro ao criar usuário',
        description: error || 'Ocorreu um erro ao processar sua solicitação.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Criar Novo Usuário
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Telefone</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Digite seu telefone"
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" isLoading={isLoading} width="100%">
              Criar Usuário
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default CreateUser;

