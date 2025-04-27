import { CartItem } from "./cart.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class CartService {
  static async getCart(): Promise<CartItem[]> {
    console.log("getAll cart");
    await delay(2000);

    const res: CartItem[] = [
        {
          id: "1",
          productId: "prod-1",
          name: "Laptop Dell XPS 13",
          price: 25000000,
          imageUrl: "https://placehold.co/100x100",
          quantity: 1,
          isSelected: true,
          shopId: "shop-1",
          shopName: "Dell Chính Hãng",
          shopAvatarUrl: "https://placehold.co/40x40",
        },
        {
          id: "2",
          productId: "prod-2",
          name: "Chuột không dây Logitech MX Master 3",
          price: 2200000,
          imageUrl: "https://placehold.co/100x100",
          quantity: 2,
          isSelected: true,
          shopId: "shop-1",
          shopName: "Dell Chính Hãng",
          shopAvatarUrl: "https://placehold.co/40x40",
        },
        {
          id: "3",
          productId: "prod-3",
          name: 'Màn hình Dell Ultrasharp 27"',
          price: 8500000,
          imageUrl: "https://placehold.co/100x100",
          quantity: 1,
          isSelected: false,
          shopId: "shop-1",
          shopName: "Dell Chính Hãng",
          shopAvatarUrl: "https://placehold.co/40x40",
        },
        {
          id: "4",
          productId: "prod-4",
          name: "Bàn phím cơ Keychron K2",
          price: 1800000,
          imageUrl: "https://placehold.co/100x100",
          quantity: 1,
          isSelected: true,
          shopId: "shop-2",
          shopName: "Phụ Kiện Máy Tính",
          shopAvatarUrl: "https://placehold.co/40x40",
        },
      ];

    return res;
  }
  static async removeProductFromCart(productId: string): Promise<void>{
    console.log("remove from cart productId", productId);
    await delay(2000);
  }
}
