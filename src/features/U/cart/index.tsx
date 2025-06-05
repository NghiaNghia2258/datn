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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CartPreview from "./preview";
import { formatPrice } from "../../../utils/format-price";
import { CartItem } from "../../../context/U/cart/cart.response";
import CartService from "../../../context/U/cart/cart.service";
import { useNavigateCommon } from "../../../hooks/navigate";
import { USER_URLS } from "../../../routes/AppRoutes";
import VoucherService from "../../../services/voucher.service";

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

// Interface cho Voucher
interface Voucher {
  voucherCode: string;
  title: string;
  description: string | null;
  discountPercent: number | null;
  discountValue: number | null;
  maxDiscountValue: number | null;
  minOrderValue: number;
  usedCount: number | null;
  usageLimit: number;
  startDate: string;
  expirationDate: string;
  storeId: string;
  store: any;
  orders: any[];
  id: string;
  version: number;
}

// Interface cho Applied Voucher (voucher đã áp dụng)
interface AppliedVoucher {
  shopId: string;
  voucher: Voucher;
  discountAmount: number;
}
// Service cho Voucher
const VoucherService2 = {
  validateVoucher: async (
    voucherCode: string,
    storeId: string,
    orderValue: number
  ): Promise<{ isValid: boolean; voucher?: Voucher; error?: string }> => {
    try {
      const mockVoucher: Voucher =
        await VoucherService.validateVoucher(voucherCode);
      if (mockVoucher.voucherCode !== voucherCode) {
        return {
          isValid: false,
          error: "Voucher không tồn tại",
        };
      }
      if (mockVoucher.storeId !== storeId) {
        return {
          isValid: false,
          error: "Voucher không áp dụng cho cửa hàng này",
        };
      }

      if (orderValue < mockVoucher.minOrderValue) {
        return {
          isValid: false,
          error: `Đơn hàng tối thiểu ${formatPrice(mockVoucher.minOrderValue)}`,
        };
      }

      const now = new Date();
      const startDate = new Date(mockVoucher.startDate);
      const expirationDate = new Date(mockVoucher.expirationDate);

      if (now < startDate) {
        return { isValid: false, error: "Voucher chưa có hiệu lực" };
      }

      if (now > expirationDate) {
        return { isValid: false, error: "Voucher đã hết hạn" };
      }

      return { isValid: true, voucher: mockVoucher };
    } catch (error) {
      return { isValid: false, error: "Có lỗi xảy ra khi kiểm tra voucher" };
    }
  },
};

