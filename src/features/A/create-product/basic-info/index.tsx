// ProductBasicInfo.tsx
import { Box, Typography } from "@mui/material";
import { CommonCart } from "../../../../components/common/card";
import { IProductCreateSchema } from "../zod";
import { CommonTextField } from "../../../../components/common/text-field";
import { CommonDropdown } from "../../../../components/common/dropdown";
import TextEditor from "../../../../components/common/rich-text-editor";
import { useValidation } from "../../../../context/validate";
import { CommonButtonIcon } from "../../../../components/common/button/button-icon";
import AddIcon from "@mui/icons-material/Add";
import { CommonDialog } from "../../../../components/common/dialog";
import { useCallback, useEffect, useState } from "react";
import { CommonTextFieldVer2 } from "../../../../components/common/text-field/text-field-2";
import ProductService from "../../../../services/product.service";

export const ProductBasicInfo = () => {
  const { setFieldValue, formData } = useValidation<IProductCreateSchema>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categoryName, setcategoryName] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    const res = await ProductService.getAllCategory();
    let cate = res.map((cate: any) => ({
      value: cate.id.toString(),
      label: cate.name,
    }));
    setCategories(cate);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CommonCart>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <CommonTextField<IProductCreateSchema>
          name="name"
          label="Tên sản phẩm"
        />
        <Box>
          <Typography>Mô tả</Typography>
          <TextEditor
            value={formData.description}
            onChange={(newHtml) => setFieldValue("description", newHtml)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CommonDropdown<IProductCreateSchema>
            name="categoryId"
            helpText="Trường này không bắt buộc nhưng nên có để cải thiện hiệu xuất tìm kiếm"
            options={categories}
            label={"Loại"}
          />
          <Box sx={{ width: 30, height: 30 }}>
            <CommonButtonIcon
              textTooltip="Tạo mới"
              onClick={() => setIsOpen(true)}
              icon={<AddIcon />}
            />
          </Box>
        </Box>
      </Box>

      <CommonDialog
        showButton
        isOpen={isOpen}
        title="Thêm mới loại sản phẩm"
        onClose={() => setIsOpen(false)}
        onConfirm={async () => {
          await ProductService.createCategory(categoryName);
          setIsOpen(false);
          setcategoryName("");
          fetchData();
        }}
      >
        <Box sx={{ p: 1 }}>
          <CommonTextFieldVer2
            label={"Tên loại sản phẩm"}
            onChange={(value) => setcategoryName(value)}
            value={categoryName}
          />
        </Box>
      </CommonDialog>
    </CommonCart>
  );
};
