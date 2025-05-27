// ProductPriceInfoForm.tsx
import { Box } from "@mui/material";
import { IProductCreateSchema } from "../zod";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextField } from "../../../../components/common/text-field";

export const ProductPriceInfoForm = () => {
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
            <CommonTextField<IProductCreateSchema>
              name="originalPrice"
              label="Giá gốc"
              type="number"
              prefix="$"
            />
          </Box>
          <Box sx={{ flex: 1 }}></Box>
        </Box>
      </Box>
    </CommonCart>
  );
};
