import { Container } from "@mui/material";

// Icons
import BannerSlider from "./banner-slider";
import Categories from "./categories";
import ProductsList from "./products";
import Promotions from "./promotions";

// Demo data
const categories = [
  { id: 1, name: "Điện thoại", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Laptop", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Máy tính bảng", image: "https://via.placeholder.com/150" },
  {
    id: 4,
    name: "Đồng hồ thông minh",
    image: "https://via.placeholder.com/150",
  },
  { id: 5, name: "Phụ kiện", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Gia dụng", image: "https://via.placeholder.com/150" },
];

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: "34.990.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: "31.990.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    discount: "15%",
  },
  {
    id: 3,
    name: "Macbook Pro M3",
    price: "49.990.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    discount: "5%",
  },
  {
    id: 4,
    name: "iPad Pro 2023",
    price: "23.990.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    discount: "12%",
  },
];

const bestSellers = [
  {
    id: 1,
    name: "Tai nghe Bluetooth Sony",
    price: "2.990.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Chuột gaming Logitech",
    price: "1.490.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Sạc dự phòng Anker",
    price: "890.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Bàn phím cơ Keychron",
    price: "2.290.000 ₫",
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: 4.6,
  },
];

const banners = [
  {
    id: 1,
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "Sale lớn cuối tuần",
  },
  {
    id: 2,
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "Sản phẩm mới ra mắt",
  },
  {
    id: 3,
    image:
      "https://th.bing.com/th/id/OIP.1J1hoDxnNalGehuBBjWkDQHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "Ưu đãi hội viên",
  },
];

// Main Component
const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BannerSlider banners={banners} />
      <Categories categories={categories} />
      <ProductsList title="Có thể bạn sẽ thích" products={featuredProducts} />
      <ProductsList title="Sản phẩm nổi bật" products={featuredProducts} />
      <ProductsList title="Sản phẩm bán chạy" products={bestSellers} />
      <Promotions
        title="Nhận ưu đãi độc quyền"
        description="Đăng ký nhận thông tin để không bỏ lỡ các khuyến mãi hấp dẫn."
        buttonText="Đăng ký"
      />
    </Container>
  );
};

export default HomePage;
