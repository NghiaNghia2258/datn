import { ProductDetailProvider } from "../../../context/U/product-detail";
import ProductDetailPage from "../../../features/U/product-detail";

const ProductDetail = () => {
  return (
    <ProductDetailProvider>
      <ProductDetailPage />
    </ProductDetailProvider>
  );
};

export default ProductDetail;
