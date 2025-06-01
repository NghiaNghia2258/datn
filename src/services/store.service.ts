export interface RequestGetAllStores {
    pageIndex: number;
    pageSize: number;
    keyWord?: string;
  }
  export interface ResponseGetAllStores {
    id: string;
    name: string;
    contactPhone: string;
    contactEmail: string;
    joinDate: string;
    verified: boolean;
  }
  import * as axios from './axios-instance';


export default class StoreService {
  static async getAll(options?: RequestGetAllStores): Promise<ResponseGetAllStores[]> {
    const response = await axios.GET(`store/get-all`, {
        params: {
          ...options,
          pageIndex : (options?.pageIndex ?? 0) + 1
        },
      });
      return response;
  }
  static async Active(id: string): Promise<ResponseGetAllStores[]> {
    const response = await axios.GET(`store/active-store/${id}`);
        return response;
  }

  static async delete(id: string): Promise<void> {
    console.log("Delete store:", id);
  }
}
