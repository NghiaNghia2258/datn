import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Breadcrumbs,
  Rating,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link as MuiLink,
  Card,
  CardMedia,
  CardContent,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  AccessTime,
  Payment,
  ArrowBack,
  ArrowForward,
  Add,
  Remove,
  CheckCircle,
  NavigateBefore,
  NavigateNext,
  PhotoCamera,
  StarBorder,
} from "@mui/icons-material";
import CustomBreadcrumbs from "../../../components/common/bread-crumb";
import ProductDetailMainSection from "./main-section";

const productData = {
  name: "Áo thun nam cổ tròn",
  categoryId: "cat123",
  price: 250000,
  tax: 8,
  description:
    "Áo thun nam cổ tròn chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt",
  isIncludeTax: false,
  isPhysicalProduct: true,
  weight: 0.25,
  cost: 150000,
  profit: 100000,
  margin: 40,
  unitWeight: "kg",
  propertyName1: "Màu sắc",
  propertyName2: "Kích cỡ",
  propertyValue1: ["Trắng", "Đen"],
  propertyValue2: ["S", "M"],
  productVariants: [
    {
      propertyValue1: "Trắng",
      propertyValue2: "S",
      price: 250000,
      stock: 50,
      isActivate: false,
      image: null,
    },
    {
      propertyValue1: "Trắng",
      propertyValue2: "M",
      price: 250000,
      stock: 45,
      isActivate: true,
      image: null,
    },
    {
      propertyValue1: "Đen",
      propertyValue2: "M",
      price: 270000,
      stock: 30,
      isActivate: false,
      image: null,
    },
    {
      propertyValue1: "Đen",
      propertyValue2: "S",
      price: 270000,
      stock: 25,
      isActivate: true,
      image:
        "https://th.bing.com/th/id/OIP.CYkVrrAB4OlRYovO26ZwMwHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ],
  removedUrls: ["https://example.com/img/old-product-1.jpg"],
  existingUrls: [
    "https://example.com/img/product-front.jpg",
    "https://example.com/img/product-back.jpg",
  ],
  fileUpload: null,
};

// Tạo địa chỉ URL hình ảnh mẫu để hiển thị
const sampleImages = [
  "https://via.placeholder.com/600x800?text=Ao+Thun+Trang+S",
  "https://via.placeholder.com/600x800?text=Ao+Thun+Trang+M",
  "https://via.placeholder.com/600x800?text=Ao+Thun+Den+S",
  "https://via.placeholder.com/600x800?text=Ao+Thun+Den+M",
  "https://via.placeholder.com/600x800?text=Chi+Tiet+1",
  "https://via.placeholder.com/600x800?text=Chi+Tiet+2",
];

// Dữ liệu đánh giá mẫu
const reviews = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "Chất lượng sản phẩm tuyệt vời, đúng như mô tả.",
    date: "10/04/2025",
  },
  {
    id: 2,
    user: "Trần Thị B",
    rating: 4,
    comment: "Áo đẹp, vải thoáng mát nhưng hơi rộng so với size.",
    date: "05/04/2025",
  },
  {
    id: 3,
    user: "Lê Văn C",
    rating: 5,
    comment: "Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ shop lần sau.",
    date: "01/04/2025",
  },
];

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const categories = ["Áo", "Áo polo"];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <CustomBreadcrumbs
        categories={["Home", ...categories]}
        productName={productData.name}
      />
      <ProductDetailMainSection />
      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Paper sx={{ borderRadius: 2, overflow: "hidden" }} elevation={1}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Chi tiết sản phẩm" id="tab-0" />
            <Tab label="Đánh giá (25)" id="tab-1" />
            <Tab label="Hướng dẫn chọn size" id="tab-2" />
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
                <Typography variant="h6" gutterBottom>
                  Thông tin chi tiết
                </Typography>
                <Typography variant="body1" paragraph>
                  Áo thun nam cổ tròn chất liệu cotton 100%, thoáng mát, thấm
                  hút mồ hôi tốt. Áo có thiết kế đơn giản với cổ tròn cổ điển,
                  phù hợp với nhiều phong cách thời trang khác nhau. Sản phẩm lý
                  tưởng cho những ngày hè nóng bức hoặc khi tham gia các hoạt
                  động thể thao.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Đặc điểm nổi bật
                </Typography>
                <ul>
                  <Typography component="li" variant="body1">
                    Chất liệu cotton 100% mềm mại, thấm hút mồ hôi tốt
                  </Typography>
                  <Typography component="li" variant="body1">
                    Thiết kế đơn giản, dễ phối với nhiều trang phục khác
                  </Typography>
                  <Typography component="li" variant="body1">
                    Đường may tỉ mỉ, chắc chắn
                  </Typography>
                  <Typography component="li" variant="body1">
                    Màu sắc đa dạng, phù hợp với nhiều sở thích
                  </Typography>
                  <Typography component="li" variant="body1">
                    Dễ dàng giặt và bảo quản
                  </Typography>
                </ul>

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
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ backgroundColor: "grey.100", width: "30%" }}
                        >
                          Thương hiệu
                        </TableCell>
                        <TableCell>TECHSHOP</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ backgroundColor: "grey.100" }}
                        >
                          Chất liệu
                        </TableCell>
                        <TableCell>Cotton 100%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ backgroundColor: "grey.100" }}
                        >
                          Kiểu dáng
                        </TableCell>
                        <TableCell>Áo thun cổ tròn, form regular fit</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ backgroundColor: "grey.100" }}
                        >
                          Xuất xứ
                        </TableCell>
                        <TableCell>Việt Nam</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ backgroundColor: "grey.100" }}
                        >
                          Trọng lượng
                        </TableCell>
                        <TableCell>
                          {productData.weight} {productData.unitWeight}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ backgroundColor: "grey.100" }}
                        >
                          Hướng dẫn bảo quản
                        </TableCell>
                        <TableCell>
                          Giặt máy ở nhiệt độ thường, không sử dụng chất tẩy,
                          phơi trong bóng râm
                        </TableCell>
                      </TableRow>
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
                        4.7
                      </Typography>
                      <Box>
                        <Rating value={4.7} precision={0.1} readOnly />
                        <Typography variant="body2">25 đánh giá</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Button variant="contained">Viết đánh giá</Button>
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

          {/* Hướng dẫn chọn size */}
          <Box
            role="tabpanel"
            hidden={tabValue !== 2}
            id="tabpanel-2"
            sx={{ p: 3 }}
          >
            {tabValue === 2 && (
              <>
                <Typography variant="h6" gutterBottom>
                  Hướng dẫn chọn size
                </Typography>
                <Typography variant="body1" paragraph>
                  Để chọn được size áo phù hợp, bạn có thể tham khảo bảng size
                  dưới đây:
                </Typography>

                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ mb: 3 }}
                >
                  <Table>
                    <TableBody>
                      <TableRow
                        sx={{ backgroundColor: theme.palette.primary.main }}
                      >
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Size
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Chiều cao (cm)
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Cân nặng (kg)
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Ngực (cm)
                        </TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                          Vai (cm)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>S</TableCell>
                        <TableCell>160-165</TableCell>
                        <TableCell>50-58</TableCell>
                        <TableCell>88-92</TableCell>
                        <TableCell>42-44</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>M</TableCell>
                        <TableCell>166-170</TableCell>
                        <TableCell>59-65</TableCell>
                        <TableCell>92-96</TableCell>
                        <TableCell>44-46</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>L</TableCell>
                        <TableCell>171-175</TableCell>
                        <TableCell>66-72</TableCell>
                        <TableCell>96-100</TableCell>
                        <TableCell>46-48</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>XL</TableCell>
                        <TableCell>176-180</TableCell>
                        <TableCell>73-80</TableCell>
                        <TableCell>100-104</TableCell>
                        <TableCell>48-50</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="body1" paragraph>
                  Lưu ý: Bảng size trên chỉ mang tính chất tham khảo. Kích thước
                  có thể thay đổi từ 1-2cm tùy theo từng đợt sản xuất.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Cách đo size
                </Typography>
                <Box
                  component="img"
                  src="https://via.placeholder.com/800x400?text=Huong+Dan+Do+Size"
                  alt="Hướng dẫn đo size"
                  sx={{ width: "100%", maxWidth: 600, borderRadius: 2, mb: 2 }}
                />

                <Typography variant="body1" paragraph>
                  <strong>Đo ngực:</strong> Đo vòng quanh phần đầy đặn nhất của
                  ngực, giữ thước dây song song với mặt đất.
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Đo vai:</strong> Đo từ điểm nối vai trái đến điểm nối
                  vai phải.
                </Typography>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "primary.light",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    fontWeight="bold"
                  >
                    Mẹo chọn size:
                  </Typography>
                  <Typography variant="body2">
                    - Nếu bạn có thân hình mập hoặc thích mặc rộng thoải mái,
                    nên chọn size lớn hơn 1 size so với bảng.
                  </Typography>
                  <Typography variant="body2">
                    - Nếu bạn có thân hình gầy hoặc thích mặc ôm sát, nên chọn
                    đúng size theo bảng.
                  </Typography>
                  <Typography variant="body2">
                    - Nếu bạn đang phân vân giữa 2 size, nên chọn size lớn hơn.
                  </Typography>
                </Box>
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
                  height={isMobile ? 120 : 180}
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
                    height={isMobile ? 120 : 180}
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
