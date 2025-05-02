import { ApiResult } from "../../../services";
import { Review } from "./response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class ProductDetailService {
      static async getReviews(id:string): Promise<ApiResult<Review[]>> {
        console.log("getAll Reviews", id);
        await delay(1500);
        
        const res: ApiResult<Review[]> = {
            isSucceeded: true,
            message: "",
            statusCode: 200,
            totalRecordsCount: 20,
            data:[
                {
                  id: 1,
                  user: "Nguyễn Văn A",
                  rating: 5,
                  comment: "Chất lượng sản phẩm tuyệt vời, đúng như mô tả.",
                  date: "10/04/2025",
                },
                {
                  id: 2,
                  user: "Trần Thị B",
                  rating: 4,
                  comment: "Áo đẹp, vải thoáng mát nhưng hơi rộng so với size.",
                  date: "05/04/2025",
                },
                {
                  id: 3,
                  user: "Lê Văn C",
                  rating: 5,
                  comment: "Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop lần sau.",
                  date: "01/04/2025",
                },
              ]
        };
        return res;
      }
      static async AddToCart(productId:string, property1: string, property2: string, quantity: number): Promise<boolean>{
        const request = {productId,property1,property2,quantity}
        console.log("Add to cart",request);
        await delay(1500);
        return true;
      }
      static async customeReview(reviewContent: any): Promise<boolean> {
        await delay(1500);
        console.log("Review: ", reviewContent);
        return true;
      }
}
