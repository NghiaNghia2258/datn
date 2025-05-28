import { CartItem } from "./cart.response";
import * as axios from "../../../services/axios-instance"
export default class CartService {
  static async getCart(): Promise<CartItem[]> {
    const res = await axios.GET("customer/get-cart");
    return res.data.cartItems;
  }
  static async removeProductFromCart(productId: string): Promise<void>{
    console.log("remove from cart productId", productId);
  }
}
