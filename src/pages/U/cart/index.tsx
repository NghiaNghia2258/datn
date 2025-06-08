import { CartProvider } from "../../../context/U/cart";
import ShoppingCart from "../../../features/U/cart";

const Cart = () => {
  return (
    <CartProvider>
      <ShoppingCart />
    </CartProvider>
  );
};

export default Cart;
