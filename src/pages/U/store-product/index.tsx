import { StoreProductProvider } from "../../../context/U/store-products";
import StoreProductsPage from "../../../features/A/store-products";

const StoreProducts = () => {
  return (
    <StoreProductProvider>
      <StoreProductsPage />
    </StoreProductProvider>
  );
};

export default StoreProducts;
