import { CreateProductProvider } from "../../context/A/create-product";
import FeatCreateProduct from "../../features/A/create-product";

const CreateProduct = () => {
  return (
    <CreateProductProvider>
      <FeatCreateProduct />
    </CreateProductProvider>
  );
};

export default CreateProduct;
