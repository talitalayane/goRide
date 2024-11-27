import dotenv from 'dotenv';

dotenv.config();

// Verifica se a chave do Google Maps foi definida
if (!process.env.GOOGLE_MAPS_API_KEY) {
  throw new Error('A variável GOOGLE_MAPS_API_KEY não foi definida no arquivo .env');
}

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
