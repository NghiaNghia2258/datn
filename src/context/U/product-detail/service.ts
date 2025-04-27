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
}
