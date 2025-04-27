import { ProductProvider } from "../../context/A/view-products";
import { FeatViewProducts } from "../../features/A/view-products";

const ViewProduct = () => {
  return (
    <ProductProvider>
      <FeatViewProducts />
    </ProductProvider>
  );
};

export default ViewProduct;
