import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findByCpf(cpf: string): Promise<User | null>;
  create(user: User): Promise<User>;
}