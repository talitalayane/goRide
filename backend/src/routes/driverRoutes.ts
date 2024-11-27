import { Router } from 'express';
import AppDataSource from '../config/database';
import { Driver } from '../models/driver';

const router = Router();

// Listar todos os motoristas
router.get('/drivers', async (req, res) => {
  const driverRepository = AppDataSource.getRepository(Driver);
  const drivers = await driverRepository.find();
  res.json(drivers);
});

// Criar um novo motorista
router.post('/drivers', async (req: any, res: any) => {
  const { name, description, vehicle, rating, ratePerKm } = req.body;
  
// Verificando se todos os campos necessários foram fornecidos
  if (!name || !description || !vehicle || !rating || !ratePerKm) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  const driverRepository = AppDataSource.getRepository(Driver);
  try {
    const newDriver = driverRepository.create({
      name,
      description,
      vehicle,
      rating,
      ratePerKm,
    });

    const savedDriver = await driverRepository.save(newDriver);
    res.status(201).json(savedDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o motorista.' });
  }
});


export default router;
