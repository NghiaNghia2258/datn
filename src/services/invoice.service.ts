import { ApiResult } from ".";
import { RequestGetAllInvoices } from "./request/invoice.request";
import { ResponseGetAllInvoices } from "./response/invoice.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class InvoiceService {
  static async getAll(options?: RequestGetAllInvoices): Promise<ApiResult<ResponseGetAllInvoices[]>> {
    console.log("getAll invoices", options);
    await delay(1000);

    const data: ResponseGetAllInvoices[] = [
      {
        id: "inv001",
        invoiceNumber: "HD001",
        customerName: "Công ty ABC",
        amount: 5000000,
        date: "2025-05-01",
        status: "Đã thanh toán",
      },
      {
        id: "inv002",
        invoiceNumber: "HD002",
        customerName: "Nguyễn Văn B",
        amount: 3500000,
        date: "2025-04-29",
        status: "Chưa thanh toán",
      },
      {
        id: "inv003",
        invoiceNumber: "HD003",
        customerName: "Công ty XYZ",
        amount: 7500000,
        date: "2025-04-25",
        status: "Đã hủy",
      },
    ];

    return {
        statusCode: 200,
        message: "",
        data: data,
        isSucceeded: true,
        totalRecordsCount: 12
    };
  }
}
