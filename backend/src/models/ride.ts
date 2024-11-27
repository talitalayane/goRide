import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';
import { Driver } from './driver';

@Entity('rides')  // Nome da tabela no banco
export class Ride {
  @PrimaryGeneratedColumn()
  id!: number;  // Identificador único da viagem

  @Column()
  origin!: string;  // Origem da viagem

  @Column()
  destination!: string;  // Destino da viagem

  @Column('float', { default: 0 })
  distance!: number;  // Distância total da viagem em quilômetros

  @Column('float', { default: 0 })
  value!: number;  // Valor total da viagem

  @Column({ default: '0 min' })
  duration!: string;  // Duração da viagem (ex.: "15 min")

  @Column({ default: 'pending' })
  status!: string;  // Status da viagem (ex.: "pending", "confirmed", "completed")

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;  // Data e hora de criação da viagem

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;  // Data e hora de atualização da viagem

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })  // Relaciona Ride com User
  customer!: User;

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driver_id' })  // Relaciona Ride com Driver
  driver!: Driver;
}
