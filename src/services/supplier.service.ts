import * as axios from './axios-instance';

export default class SupplierService {
  static async getAll(): Promise<any> {
    const response = await axios.GET(`supplier`);
      return response.data;
  }
  static async create(name:string): Promise<any> {
    const response = await axios.POST(`supplier`, {name:name});
      return response.data;
  }
}
