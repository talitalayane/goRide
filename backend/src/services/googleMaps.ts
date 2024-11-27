import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Função para obter a rota entre a origem e o destino
export const getRoute = async (origin: string, destination: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin: origin,
          destination: destination,
          key: GOOGLE_MAPS_API_KEY
        }
      });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar a rota:', error);
    throw new Error('Erro ao calcular a rota.');
  }
};

// Função para geocodificar o endereço (obter latitude/longitude)
export const geocodeAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: address,
          key: GOOGLE_MAPS_API_KEY
        }
      });

    return response.data;
  } catch (error) {
    console.error('Erro ao geocodificar o endereço:', error);
    throw new Error('Erro ao geocodificar o endereço.');
  }
};
