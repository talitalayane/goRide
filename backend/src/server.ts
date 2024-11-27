import express from 'express';
import driverRoutes from './routes/driverRoutes';
import userRoutes from './routes/userRoutes';
import rideRoutes from './routes/rideRoutes';

import AppDataSource from './config/database';

const app = express();
app.use(express.json()); // Middleware para trabalhar com JSON

// Inicializar conexão com o banco
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco:', error);
  });

// Configurar rotas
app.use(driverRoutes);
app.use(userRoutes);
app.use(rideRoutes);

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});
