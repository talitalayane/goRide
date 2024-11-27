import { Router } from 'express';
import AppDataSource from '../config/database';
import { User } from '../models/user';

const router = Router();

// Listar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Criar um novo usuário
router.post('/users', async (req: any, res: any) => {
  const { name, email, password } = req.body;

  // Validações de entrada
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Verifica se o e-mail já existe
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    // Criação do novo usuário
    const newUser = userRepository.create({ name, email, password });
    const savedUser = await userRepository.save(newUser);

    return res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o usuário.' });
  }
});

export default router;
