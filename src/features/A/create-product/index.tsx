import { FC, useEffect } from "react";
import CommonPage from "../../../components/common/page";
import { Box } from "@mui/material";
import { useValidation } from "../../../context/validate";
import { IProductCreateSchema, ProductCreateSchema } from "./zod";
import { CommonCart } from "../../../components/common/card";
import { CommonButton } from "../../../components/common/button";
import CommonImageUploader from "../../../components/common/list-image-input";
import { ProductBasicInfo } from "./basic-info";
import { ProductPriceInfoForm } from "./pricing";
import { Shipping } from "./shipping";
import { Variant } from "./variant";
import ProductService from "../../../services/product.service";
import { useToast } from "../../../context/toast";
import { useCreateUpdateProduct } from "../../../context/A/create-product";
import { SpecifiAttribute } from "./specifi-attribute";
import { ProductBrandForm } from "./brand";
const default_value = {
  name: "",
  categoryId: undefined,
  price: 0,
  tax: undefined,
  description: "",
  isIncludeTax: false,
  isPhysicalProduct: true,
  weight: 0,
  cost: 0,
  profit: 0,
  margin: 0,
  unitWeight: "kg",
  propertyName1: "",
  propertyName2: "",
  propertyValue1: [],
  propertyValue2: [],
  productVariants: [],
  removedUrls: [],
  existingUrls: [],
  fileUpload: null,
  specifications: [],
};
const FeatCreateProduct: FC = () => {
  const { showToast } = useToast();
  const { productId } = useCreateUpdateProduct();
  const { formData, validateForm, setSchema, setFieldValue, setFormData } =
    useValidation<IProductCreateSchema>();
  useEffect(() => {
    setSchema(ProductCreateSchema);
    setFormData(default_value);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const res = await ProductService.GetOne(productId);
        setFormData(res);
      } else {
        setFormData(default_value);
      }
    };
    fetchData();
  }, [productId]);
  const onSubmit = async () => {
    if (productId)
      await ProductService.update(formData as IProductCreateSchema);
    else {
      const check = validateForm();
      console.log(formData);

      if (check) {
        showToast("Vui lòng điền đầy đủ thông tin");
        return;
      }
      await ProductService.create(formData as IProductCreateSchema);
    }
  };
  return (
    <CommonPage title="Thêm mới sản phẩm">
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <ProductBasicInfo />
          <ProductPriceInfoForm />
          <Variant />
          <SpecifiAttribute />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <CommonCart title="Hình ảnh">
            <CommonImageUploader
              initialImages={formData.existingUrls}
              onChange={({ files, removedUrls }) => {
                setFieldValue("fileUpload", files);
                setFieldValue("removedUrls", removedUrls);
              }}
            />
          </CommonCart>
          <Shipping />
          <ProductBrandForm />
          <CommonButton
            title={productId ? "Lưu" : "Tạo mới"}
            vartiant="primary"
            onClick={onSubmit}
          />
        </Box>
      </Box>
    </CommonPage>
  );
};

export default FeatCreateProduct;
