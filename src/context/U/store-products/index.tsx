import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import StoreProductService from "./store-product.service";
import { Brand, Product, Store } from "./store-product.response";
import { STORE_DEFAULT } from "./constant.ts";
import { OptionFilter } from "./store-product.request.ts";
import { useParams } from "react-router-dom";
interface StoreProductContextType {
  storeData: Store;

  storeId?: string;

  viewMode: string;
  setViewMode: (value: string) => void;

  brands: Brand[];
  selectedBrands: Brand[];
  getBrands: () => Promise<void>;
  handleSelectBrand: (brand: Brand) => void;
  setSelectedBrands: (value: Brand[]) => void;

  priceRange: number[];
  setPriceRange: (value: number[]) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  totalRecordsCount: number;
  optionFilter: OptionFilter;
  setOptionFilter: (option: OptionFilter) => void;
  getProducts: () => void;
  products: Product[];
}

export const StoreProductContext = createContext<
  StoreProductContextType | undefined
>(undefined);

export const StoreProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { storeId } = useParams<string>();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [storeData, setStoreData] = useState<Store>(STORE_DEFAULT);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [priceRange, setPriceRange] = useState([0, 40000000]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [totalRecordsCount, setTotalRecordsCount] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<string>("grid");
  const [optionFilter, setOptionFilter] = useState<OptionFilter>({
    pageIndex: 1,
    pageSize: 30,
    sortBy: "popular",
    storeId: "",
  });

  const getProducts = async () => {
    if (!optionFilter.storeId) return;
    const res = await StoreProductService.GetProduct(optionFilter);
    if (res.isSucceeded) {
      setProducts(res.data ?? []);
      setTotalRecordsCount(res.totalRecordsCount ?? 0);
    }
  };

  const getBrands = async () => {
    const res = await StoreProductService.getBrands();
    setBrands(res);
  };
  const handleSelectBrand = (brand: Brand) => {
    const currentIndex = selectedBrands.indexOf(brand);
    const newSelectedBrands = [...selectedBrands];

    if (currentIndex === -1) {
      newSelectedBrands.push(brand);
    } else {
      newSelectedBrands.splice(currentIndex, 1);
    }

    setSelectedBrands(newSelectedBrands);
  };
  const getStoreInfo = async () => {
    const res = await StoreProductService.getStoreInfo(storeId ?? "");
    setStoreData(res);
  };

  useEffect(() => {
    getStoreInfo();
    setOptionFilter({
      ...optionFilter,
      storeId: storeId ?? "",
    });
  }, [storeId]);

  useEffect(() => {
    getProducts();
  }, [optionFilter]);
  return (
    <StoreProductContext.Provider
      value={{
        storeId,
        viewMode,
        setViewMode,
        optionFilter,
        products,
        totalRecordsCount,
        getProducts,
        setOptionFilter,
        storeData,
        brands,
        setSelectedBrands,
        getBrands,
        selectedBrands,
        handleSelectBrand,
        priceRange,
        setPriceRange,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </StoreProductContext.Provider>
  );
};

export const useStoreProduct = (): StoreProductContextType => {
  const context = useContext(StoreProductContext);
  if (!context) {
    throw new Error("useCustomer phải được dùng bên trong CustomerProvider");
  }
  return context;
};
