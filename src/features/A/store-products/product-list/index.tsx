import { useStoreProduct } from "../../../../context/U/store-products";
import NotFoundProduct from "./not-found";

import ViewModeGrid from "./view-mode-grid";
import ViewModeList from "./view-mode-list";
function ProductList() {
  const { products, viewMode } = useStoreProduct();

  return products.length > 0 ? (
    <>{viewMode === "grid" ? <ViewModeGrid /> : <ViewModeList />}</>
  ) : (
    <NotFoundProduct />
  );
}

export default ProductList;
