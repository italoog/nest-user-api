import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserUseCase } from '../../domain/use-cases/user.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  async findAll() {
    return this.userUseCase.findAll();
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string) {
    try {
      return await this.userUseCase.findByCpf(cpf);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userUseCase.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}