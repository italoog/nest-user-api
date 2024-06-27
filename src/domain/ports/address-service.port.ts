export interface AddressInfo {
  localidade: string;
  uf: string;
  ddd: string;
}

export interface AddressService {
  getAddressInfo(cep: string): Promise<AddressInfo | null>;
}