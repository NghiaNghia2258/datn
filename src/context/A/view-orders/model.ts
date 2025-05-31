export interface RequestGetAllOrders {
    pageIndex: number;
    pageSize: number;
    keyWord?: string;
  }
  export interface ResponseGetAllOrders {
    id: string;
    code: string;
    customerName?: string;
    customerPhone?: string;
    totalPrice: number;
    discountValue?: number;
    paymentStatus: number;
    createdAt: string;
  }
    