import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../ports/user-repository.port';
import { AddressService } from '../ports/address-service.port';
import { USER_REPOSITORY, ADDRESS_SERVICE } from '../tokens';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ADDRESS_SERVICE)
    private readonly addressService: AddressService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.userRepository.findByCpf(cpf);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async create(userData: Omit<User, 'id' | 'city' | 'state' | 'ddd'>): Promise<User> {
    const addressInfo = await this.addressService.getAddressInfo(userData.cep);
    if (!addressInfo) {
      throw new Error('Invalid CEP');
    }

    const newUser = new User(
      Date.now().toString(), // Simplificado para este exemplo. Considere usar um UUID na prática.
      userData.name,
      userData.cpf,
      userData.email,
      userData.phone,
      userData.birthDate,
      userData.cep,
      addressInfo.localidade,
      addressInfo.uf,
      addressInfo.ddd
    );

    return this.userRepository.create(newUser);
  }
}