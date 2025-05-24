import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Rating,
  Chip,
} from "@mui/material";

import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import { FC, useState } from "react";
import { Product } from "../../../../context/U/store-products/store-product.response";
import { formatPrice } from "../../../../utils/format-price";
import { useNavigateCommon } from "../../../../hooks/navigate";
import { USER_URLS } from "../../../../routes/AppRoutes";
import CustomerService from "../../../../services/customer.service";
type ProductCardProps = Product;
export const ProductCard: FC<ProductCardProps> = ({
  id,
  discount,
  isNew,
  images,
  name,
  reviewCount,
  shortDescription,
  rating,
  price,
  originalPrice,
  isBestSeller,
  isFavorite,
}) => {
  console.log(discount);
  const [favorite, setFavorite] = useState(isFavorite);
  const navigate = useNavigateCommon();
  const handleFavoriteClick = async () => {
    setFavorite(!favorite);
    await CustomerService.addWishList(id, !favorite);
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
      onClick={() => {
        navigate(`${USER_URLS.PRODUCT_DETAIL}/${id}`);
      }}
    >
      {discount > 0 && (
        <Chip
          label={`-${discount}%`}
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

      {isNew && (
        <Chip
          label="Mới"
          color="primary"
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 50,
            fontWeight: "bold",
            zIndex: 1,
          }}
        />
      )}

      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "white",
          "&:hover": { backgroundColor: "white" },
          zIndex: 1,
        }}
        onClick={() => handleFavoriteClick()}
      >
        {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={images[0]}
        alt={name}
        sx={{
          objectFit: "contain",
          backgroundColor: "#f5f5f5",
          p: 2,
        }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: "bold",
            height: "2.6em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 1 }}>
          <Rating value={rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({reviewCount})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", mt: 1 }}>
          <Typography
            variant="h6"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            {formatPrice(price)}
          </Typography>

          {discount > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 1, textDecoration: "line-through" }}
            >
              {formatPrice(originalPrice)}
            </Typography>
          )}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            height: "3em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {shortDescription}
        </Typography>
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          sx={{
            borderRadius: "4px",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Thêm vào giỏ
        </Button>
      </CardActions>

      {isBestSeller && (
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            right: 0,
            backgroundColor: "warning.main",
            color: "white",
            px: 1,
            py: 0.5,
            fontWeight: "bold",
            fontSize: 12,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 1,
          }}
        >
          Bán chạy
        </Box>
      )}
    </Card>
  );
};
