import { useEffect } from "react";
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useStoreProduct } from "../../../../../context/U/store-products";

function Brands() {
  const { brands, getBrands, selectedBrands, handleSelectBrand } =
    useStoreProduct();
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Thương hiệu
      </Typography>

      <List sx={{ mb: 3 }}>
        {brands.map((brand) => (
          <ListItem key={brand.id} disablePadding>
            <ListItemButton
              role={undefined}
              dense
              onClick={() => handleSelectBrand(brand)}
            >
              <Checkbox
                edge="start"
                checked={selectedBrands.indexOf(brand) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={brand.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Brands;
