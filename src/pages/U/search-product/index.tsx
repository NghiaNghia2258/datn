// App.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Chip,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
  Tooltip,
  Backdrop,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
} from "@mui/material";

import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  LocalOffer as LocalOfferIcon,
  ContactSupport as ContactSupportIcon,
  FilterList as FilterListIcon,
  TrendingUp as TrendingUpIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  FavoriteBorder,
  Favorite,
} from "@mui/icons-material";

import { styled, alpha } from "@mui/material/styles";
import { ProductCard } from "../../../features/A/store-products/product-card";

// Định nghĩa styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

// Dữ liệu sản phẩm mẫu
const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    shortDescription:
      "Điện thoại Apple iPhone 15 Pro Max mới nhất với camera cải tiến và chip A17 Pro siêu mạnh",
    price: 33990000,
    originalPrice: 35990000,
    discount: 5,
    rating: 4.8,
    reviewCount: 124,
    images: ["https://via.placeholder.com/300x300?text=iPhone+15+Pro"],
    isNew: true,
    isBestSeller: true,
    category: "Điện thoại",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    shortDescription:
      "Smartphone cao cấp với bút S-Pen tích hợp, camera 200MP và chip Snapdragon 8 Gen 3",
    price: 29990000,
    originalPrice: 31990000,
    discount: 6,
    rating: 4.7,
    reviewCount: 89,
    images: ["https://via.placeholder.com/300x300?text=Samsung+S24"],
    isNew: true,
    isBestSeller: false,
    category: "Điện thoại",
  },
  {
    id: 3,
    name: "MacBook Pro 14 inch M3 Pro",
    shortDescription:
      "Laptop Apple với chip M3 Pro mới nhất, màn hình Liquid Retina XDR và hiệu năng đỉnh cao",
    price: 49990000,
    originalPrice: 52990000,
    discount: 5,
    rating: 4.9,
    reviewCount: 56,
    images: ["https://via.placeholder.com/300x300?text=MacBook+Pro"],
    isNew: true,
    isBestSeller: true,
    category: "Laptop",
  },
  {
    id: 4,
    name: "iPad Air 5 WiFi 64GB",
    shortDescription:
      "Máy tính bảng mỏng nhẹ với chip M1, màn hình Liquid Retina 10.9 inch",
    price: 15990000,
    originalPrice: 16990000,
    discount: 5,
    rating: 4.6,
    reviewCount: 73,
    images: ["https://via.placeholder.com/300x300?text=iPad+Air"],
    isNew: false,
    isBestSeller: true,
    category: "Máy tính bảng",
  },
  {
    id: 5,
    name: "Tai nghe Apple AirPods Pro 2",
    shortDescription:
      "Tai nghe không dây với khả năng chống ồn chủ động, âm thanh không gian và chip H2",
    price: 5990000,
    originalPrice: 6990000,
    discount: 14,
    rating: 4.7,
    reviewCount: 215,
    images: ["https://via.placeholder.com/300x300?text=AirPods+Pro"],
    isNew: false,
    isBestSeller: true,
    category: "Phụ kiện",
  },
  {
    id: 6,
    name: "Apple Watch Series 9 GPS 41mm",
    shortDescription:
      "Đồng hồ thông minh với màn hình Always-On, cảm biến sức khỏe và chip S9",
    price: 9990000,
    originalPrice: 10990000,
    discount: 9,
    rating: 4.5,
    reviewCount: 87,
    images: ["https://via.placeholder.com/300x300?text=Apple+Watch"],
    isNew: false,
    isBestSeller: false,
    category: "Đồng hồ thông minh",
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    shortDescription:
      "Tai nghe chụp tai không dây với khả năng chống ồn hàng đầu thị trường",
    price: 8490000,
    originalPrice: 9490000,
    discount: 10,
    rating: 4.8,
    reviewCount: 134,
    images: ["https://via.placeholder.com/300x300?text=Sony+WH-1000XM5"],
    isNew: false,
    isBestSeller: true,
    category: "Phụ kiện",
  },
  {
    id: 8,
    name: "Dell XPS 13 Plus",
    shortDescription:
      "Laptop cao cấp với thiết kế mỏng nhẹ, màn hình 3.5K OLED và bàn phím haptic",
    price: 39990000,
    originalPrice: 41990000,
    discount: 4,
    rating: 4.6,
    reviewCount: 42,
    images: ["https://via.placeholder.com/300x300?text=Dell+XPS"],
    isNew: true,
    isBestSeller: false,
    category: "Laptop",
  },
  {
    id: 9,
    name: "Samsung Galaxy Tab S9 Ultra",
    shortDescription:
      "Máy tính bảng với màn hình AMOLED 14.6 inch, Snapdragon 8 Gen 2 và bút S-Pen",
    price: 24990000,
    originalPrice: 26990000,
    discount: 7,
    rating: 4.5,
    reviewCount: 31,
    images: ["https://via.placeholder.com/300x300?text=Galaxy+Tab+S9"],
    isNew: true,
    isBestSeller: false,
    category: "Máy tính bảng",
  },
  {
    id: 10,
    name: "Xiaomi 14 Ultra",
    shortDescription:
      "Smartphone cao cấp với hệ thống camera Leica, Snapdragon 8 Gen 3 và sạc siêu nhanh",
    price: 21990000,
    originalPrice: 23990000,
    discount: 8,
    rating: 4.4,
    reviewCount: 27,
    images: ["https://via.placeholder.com/300x300?text=Xiaomi+14+Ultra"],
    isNew: true,
    isBestSeller: false,
    category: "Điện thoại",
  },
  {
    id: 11,
    name: "ASUS ROG Zephyrus G16",
    shortDescription:
      "Laptop gaming với GPU RTX 4070, CPU Intel Core i9 và màn hình 16 inch 240Hz",
    price: 52990000,
    originalPrice: 54990000,
    discount: 3,
    rating: 4.7,
    reviewCount: 19,
    images: ["https://via.placeholder.com/300x300?text=ROG+Zephyrus"],
    isNew: true,
    isBestSeller: false,
    category: "Laptop",
  },
  {
    id: 12,
    name: "Google Pixel 8 Pro",
    shortDescription:
      "Smartphone với camera đỉnh cao, chip Tensor G3 và 7 năm cập nhật Android",
    price: 23990000,
    originalPrice: 25990000,
    discount: 7,
    rating: 4.6,
    reviewCount: 53,
    images: ["https://via.placeholder.com/300x300?text=Pixel+8+Pro"],
    isNew: false,
    isBestSeller: false,
    category: "Điện thoại",
  },
];

