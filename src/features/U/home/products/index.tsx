import { Box, Grid, Typography } from "@mui/material";
import { ProductCard } from "../../../A/store-products/product-card";

interface ProductsListProps {
  title: string;
  products: any[];
}

const ProductsList: React.FC<ProductsListProps> = ({ title, products }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {(products ?? []).map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
