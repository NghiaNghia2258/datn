export interface ResponseGetAllProductVariant {
    propertyValue1: string;
    propertyValue2: string;
    imageUrl: string;
    inventory: number;
  }
  
  export interface ResponseGetAllProducts {
    id: string;
    name: string;
    mainImageUrl: string;
    totalInventory: number;
    categoryName: string;
    rate: number;
    rateCount: number;
    propertyName1: string,
    propertyName2: string,

    productVariants: ResponseGetAllProductVariant[];
  }
  
  export interface ResponseGetOneProduct{
    id: string;
    name: string;
    nameEn?: string;
    description?: string;
    mainImageUrl?: string;
    totalInventory?: number;
    categoryId: number;
    categoryName?: string;
   
  } 
  export interface ResponseStatisticsOneProduct {
    productId:string;
    rate: number;
    rateCount: number;
    sellCount: number;
    ratingOneStar: number;
    ratingTwoStar: number;
    ratingThreeStar: number;
    ratingFourStar: number;
    ratingFiveStar: number;
  }
  export interface ProductInventoryInfo {
    id: string;             // ID/Mã sản phẩm
    name: string;           // Tên sản phẩm
    status: ProductStatus;  // Trạng thái sản phẩm
    stockQuantity: number;  // Số lượng tồn kho hiện tại
    pendingOrderQuantity: number; // Số lượng đã đặt (đang chờ xử lý)
  }
  export enum ProductStatus {
    ACTIVE = 'ACTIVE',           // Đang bán
    OUT_OF_STOCK = 'OUT_OF_STOCK', // Tạm hết hàng
    DISCONTINUED = 'DISCONTINUED'  // Ngừng kinh doanh
  }