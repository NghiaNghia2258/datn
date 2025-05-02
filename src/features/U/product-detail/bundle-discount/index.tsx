import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Divider,
  Chip,
  Grid,
  Rating,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  CircularProgress,
  Tooltip,
  Alert,
} from "@mui/material";
import {
  ShoppingCart,
  LocalOffer,
  ArrowForward,
  Favorite,
  FavoriteBorder,
  Settings,
  CheckCircle,
  Close,
} from "@mui/icons-material";
import { FC, useState, useEffect } from "react";
import { formatPrice } from "../../../../utils/format-price";

// Định nghĩa kiểu dữ liệu cho variant
interface ProductVariant {
  id: string;
  propertyValue1: string;
  propertyValue2: string;
  price: number;
  stock: number;
  isActivate: boolean;
  image: string;
}

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface ComboProduct {
  id: string;
  name: string;
  price: number;
  description?: string;
  images: string[];
  rating: number;
  reviewCount: number;
  propertyName1: string;
  propertyName2: string;
  propertyValue1: string[];
  propertyValue2: string[];
  productVariants: ProductVariant[];
  selectedVariant?: ProductVariant;
}

// Định nghĩa kiểu dữ liệu cho combo
interface ProductComboProps {
  id: string;
  name: string;
  description: string;
  discount: number;
  products: ComboProduct[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isLimited?: boolean;
}

// Component popup chọn variant
interface VariantSelectorDialogProps {
  open: boolean;
  onClose: () => void;
  product: ComboProduct;
  onVariantSelect: (productId: string, variant: ProductVariant) => void;
}

const VariantSelectorDialog: FC<VariantSelectorDialogProps> = ({
  open,
  onClose,
  product,
  onVariantSelect,
}) => {
  const [selectedValue1, setSelectedValue1] = useState<string | null>(null);
  const [selectedValue2, setSelectedValue2] = useState<string | null>(null);
  const [currentVariant, setCurrentVariant] = useState<ProductVariant | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Khởi tạo giá trị từ variant đã chọn (nếu có)
  useEffect(() => {
    if (product.selectedVariant) {
      setSelectedValue1(product.selectedVariant.propertyValue1);
      setSelectedValue2(product.selectedVariant.propertyValue2);
      setCurrentVariant(product.selectedVariant);
    } else if (product.productVariants.length > 0) {
      // Mặc định chọn variant đầu tiên có sẵn
      const defaultVariant =
        product.productVariants.find((v) => v.isActivate && v.stock > 0) ||
        product.productVariants[0];
      setSelectedValue1(defaultVariant.propertyValue1);
      setSelectedValue2(defaultVariant.propertyValue2);
      setCurrentVariant(defaultVariant);
    }
  }, [product]);

  // Tìm variant hiện tại dựa trên các giá trị đã chọn
  useEffect(() => {
    if (selectedValue1 && selectedValue2) {
      const variant = product.productVariants.find(
        (v) =>
          v.propertyValue1 === selectedValue1 &&
          v.propertyValue2 === selectedValue2
      );
      setCurrentVariant(variant || null);
    }
  }, [selectedValue1, selectedValue2, product.productVariants]);

  // Xử lý xác nhận lựa chọn
  const handleConfirm = () => {
    if (currentVariant) {
      setLoading(true);
      // Giả lập thời gian xử lý
      setTimeout(() => {
        onVariantSelect(product.id, currentVariant);
        setLoading(false);
        onClose();
      }, 500);
    }
  };

  // Lấy tất cả các variant có sẵn với propertyValue1 đã chọn
  const getAvailableValue2Options = () => {
    if (!selectedValue1) return [];
    return product.productVariants
      .filter((v) => v.propertyValue1 === selectedValue1 && v.isActivate)
      .map((v) => v.propertyValue2);
  };

  // Lấy trạng thái của variant (có sẵn, hết hàng)
  const getVariantStatus = (value1: string, value2: string) => {
    const variant = product.productVariants.find(
      (v) => v.propertyValue1 === value1 && v.propertyValue2 === value2
    );

    if (!variant) return "unavailable";
    if (!variant.isActivate) return "inactive";
    if (variant.stock <= 0) return "outOfStock";
    return "available";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Chọn phiên bản cho {product.name}</Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Phần hình ảnh sản phẩm */}
          <Grid item xs={4}>
            <Box
              component="img"
              src={currentVariant?.image || product.images[0]}
              alt={product.name}
              sx={{
                width: "280px",
                height: "280px",
                objectFit: "contain",
                bgcolor: "#f5f5f5",
                borderRadius: 1,
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Rating
                value={product.rating}
                precision={0.1}
                size="small"
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviewCount})
              </Typography>
            </Box>
          </Grid>

          {/* Phần lựa chọn variant */}
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>

            {product.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {product.description}
              </Typography>
            )}

