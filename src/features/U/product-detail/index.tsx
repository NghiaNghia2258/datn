import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Rating,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import CustomBreadcrumbs from "../../../components/common/bread-crumb";
import ProductDetailMainSection from "./main-section";
import { useProductDetail } from "../../../context/U/product-detail";
import { formatPrice } from "../../../utils/format-price";
import ReviewModal from "./review";
import ComboExample from "./test";

// Các sản phẩm tương tự
const relatedProducts = [
  {
    id: 1,
    name: "Áo thun nam cổ bẻ",
    price: 280000,
    image: "https://via.placeholder.com/300x300?text=Ao+Co+Be",
  },
  {
    id: 2,
    name: "Áo thun nam tay dài",
    price: 350000,
    image: "https://via.placeholder.com/300x300?text=Ao+Tay+Dai",
  },
  {
    id: 3,
    name: "Áo polo nam",
    price: 320000,
    image: "https://via.placeholder.com/300x300?text=Ao+Polo",
  },
  {
    id: 4,
    name: "Áo thun nam in hình",
    price: 270000,
    image: "https://via.placeholder.com/300x300?text=Ao+In+Hinh",
  },
];

const ProductDetailPage = () => {
  const { reviews, product, snackbarOpen, setSnackbarOpen, avgRV, totalRV } =
    useProductDetail();
  const [tabValue, setTabValue] = useState(0);

  const categories = ["Áo", "Áo polo"];
  const specifications = product.specifications;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <CustomBreadcrumbs
        categories={["Home", ...categories]}
        productName={product.name}
      />
      <ProductDetailMainSection />
      <ComboExample />
      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }} elevation={1}>
          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Chi tiết sản phẩm" id="tab-0" />
            <Tab label={`Đánh giá (${totalRV})`} id="tab-1" />
          </Tabs>

          {/* Chi tiết sản phẩm */}
          <Box
            role="tabpanel"
            hidden={tabValue !== 0}
            id="tabpanel-0"
            sx={{ p: 3 }}
          >
            {tabValue === 0 && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Thông số sản phẩm
                </Typography>
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ mb: 3 }}
                >
                  <Table>
                    <TableBody>
                      {specifications.map((attr, index) => (
                        <TableRow key={index}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ backgroundColor: "grey.100", width: "30%" }}
                          >
                            {attr.attributeName}
                          </TableCell>
                          <TableCell>{attr.attributeValue}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>

          {/* Đánh giá */}
          <Box
            role="tabpanel"
            hidden={tabValue !== 1}
            id="tabpanel-1"
            sx={{ p: 3 }}
          >
            {tabValue === 1 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Đánh giá từ khách hàng
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography
                        variant="h3"
                        sx={{ fontWeight: "bold", mr: 2 }}
                      >
                        {avgRV}
                      </Typography>
                      <Box>
                        <Rating value={avgRV} precision={0.1} readOnly />
                        <Typography variant="body2">
                          {totalRV} đánh giá
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <ReviewModal />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Review List */}
                {reviews.map((review) => (
                  <Box key={review.id} sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.user}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} size="small" readOnly />
                    <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                      {review.comment}
                    </Typography>
                    <Divider />
                  </Box>
                ))}
              </>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Related Products */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Sản phẩm tương tự
        </Typography>

        <Grid container spacing={2}>
          {relatedProducts.map((product) => (
            <Grid item xs={6} sm={3} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height={180}
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    noWrap
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {formatPrice(product.price)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recently Viewed */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Đã xem gần đây
        </Typography>

        <Grid container spacing={2}>
          {relatedProducts
            .slice(0, 4)
            .reverse()
            .map((product) => (
              <Grid item xs={6} sm={3} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height={180}
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      noWrap
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {formatPrice(product.price)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Đã thêm sản phẩm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetailPage;
