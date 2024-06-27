import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserUseCase } from '../../domain/use-cases/user.use-case';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userUseCaseMock: jest.Mocked<UserUseCase>;

  beforeEach(async () => {
    const mockUserUseCase = {
      findAll: jest.fn(),
      findByCpf: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UserUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserUseCase, useValue: mockUserUseCase },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userUseCaseMock = module.get(UserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        new User('1', 'John Doe', '12345678901', 'john@example.com', '1234567890', new Date(), '01001000', 'São Paulo', 'SP', '11'),
      ];
      userUseCaseMock.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findByCpf', () => {
    it('should return a user when CPF exists', async () => {
      const user = new User('1', 'John Doe', '12345678901', 'john@example.com', '1234567890', new Date(), '01001000', 'São Paulo', 'SP', '11');
      userUseCaseMock.findByCpf.mockResolvedValue(user);

      expect(await controller.findByCpf('12345678901')).toBe(user);
    });

    it('should throw NotFoundException when CPF does not exist', async () => {
      userUseCaseMock.findByCpf.mockRejectedValue(new Error('User not found'));

      await expect(controller.findByCpf('12345678901')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com',
        phone: '1234567890',
        birthDate: new Date(),
        cep: '01001000',
      };

      const createdUser = new User('1', 'John Doe', '12345678901', 'john@example.com', '1234567890', new Date(), '01001000', 'São Paulo', 'SP', '11');
      userUseCaseMock.create.mockResolvedValue(createdUser);

      expect(await controller.create(createUserDto)).toBe(createdUser);
    });

    it('should throw BadRequestException when CEP is invalid', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john@example.com',
        phone: '1234567890',
        birthDate: new Date(),
        cep: '00000000',
      };

      userUseCaseMock.create.mockRejectedValue(new Error('Invalid CEP'));

      await expect(controller.create(createUserDto)).rejects.toThrow(BadRequestException);
    });
  });
});