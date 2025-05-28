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
import StoreProductService from "../../../context/U/store-products/store-product.service";
import { useParams } from "react-router-dom";

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

// Hàm format tiền tệ (được tích hợp trong ProductCard)
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

function App() {
  const theme = useTheme();
  const { searchKey } = useParams();
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
    setLoading(true);

    const featchData = async () => {
      const res = await StoreProductService.GetProduct({
        pageSize: 10,
        pageIndex: 1,
        keyWord: searchKey,
      });
      if (res.isSucceeded) {
        setProducts(res.data as any);
      }
    };
    featchData();
    setLoading(false);
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
              Khám phá các sản phẩm hàng đầu với giá ưu đãi
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
