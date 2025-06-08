import * as axios from './axios-instance';

export default class VoucherService{
   static async create(model: any): Promise<void> {
    const res = await axios.POST("voucher", model);
    return res.data;
   }
   static async validateVoucher (
    voucherCode: string
  ): Promise<any> {
        const mockVoucher = await axios.GET(`voucher/get-by-code/${voucherCode}`);
        return mockVoucher.data;
  }
  static async delete (
    id: string
  ): Promise<any> {
        const mockVoucher = await axios.GET(`voucher/get-by-code/${id}`);
        return mockVoucher.data;
  }
  static async removeVoucher (
    voucherCode: string
  ): Promise<any> {
        const mockVoucher = await axios.GET(`voucher/remove-voucher/${voucherCode}`);
        return mockVoucher.data;
  }
  static async useVoucher (
    voucherCode: string,
    discountAmount: any
  ): Promise<any> {
        const mockVoucher = await axios.GET(`voucher/use-voucher`,
          {
            params: {
              code:voucherCode,
              discountAmount
            }
          });
        return mockVoucher;
  }
  static async getAll(options?:any): Promise<any[]>{
    if(!options?.pageSize){
      return []
    }
    const response = await axios.GET(`voucher`, {
      params: {
        ...options,
        pageIndex : (options?.pageIndex ?? 0) + 1
      },
    });
      return response;
}
}