import { Address, Voucher } from "../../../features/U/payment/payment.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class PaymentService {
  static async getAddress(): Promise<Address[]> {
    console.log("getAll Address");
    await delay(2000);

    const res: Address[] = [
        {
          id: "1",
          fullName: "Nguyễn Văn A",
          phoneNumber: "0901234567",
          addressLine1: "123 Đường Lê Lợi",
          ward: "Phường Bến Nghé",
          district: "Quận 1",
          province: "TP. Hồ Chí Minh",
          isDefault: true,
        },
        {
          id: "2",
          fullName: "Nguyễn Văn A",
          phoneNumber: "0901234567",
          addressLine1: "45 Đường Nguyễn Huệ",
          addressLine2: "Tòa nhà Sunwah",
          ward: "Phường Bến Nghé",
          district: "Quận 1",
          province: "TP. Hồ Chí Minh",
          isDefault: false,
        },
      ];
    return res;
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
    console.log("Create address", model)
  }
  static async PlaceOrder(model: any): Promise<void>{
    await delay(3000);
    console.log("PlaceOrder", model)
  }
  static async removeProductFromCart(productId: string): Promise<void>{
    console.log("remove from cart productId", productId);
    await delay(2000);
  }
  
}
