import { CartProvider } from "../../../context/U/cart";
import ShoppingCart from "../../../features/U/cart";

const Cart = () => {
  return (
    <CartProvider>
      <div style={{ height: 60 }}></div>
      <ShoppingCart />
    </CartProvider>
  );
};

export default Cart;
