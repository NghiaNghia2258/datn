export interface RequestGetAllInboundReceipts {
    searchKeyword?: string;
    supplierId?: string;
    fromDate?: string; // ISO string
    toDate?: string;
    pageIndex?: number;
    pageSize?: number;
  }