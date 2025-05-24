import { z } from "zod";
export const ProductSpecificationAttributeSchema = z.object({
  attributeName: z.string().min(1, { message: "Tên thuộc tính không được để trống" }),
  attributeValue: z.string().min(1, { message: "Giá trị thuộc tính không được để trống" }),
});

export const VariantCreateSchema = z.object({
  propertyValue1: z.string(),
  propertyValue2: z.string(),
  price: z.number().min(0),
  stock: z.number().min(0),
  isActivate: z.boolean(),
  image: z.any(),
});
export const ProductCreateSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  categoryId: z.string().optional(),
  brandId: z.string().optional(),
  price: z.number().min(0, { message: "Giá tiền phải lớn hơn hoặc = 0" }),
  tax: z.number().min(0).max(100).optional(),
  description: z.string().optional(),
  isIncludeTax: z.boolean().optional(),
  isPhysicalProduct: z.boolean().optional(),
  weight: z.number().min(0).optional(),
  cost: z.number().min(0).optional(),
  profit: z.number().min(0).optional(),
  margin: z.number().min(0).optional(),
  unitWeight: z.string().optional(),
  propertyName1: z.string(),
  propertyName2: z.string(),
  propertyValue1: z.array(z.string()),
  propertyValue2: z.array(z.string()),
  productVariants: z.array(VariantCreateSchema),
  removedUrls: z.array(z.string()),
  existingUrls: z.array(z.string()),
  fileUpload: z.any(),
  specifications: z.array(ProductSpecificationAttributeSchema),
});

  export type IProductCreateSchema = z.infer<typeof ProductCreateSchema>;
  export type IVariantItem = z.infer<typeof VariantCreateSchema>;