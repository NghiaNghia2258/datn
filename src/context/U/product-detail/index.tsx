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
  id: string | undefined;
  product: IProductCreateSchema;
  selectedProperty1: string;
  selectedProperty2: string;
  currentPrice: number;
  currentStock: number;
  quantity: number;
  isAvailable: boolean;
  favorite: boolean;
  handleQuantityChange: (amount: number) => void;
  handleAddToCart: () => void;
  handleProperty1Change: (Property1: string) => void;
  handleProperty2Change: (Property2: string) => void;
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  getReviews: () => Promise<void>;
  getProductDetail: () => Promise<void>;
  reviews: Review[];
  isLoadingReviews: boolean;
  snackbarOpen: boolean;
  setSnackbarOpen: (value: boolean) => void;
  setOpenPopupReview: (value: boolean) => void;
  openPopupReview: boolean;
  totalRV: number;
  avgRV: number;
}

export const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined);

export const ProductDetailProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { id } = useParams();
  const [selectedProperty1, setSelectedProperty1] = useState("Trắng");
  const [selectedProperty2, setSelectedProperty2] = useState("S");
  const [currentPrice, setCurrentPrice] = useState(199000);
  const [currentStock, setCurrentStock] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [product, setProduct] = useState<IProductCreateSchema>(productData);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openPopupReview, setOpenPopupReview] = useState(false);
  const [totalRV, setTotalRV] = useState(0);
  const [avgRV, setAvgRV] = useState(0);

  const getReviews = async () => {
    try {
      if (!id) return;
      setIsLoadingReviews(true);
      const res = await ProductDetailService.getReviews(id);
      setAvgRV(res.avgRating);
      setTotalRV(res.total);
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

  const handleAddToCart = async () => {
    if (!id) return;
    await ProductDetailService.AddToCart(
      id,
      selectedProperty1,
      selectedProperty2,
      quantity
    );
    setSnackbarOpen(true);
  };

  const handleProperty1Change = (property1: string) => {
    setSelectedProperty1(property1);
  };

  const handleProperty2Change = (property2: string) => {
    setSelectedProperty2(property2);
  };

  useEffect(() => {
    getReviews();
    getProductDetail();
  }, [id]);
  return (
    <ProductDetailContext.Provider
      value={{
        id,
        totalRV,
        avgRV,
        openPopupReview,
        setOpenPopupReview,
        snackbarOpen,
        setSnackbarOpen,
        getProductDetail,
        getReviews,
        isLoadingReviews,
        reviews,
        product,
        selectedProperty1,
        selectedProperty2,
        currentPrice,
        currentStock,
        quantity,
        isAvailable,
        favorite,
        handleQuantityChange,
        handleAddToCart,
        handleProperty1Change,
        handleProperty2Change,
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
