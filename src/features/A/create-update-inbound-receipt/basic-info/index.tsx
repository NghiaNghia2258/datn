import { Box } from "@mui/material";
import { IInboundReceiptCreateSchema } from "../zod";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextField } from "../../../../components/common/text-field";
import { CommonDropdown } from "../../../../components/common/dropdown";

export const InboundBasicInfoForm = () => {
  return (
    <CommonCart title="Thông tin chung">
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <CommonTextField<IInboundReceiptCreateSchema>
            name="createdAt"
            label="Ngày nhập kho"
            type="date"
          />
        </Box>
        <Box sx={{ flex: 2 }}>
          <CommonDropdown<IInboundReceiptCreateSchema>
            name="supplierId"
            label="Mã nhà cung cấp"
            options={[
              {
                label: "NCC1",
                value: "1",
              },
              {
                label: "NCC2",
                value: "2",
              },
              {
                label: "NCC3",
                value: "3",
              },
            ]}
          />
        </Box>
      </Box>

      <Box>
        <CommonTextField<IInboundReceiptCreateSchema>
          name="note"
          label="Ghi chú"
          type="text"
        />
      </Box>
    </CommonCart>
  );
};