            {/* Lựa chọn thuộc tính 1 */}
            <Box sx={{ mb: 3, mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {product.propertyName1}:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {product.propertyValue1.map((value) => {
                  // Kiểm tra xem có bất kỳ variant nào với value1 này có sẵn không
                  const hasAvailableVariant = product.productVariants.some(
                    (v) =>
                      v.propertyValue1 === value && v.isActivate && v.stock > 0
                  );

                  return (
                    <Chip
                      key={value}
                      label={value}
                      onClick={() => setSelectedValue1(value)}
                      color={selectedValue1 === value ? "primary" : "default"}
                      variant={selectedValue1 === value ? "filled" : "outlined"}
                      sx={{ mb: 1 }}
                      disabled={!hasAvailableVariant}
                    />
                  );
                })}
              </Stack>
            </Box>

            {/* Lựa chọn thuộc tính 2 */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                {product.propertyName2}:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {selectedValue1 &&
                  product.propertyValue2.map((value) => {
                    const status = getVariantStatus(selectedValue1, value);
                    const disabled = status !== "available";

                    return (
                      <Tooltip
                        key={value}
                        title={
                          status === "outOfStock"
                            ? "Hết hàng"
                            : status === "inactive"
                              ? "Không khả dụng"
                              : ""
                        }
                      >
                        <span>
                          <Chip
                            label={value}
                            onClick={() => setSelectedValue2(value)}
                            color={
                              selectedValue2 === value ? "primary" : "default"
                            }
                            variant={
                              selectedValue2 === value ? "filled" : "outlined"
                            }
                            sx={{ mb: 1 }}
                            disabled={disabled}
                          />
                        </span>
                      </Tooltip>
                    );
                  })}
              </Stack>
            </Box>

            {/* Thông tin variant đã chọn */}
            {currentVariant ? (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="h6"
                  color="primary.main"
                  sx={{ fontWeight: "bold" }}
                >
                  {formatPrice(currentVariant.price)}
                </Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Kho hàng:{" "}
                  {currentVariant.stock > 0
                    ? `Còn ${currentVariant.stock} sản phẩm`
                    : "Hết hàng"}
                </Typography>

                {!currentVariant.isActivate && (
                  <Alert severity="warning" sx={{ mt: 2 }}>
                    Phiên bản này hiện không khả dụng
                  </Alert>
                )}

                {currentVariant.stock <= 0 && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Phiên bản này đã hết hàng
                  </Alert>
                )}
              </Box>
            ) : selectedValue1 && selectedValue2 ? (
              <Alert severity="info" sx={{ mt: 2 }}>
                Không tìm thấy phiên bản phù hợp với lựa chọn
              </Alert>
            ) : null}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Hủy
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <CheckCircle />
            )
          }
          disabled={
            !currentVariant ||
            !currentVariant.isActivate ||
            currentVariant.stock <= 0 ||
            loading
          }
        >
          {loading ? "Đang xử lý..." : "Xác nhận lựa chọn"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const ProductComboCardWithVariants: FC<ProductComboProps> = ({
  id,
  name,
  description,
  discount,
  products,
  isNew = false,
  isBestSeller = false,
  isLimited = false,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [comboProducts, setComboProducts] = useState<ComboProduct[]>(products);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
  };

  // Mở dialog chọn variant
  const handleOpenVariantDialog = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setActiveDialog(productId);
  };

  // Đóng dialog
  const handleCloseVariantDialog = () => {
    setActiveDialog(null);
  };

  // Xử lý khi chọn variant
  const handleVariantSelect = (productId: string, variant: ProductVariant) => {
    const updatedProducts = comboProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          selectedVariant: variant,
        };
      }
      return product;
    });

    setComboProducts(updatedProducts);
  };

  // Tính giá combo dựa trên các variant đã chọn
  const calculatePrices = () => {
    let totalOriginalPrice = 0;

    comboProducts.forEach((product) => {
      if (product.selectedVariant) {
        totalOriginalPrice += product.selectedVariant.price;
      } else {
        // Nếu chưa chọn variant, sử dụng giá mặc định của sản phẩm
        totalOriginalPrice += product.price;
      }
    });

    const totalDiscountedPrice = totalOriginalPrice * (1 - discount / 100);
    const totalSaving = totalOriginalPrice - totalDiscountedPrice;

    return {
      totalOriginalPrice,
      totalDiscountedPrice,
      totalSaving,
    };
  };

  const prices = calculatePrices();

  // Kiểm tra xem có thể mua combo không (tất cả các variant đã chọn phải có sẵn)
  const canPurchaseCombo = () => {
    return comboProducts.every(
      (product) =>
        !product.selectedVariant ||
        (product.selectedVariant.isActivate &&
          product.selectedVariant.stock > 0)
    );
  };

  // Xử lý khi click vào nút mua combo
  const handleBuyCombo = () => {
    // Thêm logic thêm vào giỏ hàng ở đây
    console.log(
      "Mua combo với các sản phẩm:",
      comboProducts.map((cb) => cb.selectedVariant)
    );
  };

  // Hiển thị thông tin variant đã chọn
  const renderSelectedVariantInfo = (product: ComboProduct) => {
    if (!product.selectedVariant) return null;

    return (
      <Typography
        variant="caption"
        sx={{ display: "block", mt: 0.5, color: "text.secondary" }}
      >
        {`${product.propertyName1}: ${product.selectedVariant.propertyValue1} / ${product.propertyName2}: ${product.selectedVariant.propertyValue2}`}
      </Typography>
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.3s, box-shadow 0.3s",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
      onClick={() => {}}
    >
      {/* Các badge */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
          display: "flex",
          gap: 1,
        }}
      >
        <Chip
          label={`-${discount}%`}
          color="error"
          size="small"
          sx={{ fontWeight: "bold" }}
        />
        {isNew && (
          <Chip
            label="Mới"
            color="primary"
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        )}
        {isLimited && (
          <Chip
            label="Giới hạn"
            color="warning"
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        )}
      </Box>

      {/* Nút yêu thích */}
      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          backgroundColor: "white",
          "&:hover": { backgroundColor: "white" },
          zIndex: 2,
        }}
        onClick={handleFavoriteClick}
      >
        {favorite ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      {/* Badge bán chạy */}
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

      {/* Nội dung chính */}
      <CardContent sx={{ p: 2 }}>
        {/* Tiêu đề combo */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            <LocalOffer color="primary" sx={{ mr: 1 }} />
            {name}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        </Box>

        {/* Hiển thị sản phẩm */}
        <Grid container spacing={2}>
          {/* Danh sách sản phẩm */}
          <Grid item xs={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {comboProducts.map((product, index) => (
                <Box
                  key={product.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 150,
                      position: "relative",
                    }}
                  >
                    {/* Nút chọn variant */}
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        bgcolor: "background.paper",
                        boxShadow: 1,
                        "&:hover": {
                          bgcolor: "primary.light",
                          color: "white",
                        },
                      }}
                      onClick={(e) => handleOpenVariantDialog(e, product.id)}
                    >
                      <Settings fontSize="small" />
                    </IconButton>

                    {/* Hiển thị trạng thái đã chọn variant */}
                    {product.selectedVariant && (
                      <Badge
                        color="primary"
                        badgeContent={<CheckCircle fontSize="small" />}
                        sx={{
                          position: "absolute",
                          top: 5,
                          left: 5,
                          ".MuiBadge-badge": {
                            bgcolor: "primary.main",
                            color: "white",
                          },
                        }}
                      />
                    )}

                    <Box
                      component="img"
                      src={product.selectedVariant?.image || product.images[0]}
                      alt={product.name}
                      sx={{
                        height: 100,
                        width: 120,
                        objectFit: "contain",
                        mb: 1,
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "medium",
                        textAlign: "center",
                        height: "2.4em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.name}
                    </Typography>

                    {/* Hiển thị thông tin variant đã chọn */}
                    {renderSelectedVariantInfo(product)}

                    <Box
                      sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                    >
                      <Rating
                        value={product.rating}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 0.5 }}
                      >
                        ({product.reviewCount})
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color={
                        product.selectedVariant
                          ? "primary.main"
                          : "text.secondary"
                      }
                      sx={{
                        mt: 0.5,
                        fontWeight: product.selectedVariant ? "bold" : "normal",
                      }}
                    >
                      {formatPrice(
                        product.selectedVariant?.price || product.price
                      )}
                    </Typography>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1, fontSize: "0.7rem" }}
                      onClick={(e) => handleOpenVariantDialog(e, product.id)}
                    >
                      {product.selectedVariant ? "Thay đổi" : "Chọn phiên bản"}
                    </Button>
                  </Paper>

                  {index < comboProducts.length - 1 && (
                    <ArrowForward sx={{ mx: 1, color: "primary.main" }} />
                  )}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Thông tin giá và nút mua */}
          <Grid item xs={4}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderLeft: "1px dashed rgba(0,0,0,0.12)",
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Giá gốc:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  {formatPrice(prices.totalOriginalPrice)}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body2" color="primary">
                  Tiết kiệm:
                </Typography>
                <Typography
                  variant="body1"
                  color="error.main"
                  sx={{ fontWeight: "bold" }}
                >
                  {formatPrice(prices.totalSaving)} ({discount}%)
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="body2" color="primary">
                  Giá combo:
                </Typography>
                <Typography
                  variant="h6"
                  color="primary.main"
                  sx={{ fontWeight: "bold" }}
                >
                  {formatPrice(prices.totalDiscountedPrice)}
                </Typography>

                {/* Hiển thị thông báo nếu cần chọn variant */}
                {!comboProducts.every((p) => p.selectedVariant) && (
                  <Alert severity="info" sx={{ mt: 2, fontSize: "0.8rem" }}>
                    Vui lòng chọn phiên bản cho tất cả sản phẩm
                  </Alert>
                )}
              </Box>

              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCart />}
                sx={{
                  mt: 2,
                  borderRadius: "4px",
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBuyCombo();
                }}
                disabled={
                  !canPurchaseCombo() ||
                  !comboProducts.every((p) => p.selectedVariant)
                }
              >
                Mua combo
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>

      {/* Dialog chọn variant */}
      {comboProducts.map((product) => (
        <VariantSelectorDialog
          key={product.id}
          open={activeDialog === product.id}
          onClose={handleCloseVariantDialog}
          product={product}
          onVariantSelect={handleVariantSelect}
        />
      ))}
    </Card>
  );
};