const ShoppingCart: React.FC = () => {
  const navigate = useNavigateCommon();

  const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
  const [appliedVouchers, setAppliedVouchers] = useState<AppliedVoucher[]>([]);
  const [voucherInputs, setVoucherInputs] = useState<{
    [shopId: string]: string;
  }>({}); // Input voucher cho mỗi shop
  const [voucherLoading, setVoucherLoading] = useState<{
    [shopId: string]: boolean;
  }>({}); // Loading state cho việc validate voucher
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

  // Tính tổng tiền cho mỗi cửa hàng
  const shopTotals = React.useMemo(() => {
    const totals: {
      [shopId: string]: {
        originalTotal: number;
        bundleDiscount: number;
        voucherDiscount: number;
        finalTotal: number;
      };
    } = {};

    shopGroups.forEach((shopGroup) => {
      const selectedItems = shopGroup.items.filter((item) => item.isSelected);
      const originalTotal = selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const bundleDiscount = selectedItems
        .filter((item) => item.isPartOfBundle)
        .reduce(
          (total, item) =>
            total + item.price * item.quantity * (item.discountRate || 0),
          0
        );

      // Tính giảm giá voucher
      const appliedVoucher = appliedVouchers.find(
        (v) => v.shopId === shopGroup.shopId
      );
      let voucherDiscount = 0;
      if (appliedVoucher) {
        voucherDiscount = appliedVoucher.discountAmount;
      }

      const finalTotal = Math.max(
        0,
        originalTotal - bundleDiscount - voucherDiscount
      );

      totals[shopGroup.shopId] = {
        originalTotal,
        bundleDiscount,
        voucherDiscount,
        finalTotal,
      };
    });

    return totals;
  }, [shopGroups, appliedVouchers]);

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

    // Tổng số tiền giảm giá từ vouchers
    const voucherDiscount = appliedVouchers.reduce(
      (total, applied) => total + applied.discountAmount,
      0
    );

    // Tổng tiền sau khi giảm giá
    const finalTotal = Math.max(
      0,
      originalTotal - bundleDiscount - voucherDiscount
    );

    // Tổng số lượng sản phẩm đã chọn
    const totalItems = cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.quantity, 0);

    // Phí vận chuyển
    const shippingFee = totalItems > 0 ? 0 : 0;

    return {
      originalTotal,
      bundleDiscount,
      voucherDiscount,
      finalTotal,
      totalItems,
      shippingFee,
      grandTotal: finalTotal + shippingFee,
    };
  }, [cartItems, appliedVouchers]);

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

  // Tính toán số tiền giảm giá từ voucher
  const calculateVoucherDiscount = (
    voucher: Voucher,
    orderValue: number
  ): number => {
    let discount = 0;

    if (voucher.discountPercent) {
      discount = (orderValue * voucher.discountPercent) / 100;
      if (voucher.maxDiscountValue) {
        discount = Math.min(discount, voucher.maxDiscountValue);
      }
    } else if (voucher.discountValue) {
      discount = voucher.discountValue;
    }

    return Math.min(discount, orderValue);
  };

  // Xử lý áp dụng voucher
  const handleApplyVoucher = async (shopId: string) => {
    const voucherCode = voucherInputs[shopId]?.trim();
    if (!voucherCode) {
      showNotification("Vui lòng nhập mã voucher", "error");
      return;
    }

    // Kiểm tra xem voucher đã được áp dụng chưa
    if (appliedVouchers.some((v) => v.shopId === shopId)) {
      showNotification("Cửa hàng này đã áp dụng voucher", "error");
      return;
    }

    setVoucherLoading((prev) => ({ ...prev, [shopId]: true }));

    try {
      const shopTotal = shopTotals[shopId];
      const orderValue = shopTotal
        ? shopTotal.originalTotal - shopTotal.bundleDiscount
        : 0;

      const result = await VoucherService2.validateVoucher(
        voucherCode,
        shopId,
        orderValue
      );

      if (result.isValid && result.voucher) {
        const discountAmount = calculateVoucherDiscount(
          result.voucher,
          orderValue
        );

        setAppliedVouchers((prev) => [
          ...prev,
          {
            shopId,
            voucher: result.voucher!,
            discountAmount,
          },
        ]);

        showNotification(
          `Áp dụng voucher thành công! Giảm ${formatPrice(discountAmount)}`,
          "success"
        );
      } else {
        showNotification(result.error || "Voucher không hợp lệ", "error");
      }
    } catch (error) {
      showNotification("Có lỗi xảy ra khi áp dụng voucher", "error");
    } finally {
      setVoucherLoading((prev) => ({ ...prev, [shopId]: false }));
    }
  };

  // Xử lý xóa voucher
  const handleRemoveVoucher = (shopId: string) => {
    setAppliedVouchers((prev) => prev.filter((v) => v.shopId !== shopId));
    setVoucherInputs((prev) => ({ ...prev, [shopId]: "" }));
    showNotification("Đã xóa voucher", "info");
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
    localStorage.setItem("appliedVouchers", JSON.stringify(appliedVouchers));
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("home")}
          >
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

            {shopGroups.map((shopGroup) => {
              const appliedVoucher = appliedVouchers.find(
                (v) => v.shopId === shopGroup.shopId
              );
              const shopTotal = shopTotals[shopGroup.shopId];

              return (
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
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <CardMedia
                                  component="img"
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    marginRight: 2,
                                    objectFit: "contain",
                                  }}
                                  image={
                                    item.imageUrl ||
                                    "https://placehold.co/80x80"
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
                                        icon={
                                          <LocalOfferIcon fontSize="small" />
                                        }
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
                                      item.price *
                                        (1 - (item.discountRate || 0))
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
                                    style: {
                                      textAlign: "center",
                                      width: "40px",
                                    },
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

                  {/* Section Voucher cho mỗi cửa hàng */}
                  <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{ p: 2, bgcolor: "grey.50" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CardGiftcardIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Mã giảm giá của cửa hàng
                      </Typography>
                    </Box>

                    {appliedVoucher ? (
                      // Hiển thị voucher đã áp dụng
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          p: 2,
                          bgcolor: "success.50",
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "success.200",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                          <Box>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              color="success.dark"
                            >
                              {appliedVoucher.voucher.voucherCode} -{" "}
                              {appliedVoucher.voucher.title}
                            </Typography>
                            <Typography variant="body2" color="success.dark">
                              Giảm {formatPrice(appliedVoucher.discountAmount)}
                            </Typography>
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveVoucher(shopGroup.shopId)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ) : (
                      // Form nhập voucher
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "flex-start",
                        }}
                      >
                        <TextField
                          size="small"
                          placeholder="Nhập mã voucher"
                          value={voucherInputs[shopGroup.shopId] || ""}
                          onChange={(e) =>
                            setVoucherInputs((prev) => ({
                              ...prev,
                              [shopGroup.shopId]: e.target.value,
                            }))
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleApplyVoucher(shopGroup.shopId);
                            }
                          }}
                          sx={{ flexGrow: 1 }}
                          disabled={voucherLoading[shopGroup.shopId]}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleApplyVoucher(shopGroup.shopId)}
                          disabled={
                            voucherLoading[shopGroup.shopId] ||
                            !voucherInputs[shopGroup.shopId]?.trim()
                          }
                          sx={{ minWidth: "80px" }}
                        >
                          {voucherLoading[shopGroup.shopId] ? "..." : "Áp dụng"}
                        </Button>
                      </Box>
                    )}

                    {/* Hiển thị tổng tiền của cửa hàng nếu có voucher */}
                    {appliedVoucher && shopTotal && (
                      <Box
                        sx={{
                          mt: 2,
                          pt: 2,
                          borderTop: "1px solid",
                          borderColor: "grey.300",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="body2">
                              Tổng tiền hàng:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "right" }}>
                            <Typography variant="body2">
                              {formatPrice(shopTotal.originalTotal)}
                            </Typography>
                          </Grid>

                          {shopTotal.bundleDiscount > 0 && (
                            <>
                              <Grid item xs={6}>
                                <Typography
                                  variant="body2"
                                  color="success.main"
                                >
                                  Giảm giá combo:
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sx={{ textAlign: "right" }}>
                                <Typography
                                  variant="body2"
                                  color="success.main"
                                >
                                  -{formatPrice(shopTotal.bundleDiscount)}
                                </Typography>
                              </Grid>
                            </>
                          )}

                          <Grid item xs={6}>
                            <Typography variant="body2" color="primary">
                              Giảm giá voucher:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "right" }}>
                            <Typography variant="body2" color="primary">
                              -{formatPrice(shopTotal.voucherDiscount)}
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              Thành tiền:
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ textAlign: "right" }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="bold"
                              color="error"
                            >
                              {formatPrice(shopTotal.finalTotal)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Paper>
                </Box>
              );
            })}
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

              {cartSummary.voucherDiscount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CardGiftcardIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Giảm giá voucher:
                  </Typography>
                  <Typography variant="body1" color="primary">
                    -{formatPrice(cartSummary.voucherDiscount)}
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

            {/* Hiển thị tổng tiết kiệm */}
            {(cartSummary.bundleDiscount > 0 ||
              cartSummary.voucherDiscount > 0) && (
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
                  Bạn đã tiết kiệm{" "}
                  {formatPrice(
                    cartSummary.bundleDiscount + cartSummary.voucherDiscount
                  )}
                  {cartSummary.bundleDiscount > 0 &&
                  cartSummary.voucherDiscount > 0
                    ? " với combo và voucher!"
                    : cartSummary.bundleDiscount > 0
                      ? " với combo giảm giá!"
                      : " với voucher!"}
                </Typography>
              </Box>
            )}

            {/* Hiển thị danh sách voucher đã áp dụng */}
            {appliedVouchers.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Voucher đã áp dụng:
                </Typography>
                {appliedVouchers.map((applied) => {
                  const shop = shopGroups.find(
                    (s) => s.shopId === applied.shopId
                  );
                  return (
                    <Box
                      key={applied.shopId}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 1,
                        mb: 1,
                        bgcolor: "grey.50",
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "grey.200",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {applied.voucher.voucherCode}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {shop?.shopName}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="primary"
                        fontWeight="bold"
                      >
                        -{formatPrice(applied.discountAmount)}
                      </Typography>
                    </Box>
                  );
                })}
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
