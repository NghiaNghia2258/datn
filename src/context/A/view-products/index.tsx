import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ProductInventoryInfo,
  ResponseGetAllProducts,
  ResponseStatisticsOneProduct,
} from "../../../services/response/product.response";
import { RequestGetALlProducts } from "../../../services/request/product.request";
import ProductService from "../../../services/product.service";

interface ProductContextType {
  products: ResponseGetAllProducts[];
  listProductRate: ResponseStatisticsOneProduct[];
  listProductInventoryInfo: ProductInventoryInfo[];
  productIdViewStatistics: string;
  loading: boolean;
  textSearch: string;
  setLoading: (loading: boolean) => void;
  getListProducts: (option?: RequestGetALlProducts) => void;
  setTextSearch: (value: string) => void;
  getProductRateById: (id: string) => Promise<ResponseStatisticsOneProduct>;
  getProductInventoryInfoById: (id: string) => Promise<ProductInventoryInfo>;
  setProductIdViewStatistics: (id: string) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ResponseGetAllProducts[]>([]);
  const [listProductInventoryInfo, setListProductInventoryInfo] = useState<
    ProductInventoryInfo[]
  >([]);
  const [listProductRate, setListProductRate] = useState<
    ResponseStatisticsOneProduct[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [productIdViewStatistics, setProductIdViewStatistics] =
    useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");

  const getListProducts = async (option?: RequestGetALlProducts) => {
    setLoading(true);
    try {
      const response = await ProductService.getAll(option);
      setProductIdViewStatistics(response[0].id);
      setProducts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListProducts();
  }, []);

  const getProductRateById = async (
    id: string
  ): Promise<ResponseStatisticsOneProduct> => {
    let result = listProductRate.find((rate) => rate.productId === id);
    if (!result) {
      const response = await ProductService.GetProductStatistics(id);
      setListProductRate((prev) => [...prev, response]);
      result = response;
    }
    return result;
  };

  const getProductInventoryInfoById = async (
    id: string
  ): Promise<ProductInventoryInfo> => {
    let result = listProductInventoryInfo.find(
      (inventory) => inventory.id === id
    );
    if (!result) {
      const response = await ProductService.GetProductInventoryInfo(id);
      setListProductInventoryInfo((prev) => [...prev, response]);
      result = response;
    }
    return result;
  };

  return (
    <ProductContext.Provider
      value={{
        getProductInventoryInfoById,
        listProductInventoryInfo,
        productIdViewStatistics,
        setProductIdViewStatistics,
        getProductRateById,
        listProductRate,
        textSearch,
        setTextSearch,
        products,
        loading,
        setLoading,
        getListProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useViewProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct phải được dùng bên trong ProductProvider");
  }
  return context;
};
