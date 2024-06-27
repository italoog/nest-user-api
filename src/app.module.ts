import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './application/controllers/user.controller';
import { UserUseCase } from './domain/use-cases/user.use-case';
import { MongooseUserRepositoryAdapter } from './infrastructure/adapters/mongoose-user-repository.adapter';
import { ViaCepServiceAdapter } from './infrastructure/adapters/via-cep-service.adapter';
import { UserSchema } from './infrastructure/schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: UserUseCase,
      useFactory: (userRepo, addressService) => new UserUseCase(userRepo, addressService),
      inject: ['UserRepository', 'AddressService'],
    },
    {
      provide: 'UserRepository',
      useClass: MongooseUserRepositoryAdapter,
    },
    {
      provide: 'AddressService',
      useClass: ViaCepServiceAdapter,
    },
  ],
})
export class AppModule {}