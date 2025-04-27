import { IProductCreateSchema } from "../features/A/create-product/zod";
import { InboundProduct } from "../features/A/create-update-inbound-receipt/zod";
import {  RequestGetALlProducts } from "./request/product.request";
import { ProductInventoryInfo, ProductStatus, ResponseGetAllProducts, ResponseStatisticsOneProduct } from "./response/product.response";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
     
export default class ProductService{

    static async getAll(options?:RequestGetALlProducts): Promise<ResponseGetAllProducts[]>{
        console.log("getAll", options);
        await delay(2000);
        const res: ResponseGetAllProducts[] = [
            {
              id:"p1",
                name: "Áo thun nam",
                mainImageUrl: "https://example.com/images/ao-thun.jpg",
                totalInventory: 150,
                categoryName: "Thời trang nam",
                rate: 4.5,
                rateCount: 120,
                propertyName1: "Màu sắc",
                propertyName2: "Kích thước",
                productVariants: [
                  {
                    propertyValue1: "Đen",
                    propertyValue2: "L",
                    imageUrl: "https://example.com/images/ao-thun-den-L.jpg",
                    inventory: 50
                  },
                  {
                    propertyValue1: "Trắng",
                    propertyValue2: "M",
                    imageUrl: "https://example.com/images/ao-thun-trang-M.jpg",
                    inventory: 30
                  },
                  {
                    propertyValue1: "Xanh",
                    propertyValue2: "XL",
                    imageUrl: "https://example.com/images/ao-thun-xanh-XL.jpg",
                    inventory: 70
                  }
                ]
              },
              {
              id:"p2",
                name: "Balo du lịch",
                mainImageUrl: "https://example.com/images/balo.jpg",
                totalInventory: 80,
                categoryName: "Phụ kiện",
                rate: 4.7,
                rateCount: 200,
                propertyName1: "Màu sắc",
                propertyName2: "Kích thước",
                productVariants: [] 
              }
          ];
          return res;
    }
    static async delete(id:string): Promise<void> {
        console.log("Delete : ", id);
        await delay(2000);
    }   
    static async create(model:IProductCreateSchema): Promise<void> {
        console.log("Create : ", model);
        await delay(2000);
    }
    
    static async update(model:IProductCreateSchema): Promise<void> {
        console.log("Update : ", model);
        await delay(2000);
    }
    static async GetOne(id:string): Promise<IProductCreateSchema>{
      console.log("Get one id : " , id);
      await delay(2000);
      const productCreateObject:IProductCreateSchema = {
        name: "Áo thun nam cổ tròn 222",
        categoryId: "cat123",
        price: 250000,
        tax: 8,
        description: "Áo thun nam cổ tròn chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt",
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
        propertyValue2: ["S", "M", "L"],
        productVariants: [
          {
            propertyValue1: "Trắng",
            propertyValue2: "XL",
            price: 250000,
            stock: 50,
            isActivate: false,
            image: null
          },
          {
            propertyValue1: "Trắng", 
            propertyValue2: "M",
            price: 250000,
            stock: 45,
            isActivate: true,
            image: null
          },
          {
            propertyValue1: "Đen",
            propertyValue2: "M",
            price: 270000,
            stock: 30,
            isActivate: false,
            image: null
          },
          {
            propertyValue1: "Đen",
            propertyValue2: "S",
            price: 270000,
            stock: 25,
            isActivate: true,
            image: "https://th.bing.com/th/id/OIP.CYkVrrAB4OlRYovO26ZwMwHaHa?w=189&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          }
        ],
        removedUrls: ["https://example.com/img/old-product-1.jpg"],
        existingUrls: [
          "https://example.com/img/product-front.jpg",
          "https://example.com/img/product-back.jpg"
        ],
        fileUpload: null,
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
      };
      return productCreateObject
    }
    static async GetProductStatistics(id: string): Promise<ResponseStatisticsOneProduct> {
      console.log("Get product statistics for id: ", id);
      
      return {
        productId: "aa",
        rate: 2.1,
        rateCount: 128,
        sellCount: 352,
        ratingOneStar: 5,
        ratingTwoStar: 8,
        ratingThreeStar: 17,
        ratingFourStar: 48,
        ratingFiveStar: 50
      };
    }
    static async GetProductInventoryInfo(id: string): Promise<ProductInventoryInfo> {
      console.log("Get product inventory info for id: ", id);
    
      return {
        id: id,
        name: "Sản phẩm mẫu",
        status: ProductStatus.ACTIVE,
        stockQuantity: 120,
        pendingOrderQuantity: 15
      };
    }
 static async  getInboundSelectableProducts (): Promise<InboundProduct[]> {
  await delay(1000); // Giả lập loading

  const rawProducts: ResponseGetAllProducts[] = [
    {
      id: "p1",
      name: "Áo thun nam",
      mainImageUrl: "https://example.com/images/ao-thun.jpg",
      totalInventory: 150,
      categoryName: "Thời trang nam",
      rate: 4.5,
      rateCount: 120,
      propertyName1: "Màu sắc",
      propertyName2: "Kích thước",
      productVariants: [
        {
          propertyValue1: "Đen",
          propertyValue2: "L",
          imageUrl: "https://example.com/images/ao-thun-den-L.jpg",
          inventory: 50
        },
        {
          propertyValue1: "Trắng",
          propertyValue2: "M",
          imageUrl: "https://example.com/images/ao-thun-trang-M.jpg",
          inventory: 30
        },
        {
          propertyValue1: "Xanh",
          propertyValue2: "XL",
          imageUrl: "https://example.com/images/ao-thun-xanh-XL.jpg",
          inventory: 70
        }
      ]
    },
    {
      id: "p2",
      name: "Balo du lịch",
      mainImageUrl: "https://example.com/images/balo.jpg",
      totalInventory: 80,
      categoryName: "Phụ kiện",
      rate: 4.7,
      rateCount: 200,
      propertyName1: "Màu sắc",
      propertyName2: "Kích thước",
      productVariants: []
    }
  ];

  // Convert productVariants → InboundSelectedProduct[]
  const result: InboundProduct[] = rawProducts.flatMap((product) =>
    product.productVariants.map((variant) => ({
      id: `${product.id}_${variant.propertyValue1}_${variant.propertyValue2}`,
      name: `${product.name} - ${variant.propertyValue1} - ${variant.propertyValue2}`,
      inventory: variant.inventory,
      image: variant.imageUrl
    }))
  );

  return result;
};

}