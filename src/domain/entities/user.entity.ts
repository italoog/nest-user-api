import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ example: '1', description: 'The ID of the user' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({ example: '12345678901', description: 'The CPF of the user' })
  cpf: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: '1234567890', description: 'The phone number of the user' })
  phone: string;

  @ApiProperty({ example: '1990-01-01', description: 'The birth date of the user' })
  birthDate: Date;

  @ApiProperty({ example: '01001000', description: 'The CEP of the user' })
  cep: string;

  @ApiProperty({ example: 'São Paulo', description: 'The city of the user' })
  city: string;

  @ApiProperty({ example: 'SP', description: 'The state of the user' })
  state: string;

  @ApiProperty({ example: '11', description: 'The DDD of the user' })
  ddd: string;

  constructor(
    id: string,
    name: string,
    cpf: string,
    email: string,
    phone: string,
    birthDate: Date,
    cep: string,
    city: string,
    state: string,
    ddd: string
  ) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.phone = phone;
    this.birthDate = birthDate;
    this.cep = cep;
    this.city = city;
    this.state = state;
    this.ddd = ddd;
  }
}