import { ApiResult } from "../../../services";
import { UserOrder, UserProfile, UserWishlistItem } from "./response";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default class UserProfileService {
    static async getUserProfile(): Promise<UserProfile> {
      console.log("Get User Profile:");
      await delay(1500);
  
      const res: ApiResult<UserProfile> = {
        isSucceeded: true,
        message: "",
        statusCode: 200,
        totalRecordsCount: 1,
        data: {
          id: "1234567",
          name: "Nguyễn Văn A",
          email: "nguyenvana@example.com",
          phone: "0987654321",
          address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
          birthday: "15/05/1990",
          avatar: "https://source.unsplash.com/random/?portrait",
          memberSince: "20/04/2020",
          rank: "Gold",
          points: 1450,
        },
      };
      if(!res.data) {throw Error;}
      return res.data;
    }
    static async getUserOrders(pageIndex: number, pageSize: number): Promise<ApiResult<UserOrder[]>> {
        await delay(1000);
        console.log("get order user");

        const allOrders: UserOrder[] = [
          {
            id: "ORD-001",
            date: "05/04/2025",
            total: "2,500,000đ",
            status: "Đã giao hàng",
          },
          {
            id: "ORD-002",
            date: "20/03/2025",
            total: "1,800,000đ",
            status: "Đã giao hàng",
          },
          {
            id: "ORD-003",
            date: "10/03/2025",
            total: "3,200,000đ",
            status: "Đã giao hàng",
          },
        ];
      
        const start = (pageIndex - 1) * pageSize;
        const end = start + pageSize;
        const pagedOrders = allOrders.slice(start, end);
      
        const res: ApiResult<UserOrder[]> = {
          isSucceeded: true,
          message: "",
          statusCode: 200,
          totalRecordsCount: allOrders.length,
          data: pagedOrders,
        };
      
        return res;
    }
    static async getUserWishlist(pageIndex: number, pageSize: number): Promise<ApiResult<UserWishlistItem[]>> {
    await delay(1000);
    console.log("get UserWishlistItem");
    
    const allWishlist: UserWishlistItem[] = [
        {
        id: "P001",
        name: "iPhone 15 Pro",
        price: "28,990,000đ",
        image: "https://source.unsplash.com/random/?iphone",
        },
        {
        id: "P002",
        name: "MacBook Air M3",
        price: "32,490,000đ",
        image: "https://source.unsplash.com/random/?macbook",
        },
        {
        id: "P003",
        name: "AirPods Pro 2",
        price: "6,490,000đ",
        image: "https://source.unsplash.com/random/?airpods",
        },
    ];
    
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    const pagedWishlist = allWishlist.slice(start, end);
    
    const res: ApiResult<UserWishlistItem[]> = {
        isSucceeded: true,
        message: "",
        statusCode: 200,
        totalRecordsCount: allWishlist.length,
        data: pagedWishlist,
    };
    
    return res;
    }
    static async Update(model: UserProfile): Promise<boolean>{
        await delay(2000);
        console.log("Update profile", model);
        return true;
    }
}