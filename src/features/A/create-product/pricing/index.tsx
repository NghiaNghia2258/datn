// ProductPriceInfoForm.tsx
import { Box } from "@mui/material";
import { IProductCreateSchema } from "../zod";
import { useValidation } from "../../../../context/validate";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextField } from "../../../../components/common/text-field";
import { CommonBooleanCheckbox } from "../../../../components/common/check-box/check-box-boolean";

export const ProductPriceInfoForm = () => {
  const { formData } = useValidation<IProductCreateSchema>();

  return (
    <CommonCart title="Giá">
      <Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <CommonTextField<IProductCreateSchema>
              name="price"
              label="Giá bán"
              type="number"
              prefix="$"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            {formData.isIncludeTax && (
              <CommonTextField<IProductCreateSchema>
                name="tax"
                label="Thuế"
                type="number"
                prefix="%"
              />
            )}
          </Box>
          <Box sx={{ flex: 1 }}></Box>
        </Box>

        <Box sx={{ padding: "12px 10px", borderBottom: "1px solid #e8e8e8" }}>
          <CommonBooleanCheckbox<IProductCreateSchema>
            name="isIncludeTax"
            label="Tính thuế cho sản phẩm này"
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <CommonTextField<IProductCreateSchema>
              name="cost"
              label="Chi phí/sản phẩm"
              type="number"
              prefix="$"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CommonTextField<IProductCreateSchema>
              name="profit"
              label="Profit"
              type="number"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <CommonTextField<IProductCreateSchema>
              name="margin"
              label="Margin"
              type="number"
            />
          </Box>
        </Box>
      </Box>
    </CommonCart>
  );
};
