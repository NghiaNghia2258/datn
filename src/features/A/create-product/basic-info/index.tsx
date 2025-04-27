// ProductBasicInfo.tsx
import { Box, Typography } from "@mui/material";
import { CommonCart } from "../../../../components/common/card";
import { IProductCreateSchema } from "../zod";
import { CommonTextField } from "../../../../components/common/text-field";
import { CommonDropdown } from "../../../../components/common/dropdown";
import TextEditor from "../../../../components/common/rich-text-editor";
import { useValidation } from "../../../../context/validate";

export const ProductBasicInfo = () => {
  const { setFieldValue, formData } = useValidation<IProductCreateSchema>();
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
        <CommonDropdown<IProductCreateSchema>
          name="categoryId"
          helpText="Trường này không bắt buộc nhưng nên có để cải thiện hiệu xuất tìm kiếm"
          options={[
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
          ]}
          label={"Loại"}
        />
      </Box>
    </CommonCart>
  );
};