// Hàm format tiền tệ (được tích hợp trong ProductCard)
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState({
    newOnly: false,
    onSale: false,
    bestSeller: false,
  });

  // Cart & Wishlist management
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination settings
  const productsPerPage = 8;

  // Simulate data fetching
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        (category === "all" || product.category === category) &&
        (product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(searchText.toLowerCase())) &&
        (!filters.newOnly || product.isNew) &&
        (!filters.onSale || product.discount > 0) &&
        (!filters.bestSeller || product.isBestSeller)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "discount":
          return b.discount - a.discount;
        case "newest":
        default:
          return b.id - a.id;
      }
    });

  // Pagination logic
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  // Handler functions
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFilterChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName],
    });
    setPage(1);
  };

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    setSnackbarMessage(`Đã thêm ${product.name} vào giỏ hàng`);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    const existingItem = wishlistItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItems = wishlistItems.filter(
        (item) => item.id !== product.id
      );
      setWishlistItems(updatedItems);
      setSnackbarMessage(`Đã xóa ${product.name} khỏi danh sách yêu thích`);
    } else {
      setWishlistItems([...wishlistItems, product]);
      setSnackbarMessage(`Đã thêm ${product.name} vào danh sách yêu thích`);
    }

    setSnackbarSeverity("info");
    setSnackbarOpen(true);
  };

  // Quick view functions
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setQuickViewOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box component="main" sx={{ flexGrow: 1, py: 8, px: { xs: 2, md: 3 } }}>
        <Toolbar />

        {/* Banner */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            backgroundImage:
              "linear-gradient(135deg, #13547a 0%, #80d0c7 100%)",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              Chào mừng đến TechStore
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              Khám phá các sản phẩm công nghệ hàng đầu với giá ưu đãi
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ mt: 2, fontWeight: "bold" }}
            >
              Xem ưu đãi
            </Button>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              width: "200px",
              height: "200px",
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            {/* Placeholder for banner image */}
          </Box>
        </Paper>

        {/* Filter and sort controls */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            mb: 3,
            gap: 2,
          }}
        >
          {/* Filter chips for desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Chip
              icon={<FilterListIcon />}
              label="Lọc"
              variant="outlined"
              sx={{ fontWeight: "bold" }}
            />
            <Chip
              label="Mới"
              color={filters.newOnly ? "primary" : "default"}
              onClick={() => handleFilterChange("newOnly")}
              clickable
            />
            <Chip
              label="Giảm giá"
              color={filters.onSale ? "error" : "default"}
              onClick={() => handleFilterChange("onSale")}
              clickable
            />
            <Chip
              label="Bán chạy"
              color={filters.bestSeller ? "warning" : "default"}
              onClick={() => handleFilterChange("bestSeller")}
              clickable
              icon={<TrendingUpIcon />}
            />
          </Box>

          {/* Filter chips for mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Chip
              label="Mới"
              size="small"
              color={filters.newOnly ? "primary" : "default"}
              onClick={() => handleFilterChange("newOnly")}
              clickable
            />
            <Chip
              label="Giảm giá"
              size="small"
              color={filters.onSale ? "error" : "default"}
              onClick={() => handleFilterChange("onSale")}
              clickable
            />
            <Chip
              label="Bán chạy"
              size="small"
              color={filters.bestSeller ? "warning" : "default"}
              onClick={() => handleFilterChange("bestSeller")}
              clickable
            />
          </Box>

          {/* Sort dropdown */}
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="sort-select-label">Sắp xếp</InputLabel>
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              label="Sắp xếp"
            >
              <MenuItem value="newest">Mới nhất</MenuItem>
              <MenuItem value="priceAsc">Giá tăng dần</MenuItem>
              <MenuItem value="priceDesc">Giá giảm dần</MenuItem>
              <MenuItem value="rating">Đánh giá cao</MenuItem>
              <MenuItem value="discount">Giảm giá nhiều</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Results count */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Hiển thị {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}{" "}
            - {Math.min(indexOfLastProduct, filteredProducts.length)}
            trong tổng {filteredProducts.length} sản phẩm
          </Typography>
        </Box>

        {/* Product Grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Box
                  sx={{
                    height: "100%",
                    position: "relative",
                    "&:hover .product-actions": {
                      opacity: 1,
                    },
                  }}
                >
                  <ProductCard {...product} formatPrice={formatPrice} />
                  <Box
                    className="product-actions"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                      borderRadius: 1,
                      zIndex: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Tooltip title="Xem nhanh">
                        <IconButton
                          onClick={() => openQuickView(product)}
                          sx={{
                            backgroundColor: "white",
                            "&:hover": {
                              backgroundColor: "white",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Thêm vào giỏ">
                        <IconButton
                          onClick={() => addToCart(product)}
                          sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "primary.dark",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <ShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          wishlistItems.find((item) => item.id === product.id)
                            ? "Xóa khỏi yêu thích"
                            : "Thêm vào yêu thích"
                        }
                      >
                        <IconButton
                          onClick={() => toggleWishlist(product)}
                          sx={{
                            backgroundColor: wishlistItems.find(
                              (item) => item.id === product.id
                            )
                              ? "error.main"
                              : "white",
                            color: wishlistItems.find(
                              (item) => item.id === product.id
                            )
                              ? "white"
                              : "inherit",
                            "&:hover": {
                              backgroundColor: wishlistItems.find(
                                (item) => item.id === product.id
                              )
                                ? "error.dark"
                                : "white",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          {wishlistItems.find(
                            (item) => item.id === product.id
                          ) ? (
                            <Favorite />
                          ) : (
                            <FavoriteBorder />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 5, textAlign: "center" }}>
            <Typography variant="h6">Không tìm thấy sản phẩm nào.</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Vui lòng thử lại với bộ lọc khác.
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        )}
      </Box>

      {/* Quick View Dialog */}
      <Dialog
        open={quickViewOpen}
        onClose={closeQuickView}
        fullWidth
        maxWidth="md"
        TransitionComponent={Zoom}
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {selectedProduct.name}
                </Typography>
                <IconButton onClick={closeQuickView}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      maxHeight: 400,
                      objectFit: "contain",
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      p: 2,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Typography variant="subtitle1" color="text.secondary">
                      {selectedProduct.category}
                    </Typography>

                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      {selectedProduct.name}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                      <Rating
                        value={selectedProduct.rating}
                        precision={0.1}
                        readOnly
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        ({selectedProduct.reviewCount} đánh giá)
                      </Typography>
                    </Box>

                    <Box
                      sx={{ display: "flex", alignItems: "baseline", mt: 1 }}
                    >
                      <Typography
                        variant="h4"
                        color="primary.main"
                        sx={{ fontWeight: "bold" }}
                      >
                        {formatPrice(selectedProduct.price)}
                      </Typography>

                      {selectedProduct.discount > 0 && (
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          sx={{ ml: 2, textDecoration: "line-through" }}
                        >
                          {formatPrice(selectedProduct.originalPrice)}
                        </Typography>
                      )}
                    </Box>

                    <Typography variant="body1" sx={{ my: 3 }}>
                      {selectedProduct.shortDescription}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => {
                          addToCart(selectedProduct);
                          closeQuickView();
                        }}
                      >
                        Thêm vào giỏ
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={() => toggleWishlist(selectedProduct)}
                        startIcon={
                          wishlistItems.find(
                            (item) => item.id === selectedProduct.id
                          ) ? (
                            <Favorite color="error" />
                          ) : (
                            <FavoriteBorder />
                          )
                        }
                      >
                        {wishlistItems.find(
                          (item) => item.id === selectedProduct.id
                        )
                          ? "Đã thích"
                          : "Yêu thích"}
                      </Button>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Mã sản phẩm: SK-
                        {selectedProduct.id.toString().padStart(4, "0")}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Tình trạng:{" "}
                        <Chip label="Còn hàng" color="success" size="small" />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeQuickView}>Đóng</Button>
              <Button
                variant="contained"
                onClick={() => {
                  addToCart(selectedProduct);
                  closeQuickView();
                }}
              >
                Thêm vào giỏ
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
