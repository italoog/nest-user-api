import { Test, TestingModule } from '@nestjs/testing';
import { UserUseCase } from './user.use-case';
import { UserRepository } from '../ports/user-repository.port';
import { AddressService } from '../ports/address-service.port';
import { User } from '../entities/user.entity';
import { USER_REPOSITORY, ADDRESS_SERVICE } from '../tokens';

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let addressServiceMock: jest.Mocked<AddressService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findAll: jest.fn(),
            findByCpf: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: ADDRESS_SERVICE,
          useValue: {
            getAddressInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    userUseCase = module.get<UserUseCase>(UserUseCase);
    userRepositoryMock = module.get(USER_REPOSITORY);
    addressServiceMock = module.get(ADDRESS_SERVICE);
  });

  it('should be defined', () => {
    expect(userUseCase).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        new User('1', 'John Doe', '12345678901', 'john@example.com', '1234567890', new Date(), '01001000', 'São Paulo', 'SP', '11'),
      ];
      userRepositoryMock.findAll.mockResolvedValue(result);

      expect(await userUseCase.findAll()).toBe(result);
    });
  });

  describe('findByCpf', () => {
    it('should return a user when CPF exists', async () => {
      const user = new User('1', 'John Doe', '12345678901', 'john@example.com', '1234567890', new Date(), '01001000', 'São Paulo', 'SP', '11');
      userRepositoryMock.findByCpf.mockResolvedValue(user);

      expect(await userUseCase.findByCpf('12345678901')).toBe(user);
    });

    it('should throw an error when CPF does not exist', async () => {
      userRepositoryMock.findByCpf.mockResolvedValue(null);

      await expect(userUseCase.findByCpf('12345678901')).rejects.toThrow('User not found');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com',
        phone: '1234567890',
        birthDate: new Date(),
        cep: '01001000',
      };

      addressServiceMock.getAddressInfo.mockResolvedValue({
        localidade: 'São Paulo',
        uf: 'SP',
        ddd: '11',
      });

      const createdUser = new User('1', 'John Doe', '12345678901', 'john@example.com', '1234567890', new Date(), '01001000', 'São Paulo', 'SP', '11');
      userRepositoryMock.create.mockResolvedValue(createdUser);

      expect(await userUseCase.create(userData)).toBe(createdUser);
    });

    it('should throw an error when CEP is invalid', async () => {
      const userData = {
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com',
        phone: '1234567890',
        birthDate: new Date(),
        cep: '00000000',
      };

      addressServiceMock.getAddressInfo.mockResolvedValue(null);

      await expect(userUseCase.create(userData)).rejects.toThrow('Invalid CEP');
    });
  });
});