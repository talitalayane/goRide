import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ride } from './ride';

@Entity('drivers')  // Nome da tabela no banco
export class Driver {
  @PrimaryGeneratedColumn()
  id!: number;  // Inicialização garantida pelo TypeORM

  @Column()
  name!: string;  // Nome do motorista

  @Column()
  description!: string;  // Descrição ou detalhes sobre o motorista

  @Column()
  vehicle!: string;  // Veículo associado ao motorista

  @Column('float', { default: 0 }) // Valor padrão: 0
  rating!: number;  // Avaliação média do motorista

  @Column('float', { default: 1.5 }) // Valor padrão: 1.5
  ratePerKm!: number;  // Tarifa por quilômetro

  // Relacionamento com a tabela Ride (se necessário)
  @OneToMany(() => Ride, (ride) => ride.driver)
  rides!: Ride[];  // Viagens associadas ao motorista
}
