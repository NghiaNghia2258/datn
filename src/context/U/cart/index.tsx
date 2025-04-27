import { createContext, ReactNode, useContext } from "react";

interface CartContextType {}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <CartContext.Provider value={{}}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCustomer phải được dùng bên trong CustomerProvider");
  }
  return context;
};
