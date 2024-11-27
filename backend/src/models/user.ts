import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')  // Nome da tabela no banco
export class User {
  @PrimaryGeneratedColumn()
  id!: number;  // Identificador único para o usuário

  @Column()
  name!: string;  // Nome do usuário

  @Column({ unique: true })
  email!: string;  // E-mail do usuário (único)

  @Column()
  password!: string;  // Senha do usuário (em texto puro, apenas para estudo)

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;  // Data de criação do registro

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;  // Data de atualização do registro
}
