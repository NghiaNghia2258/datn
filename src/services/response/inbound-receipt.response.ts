export interface ResponseGetAllInboundReceipts {
    receiptId: string;
    createdAt: string;
    createdBy: string;
    supplierName?: string;
    totalQuantity: number;
    totalValue: number;
  }
  