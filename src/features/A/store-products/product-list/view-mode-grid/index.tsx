import { Grid } from "@mui/material";
import { ProductCard } from "../../product-card";
import { useStoreProduct } from "../../../../../context/U/store-products";

function ViewModeGrid() {
  const { products } = useStoreProduct();
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ViewModeGrid;
