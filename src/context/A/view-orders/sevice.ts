import { RequestGetAllOrders, ResponseGetAllOrders } from "./model";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class OrderService {
  static async getAll(
    options?: RequestGetAllOrders
  ): Promise<{ items: ResponseGetAllOrders[]; totalRows: number }> {
    console.log("getAll Orders", options);
    await delay(1500);

    const items: ResponseGetAllOrders[] = [
      {
        id: "ord001",
        code: "ORD001",
        customerName: "Nguyễn Văn A",
        customerPhone: "0912345678",
        totalPrice: 500000,
        discountValue: 50000,
        paymentStatus: 1,
        createdAt: "2024-05-10T10:00:00Z",
      },
      {
        id: "ord002",
        code: "ORD002",
        customerName: "Trần Thị B",
        customerPhone: "0987654321",
        totalPrice: 1200000,
        discountValue: 0,
        paymentStatus: 2,
        createdAt: "2024-05-11T09:30:00Z",
      },
    ];

    return { items, totalRows: items.length };
  }

  static async delete(id: string): Promise<void> {
    console.log("Delete Order:", id);
    await delay(1500);
  }

  // Nếu sau này bạn cần thêm create/update thì có thể bổ sung sau
}
