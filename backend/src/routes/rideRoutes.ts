import { Router } from 'express';
import AppDataSource from '../config/database';
import { Ride } from '../models/ride';
import { User } from '../models/user';
import { Driver } from '../models/driver';
import { getRoute } from '../services/googleMaps';  // Integração com o Google Maps

const router = Router();

// Função auxiliar para buscar entidades por ID
const getEntityById = async (repository: any, id: number) => {
  try {
    return await repository.findOneOrFail({ where: { id } });
  } catch (error) {
    return null;  // Retorna null caso a entidade não seja encontrada
  }
};

// Endpoint para estimar o valor da viagem
router.post('/ride/estimate', async (req: any, res: any) => {
  const { origin, destination, userId } = req.body;

  // Validações de entrada
  if (!origin || !destination || !userId) {
    return res.status(400).json({ error: 'Origem, destino e id do usuário são obrigatórios.' });
  }

  if (origin === destination) {
    return res.status(400).json({ error: 'Origem e destino não podem ser o mesmo endereço.' });
  }

  try {
    // Verifica se o usuário existe
    const userRepository = AppDataSource.getRepository(User);
    const user = await getEntityById(userRepository, userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Chama o Google Maps para calcular a rota
    const route = await getRoute(origin, destination);
    if (!route || !route.routes || route.routes.length === 0) {
      return res.status(400).json({ error: 'Não foi possível calcular a rota.' });
    }

    // Aqui você pode calcular o valor da viagem com base em distâncias ou outros parâmetros
    const distance = route.routes[0].legs[0].distance.value;  // Distância em metros
    const value = (distance / 1000) * 1;  // Cálculo simples: 1€ por quilômetro

    return res.status(200).json({
      origin,
      destination,
      distance: distance / 1000,  // Distância em km
      value,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao calcular a estimativa da viagem.' });
  }
});

// Endpoint para confirmar a viagem
router.patch('/ride/confirm', async (req: any, res: any) => {
  const { origin, destination, userId, driverId, distance } = req.body;

  // Validações de entrada
  if (!origin || !destination || !userId || !driverId || !distance) {
    return res.status(400).json({ error: 'Origem, destino, id do usuário, id do motorista e quilometragem são obrigatórios.' });
  }

  if (origin === destination) {
    return res.status(400).json({ error: 'Origem e destino não podem ser o mesmo endereço.' });
  }

  try {
    // Verifica se o usuário existe
    const userRepository = AppDataSource.getRepository(User);
    const user = await getEntityById(userRepository, userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o motorista existe e é válido
    const driverRepository = AppDataSource.getRepository(Driver);
    const driver = await getEntityById(driverRepository, driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Motorista não encontrado.' });
    }

    // Verifica se a quilometragem é válida para o motorista
    if (distance > driver.maxKmAllowed) {
      return res.status(400).json({ error: 'A quilometragem informada excede o limite permitido para o motorista.' });
    }

    // Cria e salva a nova viagem
    const rideRepository = AppDataSource.getRepository(Ride);
    const newRide = rideRepository.create({
      origin,
      destination,
      userId,
      driverId,
      distance,
      status: 'confirmed',  // Status da viagem confirmada
    });

    await rideRepository.save(newRide);

    return res.status(200).json({
      message: 'Viagem confirmada com sucesso!',
      ride: newRide,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao confirmar a viagem.' });
  }
});

// Endpoint para listar viagens realizadas por um usuário
router.get('/ride/:customer_id', async (req: any, res: any) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query; // O driver_id vem como um query parameter

  // Validação de ID do usuário
  if (!customer_id) {
    return res.status(400).json({ error: 'O id do usuário é obrigatório.' });
  }

  try {
    // Verifica se o usuário existe
    const userRepository = AppDataSource.getRepository(User);
    const user = await getEntityById(userRepository, Number(customer_id));

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verifica se o motorista existe, se driver_id foi fornecido
    if (driver_id) {
      const driverRepository = AppDataSource.getRepository(Driver);
      const driver = await getEntityById(driverRepository, Number(driver_id));

      if (!driver) {
        return res.status(400).json({ error: 'Motorista não encontrado.' });
      }
    }

    // Define o repositório de viagens
    const rideRepository = AppDataSource.getRepository(Ride);

    // Cria a query para buscar as viagens do usuário
    let query = rideRepository
      .createQueryBuilder('ride')
      .where('ride.userId = :userId', { userId: customer_id })
      .orderBy('ride.createdAt', 'DESC'); // Ordena pela data de criação (mais recente para mais antigo)

    // Se o driver_id for informado, filtra pelas viagens desse motorista
    if (driver_id) {
      query = query.andWhere('ride.driverId = :driverId', { driverId: driver_id });
    }

    // Executa a consulta e retorna as viagens
    const rides = await query.getMany();

    return res.status(200).json({ rides });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao listar as viagens.' });
  }
});

export default router;
