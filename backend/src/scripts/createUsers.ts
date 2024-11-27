import AppDataSource from '../config/database';
import { User } from '../models/user';

const createUsers = async () => {
  try {
    // Inicializa a conexão com o banco de dados
    await AppDataSource.initialize();
    console.log('Banco de dados conectado com sucesso.');

    // Criar usuários de teste
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

    // Repositório para usuários
    const userRepository = AppDataSource.getRepository(User);

    // Salvar usuários
    const savedUsers = await userRepository.save(users);
    console.log('Usuários criados com sucesso:', savedUsers);
  } catch (error) {
    console.error('Erro ao criar usuários:', error);
  } finally {
    // Finaliza a conexão com o banco
    await AppDataSource.destroy();
    console.log('Conexão com o banco encerrada.');
  }
};

createUsers();
