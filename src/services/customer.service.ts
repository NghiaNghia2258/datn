import { Customer, CustomerCreate, CustomerUpdate } from "../features/A/view-customer/zod";
import { RequestGetAllCustomers } from "./request/customer.request";
import { CustomerDashboardStats, CustomerDetailStats } from "./response/customer.response";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class CustomerService {
  static async getAll(options?: RequestGetAllCustomers): Promise<Customer[]> {
    console.log("getAll Customers", options);
    await delay(2000);

    const res: Customer[] = [
      {
        id: "cus01",
        name: "Nguyễn Thị A",
        email: "a@gmail.com",
        phone: "0912345678",
        password:"",
        isActive: true,
      },
      {
        id: "cus02",
        name: "Trần Văn B",
        email: "b@gmail.com",
        phone: "0987654321",
        password:"",
        isActive: false,
      },
      {
        id: "cus03",
        name: "Lê Văn C",
        email: "c@gmail.com",
        phone: "0909123456",
        password:"",
        isActive: true,
      },
    ];

    return res;
  }

  static async delete(id: string): Promise<void> {
    console.log("Delete customer: ", id);
    await delay(2000);
  }

  static async create(model: CustomerCreate): Promise<void> {
    console.log("Create customer: ", model);
    await delay(2000);
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
