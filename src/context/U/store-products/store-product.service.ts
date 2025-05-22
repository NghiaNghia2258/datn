import { ApiResult } from "../../../services";
import { OptionFilter } from "./store-product.request";
import { Brand, Product, Store } from "./store-product.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class StoreProductService {
  static async getBrands(): Promise<Brand[]> {
    console.log("getAll Brands");
    await delay(2000);

    const res: Brand[] = [
    {
        id: "1",
        name: "Brand 1"
    },
    {
        id: "2",
        name: "Brand 2"
    },
    {
        id: "3",
        name: "Brand 3"
    }
];

    return res;
  }
  static async getStoreInfo(storeId: string): Promise<Store> {
    console.log("getStoreInfo", storeId);
    await delay(2000);

    const res: Store = {
      id: "ST001",
      name: "TechGadget Store",
      description:
        "Cửa hàng chuyên cung cấp các sản phẩm công nghệ chính hãng với giá tốt nhất",
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
      isFollow: true
    };

    return res;
  }

  static async GetProduct(option:OptionFilter): Promise<ApiResult<Product[]>> {
    console.log("getproduct for store", option);
    await delay(2000);

    const res: ApiResult<Product[]> = {
      isSucceeded: true,
      data: [
        {
          id: "P001",
          name: "iPhone 15 Pro Max 256GB",
          images: ["https://source.unsplash.com/random/?iphone15"],
          price: 34990000,
          originalPrice: 36990000,
          discount: 5,
          rating: 4.9,
          reviewCount: 125,
          inStock: true,
          isNew: true,
          isBestSeller: true,
          category: "Điện thoại",
          brand: "Apple",
          shortDescription:
            "iPhone 15 Pro Max 256GB - Chip A17 Pro, Camera 48MP, Pin siêu trâu",
        },
        {
          id: "P002",
          name: "Samsung Galaxy S24 Ultra",
          images: ["https://source.unsplash.com/random/?galaxys24"],
          price: 31990000,
          originalPrice: 33990000,
          discount: 6,
          rating: 4.8,
          reviewCount: 98,
          inStock: true,
          isNew: true,
          isBestSeller: false,
          category: "Điện thoại",
          brand: "Samsung",
          shortDescription:
            "Galaxy S24 Ultra - Snapdragon 8 Gen 3, Camera 200MP, S-Pen",
        },
        {
          id: "P003",
          name: "MacBook Air M3",
          images: ["https://source.unsplash.com/random/?macbookair"],
          price: 28990000,
          originalPrice: 30990000,
          discount: 6,
          rating: 4.7,
          reviewCount: 87,
          inStock: true,
          isNew: true,
          isBestSeller: true,
          category: "Laptop",
          brand: "Apple",
          shortDescription:
            "MacBook Air M3 - Hiệu năng mạnh mẽ, siêu mỏng nhẹ, Pin 18h",
        },
        {
          id: "P004",
          name: "iPad Air 6 256GB",
          images: ["https://source.unsplash.com/random/?ipadair"],
          price: 18990000,
          originalPrice: 19990000,
          discount: 5,
          rating: 4.7,
          reviewCount: 65,
          inStock: true,
          isNew: true,
          isBestSeller: false,
          category: "Tablet",
          brand: "Apple",
          shortDescription:
            "iPad Air 6 256GB - Chip M2, màn hình Liquid Retina 10.9 inch",
        },
        {
          id: "P005",
          name: "AirPods Pro 2",
          images: ["https://source.unsplash.com/random/?airpodspro"],
          price: 6490000,
          originalPrice: 7490000,
          discount: 13,
          rating: 4.8,
          reviewCount: 112,
          inStock: true,
          isNew: false,
          isBestSeller: true,
          category: "Tai nghe",
          brand: "Apple",
          shortDescription: "AirPods Pro 2 - Chống ồn chủ động, Chất âm đỉnh cao",
        },
        {
          id: "P006",
          name: "Dell XPS 13",
          images: ["https://source.unsplash.com/random/?dellxps"],
          price: 32990000,
          originalPrice: 34990000,
          discount: 6,
          rating: 4.6,
          reviewCount: 76,
          inStock: true,
          isNew: true,
          isBestSeller: false,
          category: "Laptop",
          brand: "Dell",
          shortDescription: "Dell XPS 13 - Intel Core Ultra 7, 16GB RAM, 512GB SSD",
        },
        {
          id: "P007",
          name: "Galaxy Tab S9 Ultra",
          images: ["https://source.unsplash.com/random/?galaxytab"],
          price: 24990000,
          originalPrice: 26990000,
          discount: 7,
          rating: 4.7,
          reviewCount: 58,
          inStock: true,
          isNew: true,
          isBestSeller: false,
          category: "Tablet",
          brand: "Samsung",
          shortDescription:
            'Galaxy Tab S9 Ultra - Màn hình 14.6", Snapdragon 8 Gen 2',
        },
        {
          id: "P008",
          name: "Sony WH-1000XM5",
          images: ["https://source.unsplash.com/random/?sonyheadphones"],
          price: 8490000,
          originalPrice: 9490000,
          discount: 11,
          rating: 4.9,
          reviewCount: 95,
          inStock: true,
          isNew: false,
          isBestSeller: true,
          category: "Tai nghe",
          brand: "Sony",
          shortDescription: "Sony WH-1000XM5 - Chống ồn hàng đầu, Chất âm xuất sắc",
        },
      ],
      totalRecordsCount: 30,
      message: "Get success",
      statusCode: 200
    };
    return res;
  }
}
