import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  cep: string;
}