import { ApiResult } from "../../../services";
import { OptionFilter } from "./store-product.request";
import { Brand, Product, Store } from "./store-product.response";
import * as axios from '../../../services/axios-instance';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class StoreProductService {
  static async getBrands(): Promise<Brand[]> {
    console.log("getAll Brands");
    await delay(2000);

    const res: Brand[] = [
    {
        id: "1",
        name: "Brand 1"
    },
    {
        id: "2",
        name: "Brand 2"
    },
    {
        id: "3",
        name: "Brand 3"
    }
];

    return res;
  }
  static async getStoreInfo(storeId: string): Promise<Store> {
    const response = await axios.GET(`store/store-info-customer/${storeId}`);
    return response.data;
  }
  static async getStoreInfoByProduct(productId: string): Promise<Store> {
    const response = await axios.GET(`store/store-info-product/${productId}`);
    return response.data;
  }

  static async GetProduct(option:OptionFilter): Promise<ApiResult<Product[]>> {
    const response = await axios.GET(`home/get-product-for-store`, {
      params: option,
    });
    return response;
  }
}
