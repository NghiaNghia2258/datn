import * as axios from './axios-instance';

export default class VoucherService{
   static async create(model: any): Promise<void> {
    const res = await axios.POST("voucher", model);
    return res.data;
   }
}