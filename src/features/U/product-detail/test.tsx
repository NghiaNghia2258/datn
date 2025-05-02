import { Box, Typography } from "@mui/material";

import { ProductComboCardWithVariants } from "./bundle-discount";

const sampleComboData = {
  id: "combo-1",
  name: "Combo Điện Thoại & Phụ Kiện",
  description:
    "Bộ combo tiết kiệm với điện thoại cao cấp và phụ kiện chất lượng.",
  discount: 20,
  products: [
    {
      id: "product-1",
      name: "Smartphone XYZ",
      price: 15000000,
      description: "Điện thoại thông minh với camera 48MP và pin 5000mAh.",
      images: [
        "https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      ],
      rating: 4.5,
      reviewCount: 120,
      propertyName1: "Màu sắc",
      propertyName2: "Bộ nhớ",
      propertyValue1: ["Đen", "Trắng", "Xanh"],
      propertyValue2: ["128GB", "256GB"],
      productVariants: [
        {
          id: "variant-1",
          propertyValue1: "Đen",
          propertyValue2: "128GB",
          price: 15000000,
          stock: 10,
          isActivate: true,
          image:
            "https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
        {
          id: "variant-2",
          propertyValue1: "Đen",
          propertyValue2: "256GB",
          price: 17000000,
          stock: 5,
          isActivate: true,
          image:
            "https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
        {
          id: "variant-3",
          propertyValue1: "Trắng",
          propertyValue2: "128GB",
          price: 15000000,
          stock: 0,
          isActivate: true,
          image:
            "https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        },
      ],
    },
    {
      id: "product-2",
      name: "Tai nghe Bluetooth",
      price: 2000000,
      description: "Tai nghe không dây với âm thanh chất lượng cao.",
      images: [
        "https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7,https://th.bing.com/th/id/OIP.-eh5biFTbFG2w9IznNK_MQHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      ],
      rating: 4.2,
      reviewCount: 85,
      propertyName1: "Màu sắc",
      propertyName2: "Loại",
      propertyValue1: ["Đen", "Trắng"],
      propertyValue2: ["In-ear", "Over-ear"],
      productVariants: [
        {
          id: "variant-4",
          propertyValue1: "Đen",
          propertyValue2: "In-ear",
          price: 2000000,
          stock: 15,
          isActivate: true,
          image: "https://via.placeholder.com/150",
        },
        {
          id: "variant-5",
          propertyValue1: "Trắng",
          propertyValue2: "Over-ear",
          price: 2500000,
          stock: 8,
          isActivate: true,
          image: "https://via.placeholder.com/150",
        },
      ],
    },
  ],
  isNew: true,
  isBestSeller: false,
  isLimited: true,
};

// Example component using ProductComboCardWithVariants
export const ComboExample = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Combo Sản Phẩm
      </Typography>
      <ProductComboCardWithVariants {...sampleComboData} />
    </Box>
  );
};

export default ComboExample;
