import { useState } from 'react';
import api from '../services/api';

export const useRideEstimate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estimateRide = async (customerId: string, origin: string, destination: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/ride/estimate', { customer_id: customerId, origin, destination });
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError('Erro ao estimar a viagem. Por favor, tente novamente.');
      throw err;
    }
  };

  return { estimateRide, isLoading, error };
};

