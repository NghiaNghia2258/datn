import React from "react";
import {
  Grid,
  Box,
  Paper,
  IconButton,
  Typography,
  Chip,
  Button,
  TextField,
  Divider,
  Rating,
  useTheme,
} from "@mui/material";
import {
  NavigateBefore,
  NavigateNext,
  Add,
  Remove,
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  AccessTime,
  Payment,
  CheckCircle,
} from "@mui/icons-material";
import { useProductDetail } from "../../../../context/U/product-detail";
import { formatPrice } from "../../../../utils/format-price";

const ProductDetailMainSection: React.FC = () => {
  const {
    product,
    selectedProperty1,
    selectedProperty2,
    currentPrice,
    currentStock,
    quantity,
    isAvailable,
    favorite,
    handleQuantityChange,
    handleAddToCart,
    handleProperty1Change,
    handleProperty2Change,
    setFavorite,
  } = useProductDetail();
  const theme = useTheme();

  const images = product.productVariants.map((v) => v.image);
  const [currentImage, setCurrentImage] = React.useState(0);
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
  };

  // Tìm giá và tồn kho dựa trên biến thể đã chọn
  const selectedVariant = product.productVariants.find(
    (variant) =>
      variant.propertyValue1 === selectedProperty1 &&
      variant.propertyValue2 === selectedProperty2
  );
  return (
    <>
      {/* Product Detail Main Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            <Paper
              elevation={2}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                height: { xs: "300px", sm: "400px", md: "500px" },
              }}
            >
              <Box
                component="img"
                src={selectedVariant?.image || images[currentImage]}
                alt={`${product.name} - ${selectedProperty1} ${selectedProperty2}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Image Navigation Arrows */}
              <IconButton
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                }}
                onClick={handlePrevImage}
              >
                <NavigateBefore />
              </IconButton>

              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
                }}
                onClick={handleNextImage}
              >
                <NavigateNext />
              </IconButton>
            </Paper>
          </Box>

          {/* Image Thumbnails */}
          <Box sx={{ display: "flex", mt: 2, overflow: "auto", gap: 1 }}>
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  border:
                    index === currentImage
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={4.5} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              (25 đánh giá)
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Đã bán: 120
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {formatPrice(currentPrice)}
          </Typography>

          {/* Màu sắc */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.propertyName1}:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            {product.propertyValue1.map((color) => {
              const isActiveColor = color === selectedProperty1;
              // Kiểm tra xem màu này có tồn tại biến thể nào không
              const hasVariants = product.productVariants.some(
                (v) => v.propertyValue1 === color
              );

              return (
                <Box
                  key={color}
                  onClick={() => hasVariants && handleProperty1Change(color)}
                  sx={{
                    border: `2px solid ${isActiveColor ? theme.palette.primary.main : "transparent"}`,
                    borderRadius: 1,
                    p: 0.5,
                    cursor: hasVariants ? "pointer" : "not-allowed",
                    opacity: hasVariants ? 1 : 0.5,
                  }}
                >
                  <Chip
                    label={color}
                    sx={{
                      backgroundColor:
                        color.toLowerCase() === "trắng"
                          ? "#FFFFFF"
                          : color.toLowerCase() === "đen"
                            ? "#000000"
                            : color.toLowerCase(),
                      color:
                        color.toLowerCase() === "trắng" ? "#000000" : "#FFFFFF",
                      px: 1,
                    }}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Kích cỡ */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.propertyName2}:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            {product.propertyValue2.map((size) => {
              // Kiểm tra xem có biến thể nào cho màu và kích cỡ này không
              const hasVariant = product.productVariants.some(
                (v) =>
                  v.propertyValue1 === selectedProperty1 &&
                  v.propertyValue2 === size
              );
              const isActiveSize = size === selectedProperty2;

              return (
                <Box
                  key={size}
                  onClick={() => hasVariant && handleProperty2Change(size)}
                  sx={{
                    border: `2px solid ${isActiveSize ? theme.palette.primary.main : "transparent"}`,
                    borderRadius: 1,
                    cursor: hasVariant ? "pointer" : "not-allowed",
                    opacity: hasVariant ? 1 : 0.5,
                  }}
                >
                  <Chip
                    label={size}
                    variant={isActiveSize ? "filled" : "outlined"}
                    sx={{ minWidth: 48 }}
                  />
                </Box>
              );
            })}
          </Box>

          {/* Số lượng */}
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            Số lượng:
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Button
              variant="outlined"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              sx={{ minWidth: 40, p: 0 }}
            >
              <Remove />
            </Button>
            <TextField
              value={quantity}
              InputProps={{ readOnly: true }}
              size="small"
              sx={{ width: 60, mx: 1, input: { textAlign: "center" } }}
            />
            <Button
              variant="outlined"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= currentStock}
              sx={{ minWidth: 40, p: 0 }}
            >
              <Add />
            </Button>
            <Typography variant="body2" sx={{ ml: 2, color: "text.secondary" }}>
              Còn {currentStock} sản phẩm
            </Typography>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              disabled={!isAvailable}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Thêm vào giỏ hàng
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => setFavorite(!favorite)}
              sx={{ minWidth: { xs: "100%", sm: "auto" }, py: 1.5 }}
            >
              {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{ minWidth: { xs: "100%", sm: "auto" }, py: 1.5 }}
            >
              <Share />
            </Button>
          </Box>

          {/* Shipping Info */}
          <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocalShipping
                sx={{ mr: 1, color: theme.palette.primary.main }}
              />
              <Typography variant="body1">
                Giao hàng miễn phí cho đơn hàng trên 300.000₫
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AccessTime sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="body1">
                Giao hàng trong 2-3 ngày làm việc
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Payment sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography variant="body1">
                Thanh toán khi nhận hàng (COD)
              </Typography>
            </Box>
          </Paper>

          {/* Product Description Short */}
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CheckCircle
              fontSize="small"
              sx={{ mr: 1, color: "success.main" }}
            />
            <Typography variant="body2">Chất liệu: Cotton 100%</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CheckCircle
              fontSize="small"
              sx={{ mr: 1, color: "success.main" }}
            />
            <Typography variant="body2">
              Thoáng mát, thấm hút mồ hôi tốt
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircle
              fontSize="small"
              sx={{ mr: 1, color: "success.main" }}
            />
            <Typography variant="body2">
              Trọng lượng: {product.weight} {product.unitWeight}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductDetailMainSection;
