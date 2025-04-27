export interface CartItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number; 
    isSelected: boolean;
    shopId: string;
    shopName: string;
    shopAvatarUrl?: string;
  }