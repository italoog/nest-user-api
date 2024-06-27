import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user-repository.port';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class MongooseUserRepositoryAdapter implements UserRepository {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => this.toEntity(user));
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = await this.userModel.findOne({ cpf }).exec();
    return user ? this.toEntity(user) : null;
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    return this.toEntity(createdUser);
  }

  private toEntity(document: UserDocument): User {
    return new User(
      document._id.toString(),
      document.name,
      document.cpf,
      document.email,
      document.phone,
      document.birthDate,
      document.cep,
      document.city,
      document.state,
      document.ddd
    );
  }
}