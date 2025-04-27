export interface Address {
    id: string;
    fullName: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    ward: string;
    district: string;
    province: string;
    isDefault: boolean;
  }
export interface Voucher {
    id: string;
    code: string;
    description: string;
    discountAmount: number;
    discountType: "FIXED" | "PERCENTAGE";
    minOrderValue: number;
    maxDiscountAmount?: number;
    shopId?: string;
    isActive: boolean;
    expiryDate: string;
  }