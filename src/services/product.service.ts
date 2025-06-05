import { IProductCreateSchema } from "../features/A/create-product/zod";
import { InboundProduct } from "../features/A/create-update-inbound-receipt/zod";
import {  RequestGetALlProducts } from "./request/product.request";
import { ProductInventoryInfo, ProductStatus, ResponseGetAllProducts, ResponseStatisticsOneProduct } from "./response/product.response";
import * as axios from './axios-instance';
import UploadService from "./upload.service";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
     
export default class ProductService{

    static async getAll(options?:RequestGetALlProducts): Promise<ResponseGetAllProducts[]>{
        const response = await axios.GET(`product`, {
          params: {
            ...options,
            pageIndex : (options?.pageIndex ?? 0) + 1
          },
        });
          return response;
    }
    static async delete(id:string): Promise<void> {
      const response = await axios.DELETE(`product/${id}`);
      return response.data;
    }   
    static async create(model:IProductCreateSchema): Promise<void> {
      const urls =  model.fileUpload.map(async (file:any) => {
        const url = await UploadService.upload(file);
        return url;
      });
      model.existingUrls = await Promise.all(urls);
      const variants =  model.productVariants.map(async (variant) => {
        const url = await UploadService.upload(variant.image);
        return {
          ...variant,
          image: url
        }
      })
      model.productVariants = await Promise.all(variants);
      const res = await axios.POST("product", model);
      return res.isSucceeded;
    }
    
    static async update(model:IProductCreateSchema): Promise<void> {
      const urls =  await Promise.all(model.fileUpload.map(async (file:any) => {
        const url = await UploadService.upload(file);
        return url;
      }));
      model.existingUrls = [...model.existingUrls,...urls];
      const variants =  model.productVariants.map(async (variant) => {
        const url = await UploadService.upload(variant.image);
        return {
          ...variant,
          image: url
        }
      })
      model.productVariants = await Promise.all(variants);
      const res = await axios.PUT("product", model);
      return res.isSucceeded;
    }
    static async GetOne(id:string): Promise<IProductCreateSchema>{
      const response = await axios.GET(`product/${id}`);
      return response.data;
    }
    static async GetProductStatistics(id: string): Promise<ResponseStatisticsOneProduct> {
      const response = await axios.GET(`product/get-statistics/${id}`);
      const data = response.data;

      const totalScore =
        1 * data.ratingOneStar +
        2 * data.ratingTwoStar +
        3 * data.ratingThreeStar +
        4 * data.ratingFourStar +
        5 * data.ratingFiveStar;
    
      const averageRate = data.rateCount > 0 ? totalScore / data.rateCount : 0;
    
      return {
        ...data,
        rate: averageRate
      };
    }
    static async GetProductInventoryInfo(id: string): Promise<ProductInventoryInfo> {
      console.log("Get product inventory info for id: ", id);
    
      return {
        id: id,
        name: "Sản phẩm mẫu",
        status: ProductStatus.ACTIVE,
        stockQuantity: 120,
        pendingOrderQuantity: 15
      };
    }
    static async  getInboundSelectableProducts (options?:RequestGetALlProducts): Promise<InboundProduct[]> {
      const response = await axios.GET(`product/getInboundSelectableProducts`, {
        params: {
          ...options,
          pageIndex : (options?.pageIndex ?? 0) + 1
        },
      });
        return response;
    };
    static async createBrand(brandName: string){
      await delay(1000);
      console.log(brandName);
    }
    static async createCategory(CategoryName: string){
      const res = await axios.POST("productCategory", {name:CategoryName});
        return res.data;
    }
    static async getAllCategory(){
      const response = await axios.GET(`productCategory`, {
        params: {
          pageSize: 50,
          pageIndex : 1
        },
      });
        return response.data;
    }
}