import { RequestGetAllOrders, ResponseGetAllOrders } from "./model";
import * as axios from '../../../services/axios-instance';


export default class OrderService {
  static async getAll(
    options?: RequestGetAllOrders
  ): Promise<{ items: ResponseGetAllOrders[]; totalRows: number }> {
    if(!options?.pageSize){
      return {
        items:[],
        totalRows:0
      }
    }
    const response = await axios.GET(`home/get-orders`, {
      params: {
        ...options,
        pageIndex : (options?.pageIndex ?? 0) + 1
      },
    });
    return response;
  }

  static async delete(id: string): Promise<void> {
    console.log("Delete Order:", id);
  }
  static async getById(id: string): Promise<any> {
    const response = await axios.GET(`order/${id}`);
    return response;
  }
}
