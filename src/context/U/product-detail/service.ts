import * as axios from '../../../services/axios-instance';

export default class ProductDetailService {
      static async getReviews(id:string): Promise<any> {
        const res = await axios.GET("home/get-review", {
          params: {
            pageSize: 10,
            pageIndex: 1,
            productId: id
          }
        });
        return res;
      }
      static async AddToCart(productId:string, property1: string, property2: string, quantity: number): Promise<boolean>{
        const request = {productId,property1,property2,quantity}
        await axios.POST("customer/add-to-cart", request);
        return true;
      }
      static async customeReview(reviewContent: any): Promise<boolean> {
        await axios.POST("customer/review", reviewContent);
        return true;
      }
}
