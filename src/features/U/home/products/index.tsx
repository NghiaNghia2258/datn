import { Box, Grid, Typography } from "@mui/material";
import Product from "../product";

interface ProductItem {
  id: number;
  name: string;
  price: string;
  image: string;
  discount?: string; // Discount can be optional for BestSellers
  rating?: number; // Rating can be optional for FeaturedProducts
}

interface ProductsListProps {
  title: string;
  products: ProductItem[];
}

const ProductsList: React.FC<ProductsListProps> = ({ title, products }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.id}>
            <Product
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              discount={product.discount ?? ""}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
