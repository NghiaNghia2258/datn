// ProductPriceInfoForm.tsx
import { IProductCreateSchema } from "../zod";
import { CommonCart } from "../../../../components/common/card";
import { CommonDropdown } from "../../../../components/common/dropdown";
import { Box } from "@mui/material";
import { CommonButtonIcon } from "../../../../components/common/button/button-icon";
import AddIcon from "@mui/icons-material/Add";
import { CommonDialog } from "../../../../components/common/dialog";
import { useState } from "react";
import { CommonTextFieldVer2 } from "../../../../components/common/text-field/text-field-2";
import ProductService from "../../../../services/product.service";

export const ProductBrandForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [brandName, setBrandName] = useState<string>("");
  return (
    <CommonCart title="Thương hiệu">
      <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
        <Box sx={{ width: "80%" }}>
          <CommonDropdown<IProductCreateSchema>
            name="brandId"
            options={[
              { value: "Nam", label: "Nam" },
              { value: "Nữ", label: "Nữ" },
            ]}
            label={"Thương hiệu"}
          />
        </Box>
        <Box sx={{ width: 30, height: 30 }}>
          <CommonButtonIcon
            textTooltip="Tạo mới"
            onClick={() => setIsOpen(true)}
            icon={<AddIcon />}
          />
        </Box>
      </Box>
      <CommonDialog
        showButton
        isOpen={isOpen}
        title="Thêm mới thương hiệu"
        onClose={() => setIsOpen(false)}
        onConfirm={async () => {
          await ProductService.createBrand(brandName);
          setIsOpen(false);
          setBrandName("");
        }}
      >
        <Box sx={{ p: 1 }}>
          <CommonTextFieldVer2
            label={"Tên thương hiệu"}
            onChange={(value) => setBrandName(value)}
            value={brandName}
          />
        </Box>
      </CommonDialog>
    </CommonCart>
  );
};
