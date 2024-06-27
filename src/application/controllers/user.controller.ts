import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserUseCase } from '../../domain/use-cases/user.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { User } from '../../domain/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  async findAll() {
    return this.userUseCase.findAll();
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'Get a user by CPF' })
  @ApiParam({ name: 'cpf', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findByCpf(@Param('cpf') cpf: string) {
    try {
      return await this.userUseCase.findByCpf(cpf);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userUseCase.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}