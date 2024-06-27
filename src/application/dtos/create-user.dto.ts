import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '12345678901', description: 'The CPF of the user' })
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'The phone number of the user' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '1990-01-01', description: 'The birth date of the user' })
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ example: '01001000', description: 'The CEP of the user' })
  @IsString()
  @IsNotEmpty()
  cep: string;
}