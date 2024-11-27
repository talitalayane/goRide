import { useState } from 'react';
import api from '../services/api';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: UserData): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/users', userData);
      setIsLoading(false);
      return response.data.id; // Assumindo que a API retorna o ID do usuário criado
    } catch (err) {
      setIsLoading(false);
      setError('Erro ao criar usuário. Por favor, tente novamente.');
      throw err;
    }
  };

  return { createUser, isLoading, error };
};

