import {
  Typography,
  Paper,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useStoreProduct } from "../../../../../context/U/store-products";
function Category() {
  const { selectedCategory, setSelectedCategory } = useStoreProduct();
  const { storeData } = useStoreProduct();
  const categories = storeData.categories;

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Danh mục
      </Typography>

      <List disablePadding>
        <ListItemButton
          selected={selectedCategory === "all"}
          onClick={() => setSelectedCategory("all")}
          sx={{ borderRadius: 1 }}
        >
          <ListItemText primary="Tất cả sản phẩm" />
        </ListItemButton>

        {(categories ?? []).map((category) => (
          <ListItemButton
            key={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            sx={{ borderRadius: 1 }}
          >
            <ListItemText primary={category} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}

export default Category;
