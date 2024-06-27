import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AddressService, AddressInfo } from '../../domain/ports/address-service.port';

@Injectable()
export class ViaCepServiceAdapter implements AddressService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  async getAddressInfo(cep: string): Promise<AddressInfo | null> {
    try {
      const baseUrl = this.configService.get<string>('VIACEP_BASE_URL');
      const response = await firstValueFrom(this.httpService.get(`${baseUrl}${cep}/json/`));
      return {
        localidade: response.data.localidade,
        uf: response.data.uf,
        ddd: response.data.ddd,
      };
    } catch (error) {
      return null;
    }
  }
}