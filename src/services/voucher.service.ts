import { Voucher } from '../features/U/payment/payment.response';
import * as axios from './axios-instance';

export default class VoucherService{
   static async create(model: any): Promise<void> {
    const res = await axios.POST("voucher", model);
    return res.data;
   }
   static async validateVoucher (
    voucherCode: string
  ): Promise<any> {
        const mockVoucher: Voucher = await axios.GET(`voucher/get-by-code/${voucherCode}`);
        return mockVoucher.data;
  }
}