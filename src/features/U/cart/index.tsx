import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Grid,
  Checkbox,
  IconButton,
  Button,
  CardMedia,
  FormControlLabel,
  TextField,
  Avatar,
  Snackbar,
  Alert,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CartPreview from "./preview";
import { formatPrice } from "../../../utils/format-price";
import { CartItem } from "../../../context/U/cart/cart.response";
import CartService from "../../../context/U/cart/cart.service";
import { useNavigateCommon } from "../../../hooks/navigate";
import { USER_URLS } from "../../../routes/AppRoutes";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigateCommon();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    type: "info",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await CartService.getCart();
      setCartItems(res);
    };
    fetchData();
  }, []);
  // Nhóm các sản phẩm theo cửa hàng
  const shopGroups = React.useMemo(() => {
    const groups: { [key: string]: CartItem[] } = {};

    cartItems.forEach((item) => {
      if (!groups[item.shopId]) {
        groups[item.shopId] = [];
      }
      groups[item.shopId].push(item);
    });

    return Object.entries(groups).map(([shopId, items]) => ({
      shopId,
      shopName: items[0].shopName,
      shopAvatarUrl: items[0].shopAvatarUrl,
      items,
    }));
  }, [cartItems]);

  // Tổng tiền các sản phẩm đã chọn
  const totalSelectedPrice = React.useMemo(() => {
    return cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // Tổng số lượng sản phẩm đã chọn
  const totalSelectedItems = React.useMemo(() => {
    return cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // Kiểm tra xem tất cả sản phẩm có được chọn không
  const allSelected = React.useMemo(() => {
    return cartItems.length > 0 && cartItems.every((item) => item.isSelected);
  }, [cartItems]);

  // Xử lý chọn tất cả sản phẩm
  const handleSelectAll = (checked: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: checked }))
    );
  };

  // Xử lý chọn một sản phẩm
  const handleSelectItem = (id: string, checked: boolean) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected: checked } : item
      )
    );
  };

  // Xử lý chọn tất cả sản phẩm của một cửa hàng
  const handleSelectShop = (shopId: string, checked: boolean) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.shopId === shopId ? { ...item, isSelected: checked } : item
      )
    );
  };

  // Xử lý thay đổi số lượng sản phẩm
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Xử lý xóa sản phẩm
  const handleRemoveItem = async (id: string) => {
    await CartService.removeProductFromCart(id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showNotification("Đã xóa sản phẩm khỏi giỏ hàng", "success");
  };

  // Hiển thị thông báo
  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({
      open: true,
      message,
      type,
    });
  };

  // Đóng thông báo
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  // Xử lý checkout
  const handleCheckout = () => {
    if (totalSelectedItems === 0) {
      showNotification("Vui lòng chọn ít nhất một sản phẩm", "error");
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    navigate(USER_URLS.PAYMENT);
  };

  // Nếu giỏ hàng trống
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: "text.secondary" }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            Giỏ hàng của bạn đang trống
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
          </Typography>
          <Button variant="contained" color="primary">
            Tiếp tục mua sắm
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <CartPreview cartItems={cartItems} />

      <Typography
        variant="h4"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <ShoppingCartIcon sx={{ mr: 1 }} /> Giỏ hàng của bạn
      </Typography>

      <Grid container spacing={3}>
        {/* Phần chính - danh sách sản phẩm */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                }
                label="Chọn tất cả sản phẩm"
              />
              <Typography variant="body2" color="text.secondary">
                {cartItems.length} sản phẩm
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {shopGroups.map((shopGroup) => (
              <Box key={shopGroup.shopId} sx={{ mb: 4 }}>
                {/* Thông tin cửa hàng */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Checkbox
                    checked={shopGroup.items.every((item) => item.isSelected)}
                    indeterminate={
                      shopGroup.items.some((item) => item.isSelected) &&
                      !shopGroup.items.every((item) => item.isSelected)
                    }
                    onChange={(e) =>
                      handleSelectShop(shopGroup.shopId, e.target.checked)
                    }
                  />
                  <Avatar src={shopGroup.shopAvatarUrl} sx={{ mr: 1 }}>
                    <StorefrontIcon />
                  </Avatar>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {shopGroup.shopName}
                  </Typography>
                </Box>

                {/* Danh sách sản phẩm của cửa hàng */}
                <TableContainer
                  component={Paper}
                  elevation={0}
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell width="5%"></TableCell>
                        <TableCell width="45%">Sản phẩm</TableCell>
                        <TableCell width="15%" align="right">
                          Đơn giá
                        </TableCell>
                        <TableCell width="20%" align="center">
                          Số lượng
                        </TableCell>
                        <TableCell width="15%" align="right">
                          Thành tiền
                        </TableCell>
                        <TableCell width="5%"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shopGroup.items.map((item) => (
                        <TableRow key={item.id} hover>
                          <TableCell>
                            <Checkbox
                              checked={item.isSelected}
                              onChange={(e) =>
                                handleSelectItem(item.id, e.target.checked)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <CardMedia
                                component="img"
                                sx={{
                                  width: 80,
                                  height: 80,
                                  marginRight: 2,
                                  objectFit: "contain",
                                }}
                                image={
                                  item.imageUrl || "https://placehold.co/80x80"
                                }
                                alt={item.name}
                              />
                              <Typography variant="body1">
                                {item.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {formatPrice(item.price)}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <TextField
                                size="small"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  if (!isNaN(value) && value >= 1) {
                                    handleQuantityChange(item.id, value);
                                  }
                                }}
                                inputProps={{
                                  min: 1,
                                  style: { textAlign: "center", width: "40px" },
                                }}
                                variant="outlined"
                                sx={{ mx: 1 }}
                              />
                              <IconButton
                                size="small"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography fontWeight="bold">
                              {formatPrice(item.price * item.quantity)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveItem(item.id)}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Phần tổng kết và thanh toán */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Tổng thanh toán
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Tổng tiền hàng:</Typography>
                <Typography variant="body1">
                  {formatPrice(totalSelectedPrice)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Phí vận chuyển:</Typography>
                <Typography variant="body1">
                  {formatPrice(totalSelectedItems > 0 ? 30000 : 0)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Thành tiền:</Typography>
              <Typography variant="h6" color="error">
                {formatPrice(
                  totalSelectedPrice + (totalSelectedItems > 0 ? 30000 : 0)
                )}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={totalSelectedItems === 0}
              onClick={handleCheckout}
            >
              Thanh toán ({totalSelectedItems} sản phẩm)
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ShoppingCart;
