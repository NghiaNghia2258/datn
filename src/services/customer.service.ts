import { Customer, CustomerCreate, CustomerUpdate } from "../features/A/view-customer/zod";
import { RequestGetAllCustomers } from "./request/customer.request";
import { CustomerDashboardStats, CustomerDetailStats } from "./response/customer.response";
import * as axios from './axios-instance';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class CustomerService {
  static async getAll(options?: RequestGetAllCustomers): Promise<Customer[]> {
    if(!options?.pageSize){
      return []
    }
    const response = await axios.GET(`customer`, {
      params: {
        ...options,
        pageIndex : (options?.pageIndex ?? 0) + 1
      },
    });
      return response;
  }

  static async delete(id: string): Promise<void> {
    console.log("Delete customer: ", id);
    await delay(2000);
  }

  static async create(model: CustomerCreate): Promise<void> {
    console.log("Create customer: ", model);
    await delay(2000);
  }

  static async addWishList(productId: string, isAdd: boolean): Promise<void> {
    const response = await axios.GET(`customer/addOrRemoveWishList`, {
      productId,
      isAdd
    });
      return response.data;
  }

  static async update(model: CustomerUpdate): Promise<void> {
    console.log("Update customer: ", model);
    await delay(2000);
  }
  // ✅ API: Thống kê toàn bộ khách hàng (trang danh sách)
  static async getDashboardStats(): Promise<CustomerDashboardStats> {
    console.log("getDashboardStats");
    await delay(1000);

    return {
      totalCustomers: 1234,
      activeCustomers: 1100,
      inactiveCustomers: 134,
      newCustomersThisMonth: 45,
      topSpender: {
        id: "cus-vip-01",
        name: "Nguyễn Văn VIP",
        totalSpent: 158_000_000,
      },
    };
  }

  // ✅ API: Thống kê chi tiết cho một khách hàng cụ thể
  static async getCustomerStatsById(id: string): Promise<CustomerDetailStats> {
    console.log("getCustomerStatsById", id);
    await delay(1000);

    return {
      totalOrders: 18,
      totalSpent: 7260000,
      cancelRate: 0.1667, // 16.67%
      lastOrderDate: "2025-03-29T15:30:00Z",
      topProduct: {
        name: "Áo Polo Nam Basic",
        timesPurchased: 5,
      },
      joinedAt: "2024-07-12T09:00:00Z",
      isVerified: true,
      totalReviews: 6,
      reportCount: 1,
    };
  }
}
