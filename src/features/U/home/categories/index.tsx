import { Box, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Danh mục sản phẩm
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={4} sm={2} key={category.id}>
            <Paper
              elevation={1}
              sx={{
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 3,
                },
              }}
            >
              <Box
                component="img"
                src={category.image}
                alt={category.name}
                sx={{
                  width: "70%",
                  mb: 1,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                {category.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
