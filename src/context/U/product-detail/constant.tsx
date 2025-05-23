export const productData = {
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
  specifications: [
    {
      attributeName: "Thương hiệu",
      attributeValue: "TECHSHOP",
    },
    {
      attributeName: "Chất liệu",
      attributeValue: "Cotton 100%",
    },
    {
      attributeName: "Kiểu dáng",
      attributeValue: "Áo thun cổ tròn, form regular fit",
    },
    {
      attributeName: "Xuất xứ",
      attributeValue: "Việt Nam",
    },
    {
      attributeName: "Trọng lượng",
      attributeValue: "250g",
    },
    {
      attributeName: "Hướng dẫn bảo quản",
      attributeValue:
        "Giặt máy ở nhiệt độ thường, không sử dụng chất tẩy, phơi trong bóng râm",
    },
  ],
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
