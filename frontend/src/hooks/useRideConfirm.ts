import { useState } from 'react';
import api from '../services/api';

export const useRideConfirm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmRide = async (rideData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.patch('/ride/confirm', rideData);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      setError('Erro ao confirmar a viagem. Por favor, tente novamente.');
      throw err;
    }
  };

  return { confirmRide, isLoading, error };
};

