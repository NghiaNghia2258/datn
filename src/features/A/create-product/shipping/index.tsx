// Pricing.tsx
import { Box } from "@mui/material";
import { IProductCreateSchema } from "../zod";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextField } from "../../../../components/common/text-field";
import { CommonBooleanCheckbox } from "../../../../components/common/check-box/check-box-boolean";
import { CommonDropdown } from "../../../../components/common/dropdown";

export const Shipping = () => {
  return (
    <CommonCart title="Giao hàng">
      <Box sx={{ padding: "12px 10px" }}>
        <CommonBooleanCheckbox<IProductCreateSchema>
          name="isPhysicalProduct"
          label="Đây là sản phẩm vật lý"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "end",
        }}
      >
        <CommonTextField<IProductCreateSchema>
          name="weight"
          label="Cân nặng"
          type="number"
        />
        <CommonDropdown<IProductCreateSchema>
          name="unitWeight"
          options={[
            {
              value: "kg",
              label: "Kg",
            },
            {
              value: "g",
              label: "g",
            },
          ]}
          label={""}
        />
      </Box>
    </CommonCart>
  );
};
