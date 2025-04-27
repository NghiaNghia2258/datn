import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  Button,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

// Sử dụng lại interface CartItem từ component giỏ hàng
interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  isSelected: boolean;
  shopId: string;
  shopName: string;
  shopAvatarUrl?: string;
}

// Format tiền Việt Nam (sử dụng lại từ component giỏ hàng)
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

interface CartPreviewProps {
  cartItems: CartItem[];
  onRemoveItem?: (id: string) => void;
}

const CartPreview: React.FC<CartPreviewProps> = ({
  cartItems,
  onRemoveItem = () => {},
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  // Tổng số lượng sản phẩm trong giỏ hàng
  const totalItems = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Tổng giá trị giỏ hàng
  const totalPrice = React.useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewCart = () => {
    navigate("/cart");
    handleClose();
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  const open = Boolean(anchorEl);
  const id = open ? "cart-preview-popover" : undefined;

  // Hiển thị tối đa 3 sản phẩm trong preview
  const previewItems = cartItems.slice(0, 3);
  const remainingItems = cartItems.length - previewItems.length;

  return (
    <Box>
      <IconButton color="inherit" aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Paper sx={{ width: 350, maxHeight: 500, overflow: "auto" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Giỏ hàng của bạn</Typography>
            <Typography variant="body2" color="text.secondary">
              {totalItems} sản phẩm
            </Typography>
          </Box>

          <Divider />

          {cartItems.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Giỏ hàng trống
              </Typography>
            </Box>
          ) : (
            <>
              <List sx={{ py: 0 }}>
                {previewItems.map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemAvatar>
                      <Avatar
                        src={item.imageUrl || "https://placehold.co/40x40"}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 0.5,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            SL: {item.quantity}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(item.price * item.quantity)}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}

                {remainingItems > 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          align="center"
                        >
                          +{remainingItems} sản phẩm khác
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>

              <Divider />

              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2">Tổng cộng:</Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="error"
                  >
                    {formatCurrency(totalPrice)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={handleViewCart}
                  >
                    Xem giỏ hàng
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    fullWidth
                    onClick={handleClose}
                  >
                    Thanh toán
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Popover>
    </Box>
  );
};

export default CartPreview;
