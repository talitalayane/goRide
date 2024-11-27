import { DataSource } from 'typeorm';
import { Driver } from '../models/driver';
import { User } from '../models/user';
import { Ride } from '../models/ride';

const AppDataSource = new DataSource({
  type: 'sqlite',             // Tipo do banco de dados
  database: './database.sqlite', // Arquivo do banco SQLite
  synchronize: false,          // Criação automática das tabelas
  logging: true,              // Habilita logs de SQL
  entities: [Driver, User, Ride], // Caminho para os modelos
});

AppDataSource.initialize()
  .then(() => console.log('Banco de dados conectado com sucesso!'))
  .catch((error) => console.error('Erro ao conectar ao banco de dados:', error));
  
export default AppDataSource;

