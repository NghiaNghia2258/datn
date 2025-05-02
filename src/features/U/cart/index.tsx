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
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CartPreview from "./preview";
import { formatPrice } from "../../../utils/format-price";
import { CartItem } from "../../../context/U/cart/cart.response";
import CartService from "../../../context/U/cart/cart.service";
import { useNavigateCommon } from "../../../hooks/navigate";
import { USER_URLS } from "../../../routes/AppRoutes";

// Mở rộng interface CartItem để hỗ trợ bundle
interface ExtendedCartItem extends CartItem {
  bundleId?: string;
  bundleName?: string;
  discountRate?: number;
  isPartOfBundle?: boolean;
}

// Interface cho Bundle
interface Bundle {
  id: string;
  name: string;
  shopId: string;
  requiredItems: string[]; // Danh sách ID sản phẩm cần có để kích hoạt bundle
  discountRate: number; // Tỷ lệ giảm giá (ví dụ: 0.1 = 10%)
  description: string;
  thumbnailUrl?: string;
}

// Service mới để lấy bundles
const BundleService = {
  getBundlesForCart: async (cartItems: CartItem[]): Promise<Bundle[]> => {
    // Trong thực tế, bạn sẽ gọi API ở đây
    // Mock data để demo
    const shopIds = [...new Set(cartItems.map((item) => item.shopId))];

    return [
      {
        id: "bundle-1",
        name: "Combo tiết kiệm",
        shopId: shopIds[0] || "",
        requiredItems: cartItems
          .filter((item) => item.shopId === shopIds[0])
          .slice(0, 2)
          .map((item) => item.id),
        discountRate: 0.1,
        description: "Mua 2 sản phẩm này cùng nhau và tiết kiệm 10%",
        thumbnailUrl: "https://placehold.co/60x60",
      },
      {
        id: "bundle-2",
        name: "Combo siêu tiết kiệm",
        shopId: shopIds[0] || "",
        requiredItems: cartItems
          .filter((item) => item.shopId === shopIds[0])
          .map((item) => item.id),
        discountRate: 0.15,
        description: "Mua tất cả sản phẩm từ cửa hàng này và tiết kiệm 15%",
        thumbnailUrl: "https://placehold.co/60x60",
      },
    ];
  },
};

