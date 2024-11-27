import AppDataSource from '../config/database';
import { Driver } from '../models/driver';
import { User } from '../models/user';
import { Ride } from '../models/ride';

const resetAndSeed = async () => {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Banco de dados conectado com sucesso.');

    // Sincroniza as tabelas (cria ou atualiza com base nos modelos)
    await AppDataSource.synchronize();
    console.log('Banco de dados sincronizado.');

    // Repositórios
    const driverRepository = AppDataSource.getRepository(Driver);
    const userRepository = AppDataSource.getRepository(User);
    const rideRepository = AppDataSource.getRepository(Ride);

    // Criar motoristas
    const drivers = [
        {
            name: 'Homer Simpson',
            description: 'Motorista camarada, mas adora donuts.',
            vehicle: 'Plymouth Valiant 1973',
            rating: 2.0,
            ratePerKm: 2.5,
          },
          {
            name: 'Dominic Toretto',
            description: 'Rápido e confiável.',
            vehicle: 'Dodge Charger R/T 1970',
            rating: 4.0,
            ratePerKm: 5.0,
          },
          {
            name: 'James Bond',
            description: 'Classe e estilo.',
            vehicle: 'Aston Martin DB5',
            rating: 5.0,
            ratePerKm: 10.0,
          },
    ];
    const savedDrivers = await driverRepository.save(drivers);
    console.log('Motoristas criados com sucesso:', savedDrivers);

    // Criar usuários
    const users = [
      {
        name: 'Ana Costa',
        email: 'ana@example.com',
        password: 'senha123',
      },
      {
        name: 'Pedro Lima',
        email: 'pedro@example.com',
        password: 'senha123',
      },
      {
        name: 'Juliana Souza',
        email: 'juliana@example.com',
        password: 'senha123',
      },
    ];
    const savedUsers = await userRepository.save(users);
    console.log('Usuários criados com sucesso:', savedUsers);

    // Criar viagens
    const rides = [
      {
        origin: 'Rua A, 123',
        destination: 'Rua B, 456',
        distance: 10,
        value: 12.0,
        duration: '15 min',
        status: 'confirmed',
        customer: savedUsers[0], // Relaciona com Ana Costa
        driver: savedDrivers[0], // Relaciona com João Silva
      },
      {
        origin: 'Avenida X, 789',
        destination: 'Avenida Y, 101',
        distance: 20,
        value: 25.0,
        duration: '25 min',
        status: 'completed',
        customer: savedUsers[1], // Relaciona com Pedro Lima
        driver: savedDrivers[1], // Relaciona com Maria Oliveira
      },
    ];
    const savedRides = await rideRepository.save(rides);
    console.log('Viagens criadas com sucesso:', savedRides);

    console.log('Banco de dados resetado e populado com sucesso!');
  } catch (error) {
    console.error('Erro ao resetar e popular o banco de dados:', error);
  } finally {
    // Finaliza a conexão com o banco
    await AppDataSource.destroy();
    console.log('Conexão com o banco encerrada.');
  }
};

resetAndSeed();
