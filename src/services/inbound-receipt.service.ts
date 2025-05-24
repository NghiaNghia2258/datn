import { IInboundReceiptCreateSchema, IInboundReceiptUpdateSchema } from "../features/A/create-update-inbound-receipt/zod";
import { RequestGetAllInboundReceipts } from "./request/inbound-receipt.request";
import { ResponseGetAllInboundReceipts } from "./response/inbound-receipt.response";
import * as axios from './axios-instance';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class InboundReceiptService {
  static async getAll(
    options?: RequestGetAllInboundReceipts
  ): Promise<ResponseGetAllInboundReceipts[]> {
    const response = await axios.GET(`inboundreceipts`, {
      params: {
        ...options,
        pageIndex : (options?.pageIndex ?? 0) + 1
      },
    });
    return response;
  }

  static async create(model: IInboundReceiptCreateSchema): Promise<void> {
    const response = await axios.POST(`inboundreceipts`, model);
    return response.data;
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
      stockInDate: "2024-04-01",
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