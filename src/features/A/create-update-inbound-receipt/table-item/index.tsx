import { Box, Typography } from "@mui/material";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextFieldVer2 } from "../../../../components/common/text-field/text-field-2";
import { useCreateUpdateInboundReceipt } from "../../../../context/A/inbound-receipt";
import { useValidation } from "../../../../context/validate";
import { IInboundReceiptCreateSchema } from "../zod";
import { CommonButton } from "../../../../components/common/button";

export const InboundItemsTable = () => {
  const { toggleProductDialog } = useCreateUpdateInboundReceipt();

  const { formData, setFieldValue } =
    useValidation<IInboundReceiptCreateSchema>();

  const selectedProducts = formData.items ?? [];
  const handleUpdate = (index: number, field: string, value: any) => {
    const updated = selectedProducts;
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setFieldValue("items", updated);
  };

  return (
    <CommonCart title="Danh sách hàng hóa">
      <Box sx={{ p: 2 }}>
        <CommonButton
          title="Chọn sản phẩm"
          vartiant="primary"
          onClick={() => {
            toggleProductDialog();
          }}
        />
      </Box>
      <Box sx={{ px: 2, pb: 1 }}>
        <Box
          className="table-head"
          sx={{
            p: 1,
            backgroundColor: "#ece8e8",
            borderRadius: "5px",
            display: "flex",
            gap: 1,
            fontWeight: 500,
          }}
        >
          <Box sx={{ flex: 3 }}>Tên sản phẩm</Box>
          <Box sx={{ flex: 2 }}>Số lượng</Box>
          <Box sx={{ flex: 2 }}>Đơn giá</Box>
          <Box sx={{ flex: 2 }}>Thành tiền</Box>
        </Box>

        <Box className="table-body" sx={{ mt: 1 }}>
          {selectedProducts.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}
            >
              <Box sx={{ flex: 3 }}>
                <Typography>{item.name}</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <CommonTextFieldVer2
                  type="number"
                  value={String(item.quantity)}
                  onChange={(val) =>
                    handleUpdate(index, "quantity", Number(val))
                  }
                  label=""
                />
              </Box>
              <Box sx={{ flex: 2 }}>
                <CommonTextFieldVer2
                  type="number"
                  value={String(item.unitPrice)}
                  onChange={(val) =>
                    handleUpdate(index, "unitPrice", Number(val))
                  }
                  label=""
                />
              </Box>
              <Box sx={{ flex: 2 }}>
                <Typography>{item.unitPrice?.toLocaleString()} ₫</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </CommonCart>
  );
};
