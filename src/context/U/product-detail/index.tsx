import { createContext, ReactNode, useContext, useState } from "react";
import { IProductCreateSchema } from "../../../features/A/create-product/zod";
import { productData } from "./constant";

interface ProductDetailContextType {
  productData: IProductCreateSchema;
  selectedColor: string;
  selectedSize: string;
  currentPrice: number;
  currentStock: number;
  quantity: number;
  isAvailable: boolean;
  favorite: boolean;
  handleQuantityChange: (amount: number) => void;
  handleAddToCart: () => void;
  handleColorChange: (color: string) => void;
  handleSizeChange: (size: string) => void;
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);

export const ProductDetailProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedColor, setSelectedColor] = useState("Trắng");
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentPrice, setCurrentPrice] = useState(199000);
  const [currentStock, setCurrentStock] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + amount, currentStock)));
  };

  const handleAddToCart = () => {
    console.log("Product added to cart");
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <ProductDetailContext.Provider
      value={{
        productData,
        selectedColor,
        selectedSize,
        currentPrice,
        currentStock,
        quantity,
        isAvailable,
        favorite,
        handleQuantityChange,
        handleAddToCart,
        handleColorChange,
        handleSizeChange,
        setFavorite,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
};

export const useProductDetail = (): ProductDetailContextType => {
  const context = useContext(ProductDetailContext);
  if (!context) {
    throw new Error("useCustomer phải được dùng bên trong CustomerProvider");
  }
  return context;
};