const ShoppingCart: React.FC = () => {
  const navigate = useNavigateCommon();

  const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [activeBundles, setActiveBundles] = useState<string[]>([]); // ID của các bundle được kích hoạt
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    type: "info",
  });

  // Fetch cart items
  useEffect(() => {
    const fetchData = async () => {
      const res = await CartService.getCart();
      setCartItems(res);

      // Lấy thông tin về các bundle có thể áp dụng
      const bundlesData = await BundleService.getBundlesForCart(res);
      setBundles(bundlesData);
    };
    fetchData();
  }, []);

  // Nhóm các sản phẩm theo cửa hàng
  const shopGroups = React.useMemo(() => {
    const groups: { [key: string]: ExtendedCartItem[] } = {};

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

  // Kiểm tra và áp dụng bundles
  useEffect(() => {
    // Reset all bundle flags
    const resetItems = cartItems.map((item) => ({
      ...item,
      bundleId: undefined,
      bundleName: undefined,
      discountRate: undefined,
      isPartOfBundle: false,
    }));

    let updatedItems = [...resetItems];
    let newActiveBundles: string[] = [];

    // Kiểm tra từng bundle
    bundles.forEach((bundle) => {
      // Kiểm tra xem bundle có thể áp dụng không (tất cả sản phẩm yêu cầu có trong giỏ hàng và được chọn)
      const allRequiredItemsSelected = bundle.requiredItems.every(
        (requiredItemId) =>
          updatedItems.some(
            (item) => item.id === requiredItemId && item.isSelected
          )
      );

      if (allRequiredItemsSelected) {
        newActiveBundles.push(bundle.id);

        // Áp dụng giảm giá cho các sản phẩm thuộc bundle
        updatedItems = updatedItems.map((item) => {
          if (bundle.requiredItems.includes(item.id) && item.isSelected) {
            return {
              ...item,
              bundleId: bundle.id,
              bundleName: bundle.name,
              discountRate: bundle.discountRate,
              isPartOfBundle: true,
            };
          }
          return item;
        });
      }
    });

    setCartItems(updatedItems);
    setActiveBundles(newActiveBundles);
  }, [bundles, cartItems.map((item) => item.isSelected).join(",")]);

  // Tính tổng tiền và chiết khấu
  const cartSummary = React.useMemo(() => {
    // Tổng tiền gốc (không giảm giá)
    const originalTotal = cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.price * item.quantity, 0);

    // Tổng số tiền giảm giá từ bundles
    const bundleDiscount = cartItems
      .filter((item) => item.isSelected && item.isPartOfBundle)
      .reduce(
        (total, item) =>
          total + item.price * item.quantity * (item.discountRate || 0),
        0
      );

    // Tổng tiền sau khi giảm giá
    const finalTotal = originalTotal - bundleDiscount;

    // Tổng số lượng sản phẩm đã chọn
    const totalItems = cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.quantity, 0);

    // Phí vận chuyển
    const shippingFee = totalItems > 0 ? 30000 : 0;

    return {
      originalTotal,
      bundleDiscount,
      finalTotal,
      totalItems,
      shippingFee,
      grandTotal: finalTotal + shippingFee,
    };
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

  // Xử lý thêm tất cả sản phẩm trong bundle vào giỏ hàng
  const handleAddBundle = (bundle: Bundle) => {
    // Chọn tất cả sản phẩm thuộc bundle
    setCartItems((prev) =>
      prev.map((item) =>
        bundle.requiredItems.includes(item.id)
          ? { ...item, isSelected: true }
          : item
      )
    );

    showNotification(`Đã áp dụng combo "${bundle.name}"`, "success");
  };

  // Xử lý checkout
  const handleCheckout = () => {
    if (cartSummary.totalItems === 0) {
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
          {/* Phần bundle đề xuất */}
          {bundles.length > 0 && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CardGiftcardIcon sx={{ mr: 1 }} /> Combo tiết kiệm
              </Typography>

              <Grid container spacing={2}>
                {bundles.map((bundle) => (
                  <Grid item xs={12} key={bundle.id}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderColor: activeBundles.includes(bundle.id)
                          ? "success.main"
                          : "grey.300",
                        bgcolor: activeBundles.includes(bundle.id)
                          ? "success.50"
                          : "white",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {bundle.thumbnailUrl && (
                              <Avatar src={bundle.thumbnailUrl} sx={{ mr: 2 }}>
                                <LocalOfferIcon />
                              </Avatar>
                            )}
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {bundle.name}
                                {activeBundles.includes(bundle.id) && (
                                  <Chip
                                    label="Đã áp dụng"
                                    color="success"
                                    size="small"
                                    sx={{ ml: 1 }}
                                  />
                                )}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {bundle.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="error"
                                fontWeight="bold"
                                sx={{ mt: 1 }}
                              >
                                Tiết kiệm {bundle.discountRate * 100}%
                              </Typography>
                            </Box>
                          </Box>

                          <Button
                            variant="contained"
                            color={
                              activeBundles.includes(bundle.id)
                                ? "success"
                                : "primary"
                            }
                            onClick={() => handleAddBundle(bundle)}
                            startIcon={<AddIcon />}
                            disabled={activeBundles.includes(bundle.id)}
                          >
                            {activeBundles.includes(bundle.id)
                              ? "Đã áp dụng"
                              : "Áp dụng ngay"}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}

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
                        <TableCell width="40%">Sản phẩm</TableCell>
                        <TableCell width="15%" align="right">
                          Đơn giá
                        </TableCell>
                        <TableCell width="15%" align="center">
                          Số lượng
                        </TableCell>
                        <TableCell width="20%" align="right">
                          Thành tiền
                        </TableCell>
                        <TableCell width="5%"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shopGroup.items.map((item) => (
                        <TableRow
                          key={item.id}
                          hover
                          sx={{
                            bgcolor: item.isPartOfBundle
                              ? "rgba(76, 175, 80, 0.04)"
                              : "inherit",
                            "&:hover": {
                              bgcolor: item.isPartOfBundle
                                ? "rgba(76, 175, 80, 0.08)"
                                : "rgba(0, 0, 0, 0.04)",
                            },
                          }}
                        >
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
                              <Box>
                                <Typography variant="body1">
                                  {item.name}
                                </Typography>
                                {item.isPartOfBundle && (
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ mt: 0.5 }}
                                  >
                                    <Chip
                                      icon={<LocalOfferIcon fontSize="small" />}
                                      label={`${item.bundleName} (-${item.discountRate && item.discountRate * 100}%)`}
                                      size="small"
                                      color="success"
                                    />
                                  </Stack>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {item.isPartOfBundle ? (
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ textDecoration: "line-through" }}
                                >
                                  {formatPrice(item.price)}
                                </Typography>
                                <Typography variant="body1" color="error">
                                  {formatPrice(
                                    item.price * (1 - (item.discountRate || 0))
                                  )}
                                </Typography>
                              </Box>
                            ) : (
                              formatPrice(item.price)
                            )}
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
                            {item.isPartOfBundle ? (
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ textDecoration: "line-through" }}
                                >
                                  {formatPrice(item.price * item.quantity)}
                                </Typography>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="error"
                                >
                                  {formatPrice(
                                    item.price *
                                      item.quantity *
                                      (1 - (item.discountRate || 0))
                                  )}
                                </Typography>
                              </Box>
                            ) : (
                              <Typography fontWeight="bold">
                                {formatPrice(item.price * item.quantity)}
                              </Typography>
                            )}
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
                  {formatPrice(cartSummary.originalTotal)}
                </Typography>
              </Box>

              {cartSummary.bundleDiscount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="success.main"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <LocalOfferIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Giảm giá combo:
                  </Typography>
                  <Typography variant="body1" color="success.main">
                    -{formatPrice(cartSummary.bundleDiscount)}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body1">Phí vận chuyển:</Typography>
                <Typography variant="body1">
                  {formatPrice(cartSummary.shippingFee)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Thành tiền:</Typography>
              <Typography variant="h6" color="error">
                {formatPrice(cartSummary.grandTotal)}
              </Typography>
            </Box>

            {cartSummary.bundleDiscount > 0 && (
              <Box
                sx={{
                  mb: 2,
                  p: 1.5,
                  bgcolor: "success.50",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InfoOutlinedIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="body2" color="success.dark">
                  Bạn đã tiết kiệm {formatPrice(cartSummary.bundleDiscount)} với
                  combo giảm giá!
                </Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={cartSummary.totalItems === 0}
              onClick={handleCheckout}
            >
              Thanh toán ({cartSummary.totalItems} sản phẩm)
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
