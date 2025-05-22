import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Button,
  IconButton,
  Rating,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import { useStoreProduct } from "../../../../../context/U/store-products";
import { FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { formatPrice } from "../../../../../utils/format-price";

function ViewModeList() {
  const { products } = useStoreProduct();

  return (
    <Box>
      {products.map((product) => (
        <Paper
          key={product.id}
          elevation={0}
          variant="outlined"
          sx={{
            mb: 2,
            p: 2,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Box sx={{ position: "relative" }}>
                {product.discount > 0 && (
                  <Chip
                    label={`-${product.discount}%`}
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      fontWeight: "bold",
                      zIndex: 1,
                    }}
                  />
                )}

                <CardMedia
                  component="img"
                  image={product.images[0]}
                  alt={product.name}
                  sx={{
                    height: 180,
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography variant="h6" component="div">
                    {product.name}
                    {product.isNew && (
                      <Chip
                        label="Mới"
                        color="primary"
                        size="small"
                        sx={{
                          ml: 1,
                          height: 20,
                          fontWeight: "bold",
                        }}
                      />
                    )}
                    {product.isBestSeller && (
                      <Chip
                        label="Bán chạy"
                        color="warning"
                        size="small"
                        sx={{
                          ml: 1,
                          height: 20,
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </Typography>

                  <IconButton size="small" onClick={() => {}}>
                    <FavoriteBorder />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({product.reviewCount})
                  </Typography>
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Đã bán: {Math.floor(product.reviewCount * 2.5)}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {product.shortDescription}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary.main"
                    sx={{ fontWeight: "bold" }}
                  >
                    {formatPrice(product.price)}
                  </Typography>

                  {product.discount > 0 && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        ml: 1,
                        textDecoration: "line-through",
                      }}
                    >
                      {formatPrice(product.originalPrice)}
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Button variant="outlined" sx={{ mr: 1 }}>
                    Chi tiết
                  </Button>
                  <Button variant="contained" startIcon={<ShoppingCart />}>
                    Thêm vào giỏ
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}

export default ViewModeList;
