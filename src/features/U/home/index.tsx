import { Container } from "@mui/material";

// Icons
import BannerSlider from "./banner-slider";
import Categories from "./categories";
import ProductsList from "./products";
import Promotions from "./promotions";
import { useEffect, useState } from "react";
import HomeService from "../../../services/home.sevices";

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
  const [productsRecomend, setProductsRecomend] = useState<any>();
  const [productsBestSell, setProductsBestSell] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await HomeService.GetBestSeller();
      setProductsBestSell(data);
      const data2 = await HomeService.GetRecomend();
      setProductsRecomend(data2);
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <BannerSlider banners={banners} />
      <ProductsList title="Có thể bạn sẽ thích" products={productsRecomend} />
      <ProductsList title="Sản phẩm bán chạy" products={productsBestSell} />
      <Promotions
        title="Nhận ưu đãi độc quyền"
        description="Đăng ký nhận thông tin để không bỏ lỡ các khuyến mãi hấp dẫn."
        buttonText="Đăng ký"
      />
    </Container>
  );
};

export default HomePage;
