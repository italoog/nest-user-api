import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AddressService, AddressInfo } from '../../domain/ports/address-service.port';

@Injectable()
export class ViaCepServiceAdapter implements AddressService {
  constructor(private httpService: HttpService) {}

  async getAddressInfo(cep: string): Promise<AddressInfo | null> {
    try {
      const response = await firstValueFrom(this.httpService.get(`https://viacep.com.br/ws/${cep}/json/`));
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