export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly cpf: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly birthDate: Date,
    public readonly cep: string,
    public readonly city: string,
    public readonly state: string,
    public readonly ddd: string
  ) {}
}