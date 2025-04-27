import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IProductCreateSchema } from "../../../features/A/create-product/zod";
import { productData } from "./constant";
import { Review } from "./response";
import ProductDetailService from "./service";
import { useParams } from "react-router-dom";
import ProductService from "../../../services/product.service";

interface ProductDetailContextType {
  product: IProductCreateSchema;
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
  getReviews: () => Promise<void>;
  getProductDetail: () => Promise<void>;
  reviews: Review[];
  isLoadingReviews: boolean;
}

export const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);

export const ProductDetailProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("Trắng");
  const [selectedSize, setSelectedSize] = useState("S");
  const [currentPrice, setCurrentPrice] = useState(199000);
  const [currentStock, setCurrentStock] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [product, setProduct] = useState<IProductCreateSchema>(productData);

  const getReviews = async () => {
    try {
      if (!id) return;
      setIsLoadingReviews(true);
      const res = await ProductDetailService.getReviews(id);
      setReviews(res.data ?? []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const getProductDetail = async () => {
    try {
      if (!id) return;
      const res = await ProductService.GetOne(id);
      setProduct(res);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
    }
  };

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
  useEffect(() => {
    getReviews();
    getProductDetail();
  }, [id]);
  return (
    <ProductDetailContext.Provider
      value={{
        getProductDetail,
        getReviews,
        isLoadingReviews,
        reviews,
        product,
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
