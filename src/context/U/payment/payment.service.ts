import { Address, Voucher } from "../../../features/U/payment/payment.response";
import * as axios from '../../../services/axios-instance';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class PaymentService {
  static async getAddress(): Promise<Address[]> {
    const res = await axios.GET("shippingaddress/my-addresses");
    return res.data
  }
  static async getVoucher(): Promise<Voucher[]> {
    console.log("getAll Voucher");
    await delay(2000);

    const res: Voucher[] = [
        {
          id: "voucher-1",
          code: "NEWUSER100K",
          description: "Giảm 100.000đ cho đơn hàng từ 500.000đ",
          discountAmount: 100000,
          discountType: "FIXED",
          minOrderValue: 500000,
          isActive: true,
          expiryDate: "2025-12-31",
        },
        {
          id: "voucher-2",
          code: "SALE10",
          description: "Giảm 10% cho đơn hàng từ 1.000.000đ, tối đa 300.000đ",
          discountAmount: 10,
          discountType: "PERCENTAGE",
          minOrderValue: 1000000,
          maxDiscountAmount: 300000,
          isActive: true,
          expiryDate: "2025-06-30",
        },
        {
          id: "voucher-3",
          code: "DELL15",
          description: "Giảm 15% cho sản phẩm Dell, tối đa 500.000đ",
          discountAmount: 15,
          discountType: "PERCENTAGE",
          minOrderValue: 0,
          maxDiscountAmount: 500000,
          shopId: "shop-1",
          isActive: true,
          expiryDate: "2025-05-31",
        },
      ];
    return res;
  }
  static async createAddress(model: any): Promise<void>{
    const res = await axios.POST("shippingaddress", model);
    return res.data
  }
  static async PlaceOrder(model: any): Promise<void>{

    if(model.selectedPaymentMethodId == "VNPay"){
      const res = await axios.GET("payment/createpaymenturl", {
        params: {
          money: model.totalPrice,
          description: "Payment",
          shippingId: model.selectedAddressId
        },
      });
      window.open(res, "_blank");
    }
    
  }
  static async removeProductFromCart(productId: string): Promise<void>{
    const res = await axios.DELETE(`order/remove-from-cart/${productId}`);
    return res.data
  }
  
}
