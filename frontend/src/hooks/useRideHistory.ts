import { useState } from 'react';
import api from '../services/api';

export const useRideHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRideHistory = async (customerId: string, driverId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = driverId ? `/ride/${customerId}?driver_id=${driverId}` : `/ride/${customerId}`;
      const response = await api.get(url);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError('Erro ao buscar o histórico de viagens. Por favor, tente novamente.');
      throw err;
    }
  };

  return { fetchRideHistory, isLoading, error };
};

