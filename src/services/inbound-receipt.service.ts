import { IInboundReceiptCreateSchema, IInboundReceiptUpdateSchema } from "../features/A/create-update-inbound-receipt/zod";
import { RequestGetAllInboundReceipts } from "./request/inbound-receipt.request";
import { ResponseGetAllInboundReceipts } from "./response/inbound-receipt.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class InboundReceiptService {
  static async getAll(
    options?: RequestGetAllInboundReceipts
  ): Promise<ResponseGetAllInboundReceipts[]> {
    console.log("getAll Inbound Receipts with options:", options);
    await delay(2000);

    const mockData: ResponseGetAllInboundReceipts[] = [
      {
        receiptId: "PR001",
        createdAt: "2024-04-01T10:00:00.000Z",
        createdBy: "admin",
        supplierName: "Công ty A",
        totalQuantity: 100,
        totalValue: 2000000,
      },
      {
        receiptId: "PR002",
        createdAt: "2024-04-02T15:30:00.000Z",
        createdBy: "admin",
        supplierName: "Công ty B",
        totalQuantity: 50,
        totalValue: 750000,
      },
    ];

    return mockData;
  }

  static async create(model: IInboundReceiptCreateSchema): Promise<void> {
    console.log("Create Inbound Receipt:", model);
    await delay(2000);
  }

  static async update(model: IInboundReceiptUpdateSchema): Promise<void> {
    console.log("Update Inbound Receipt:", model);
    await delay(2000);
  }

  static async delete(id: string): Promise<void> {
    console.log("Delete Inbound Receipt:", id);
    await delay(2000);
  }
  static async getOne(receiptId: string): Promise<IInboundReceiptCreateSchema> {
    console.log("Get One Inbound Receipt with id:", receiptId);
    await delay(1000);

    return {
      createdAt: "2024-04-01",
      createdBy: "admin",
      supplierId: "1",
      note: "Chi tiết phiếu nhập kho",
      items: [
        {
          id: "SP001",
          name: "Áo thun",
          image: "https://example.com/images/ao-thun.jpg",
          quantity: 50,
          unitPrice: 150000,
        },
        {
          id: "SP002",
          name: "Quần jean",
          image: "https://example.com/images/quan-jean.jpg",
          quantity: 20,
          unitPrice: 300000,
        },
      ],
    };
  }
}