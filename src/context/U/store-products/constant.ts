import { Store } from "./store-product.response";

export const STORE_DEFAULT: Store = {
    id: "ST001",
    name: "",
    description:"",
    logo: "https://source.unsplash.com/random/?logo",
    coverImage: "https://source.unsplash.com/random/?technology",
    rating: 4.8,
    reviewCount: 256,
    followers: 1250,
    joinDate: "05/2020",
    verified: true,
    location: "Quận 1, TP. Hồ Chí Minh",
    contactPhone: "0987654321",
    contactEmail: "contact@techgadget.com",
    categories: ["Điện thoại", "Laptop", "Tablet", "Tai nghe", "Phụ kiện"],
    policies: [
      { title: "Miễn phí vận chuyển", description: "Cho đơn hàng từ 500.000đ" },
      { title: "Đổi trả miễn phí", description: "Trong vòng 15 ngày" },
      { title: "Bảo hành chính hãng", description: "12 tháng tại cửa hàng" },
    ],
    facebook: "facebook.com/techgadget",
    instagram: "instagram.com/techgadget",
    twitter: "twitter.com/techgadget",
    isFollow: true,
  };