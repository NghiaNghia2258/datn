import { FC, useEffect } from "react";
import CommonPage from "../../../components/common/page";
import { Box } from "@mui/material";
import { useValidation } from "../../../context/validate";
import {
  IInboundReceiptCreateSchema,
  IInboundReceiptUpdateSchema,
  InboundReceiptCreateSchema,
} from "./zod";
import { CommonButton } from "../../../components/common/button";
import { useToast } from "../../../context/toast";
import { useCreateUpdateInboundReceipt } from "../../../context/A/inbound-receipt";
import { InboundBasicInfoForm } from "./basic-info";
import { InboundItemsTable } from "./table-item";
import { DialogInboundProductSelector } from "./chossing-item";
import InboundReceiptService from "../../../services/inbound-receipt.service";

const FeatCreateInboundReceipt: FC = () => {
  const { showToast } = useToast();
  const { receiptId } = useCreateUpdateInboundReceipt();
  const { setSchema, setFormData, validateForm, setFieldValue, formData } =
    useValidation<IInboundReceiptCreateSchema>();

  const { selectedProducts } = useCreateUpdateInboundReceipt();
  useEffect(() => {
    setSchema(InboundReceiptCreateSchema);
    setFormData({
      stockInDate: new Date().toISOString(),
      supplierId: undefined,
      note: "",
      items: [],
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (receiptId) {
        const res = await InboundReceiptService.getOne(receiptId);
        setFormData(res);
      }
    };
    fetchData();
  }, [receiptId]);

  const onSubmit = async () => {
    setFieldValue("items", selectedProducts);
    const hasError = validateForm();
    if (hasError) {
      showToast("Vui lòng điền đầy đủ thông tin");
      return;
    }
    try {
      if (receiptId) {
        await InboundReceiptService.update({
          ...formData,
          id: receiptId,
        } as IInboundReceiptUpdateSchema);
        showToast("Cập nhật phiếu nhập thành công");
      } else {
        await InboundReceiptService.create(
          formData as IInboundReceiptCreateSchema
        );
        showToast("Tạo phiếu nhập thành công");
      }
    } catch (err) {
      showToast("Có lỗi xảy ra khi xử lý");
      console.error(err);
    }
  };

  return (
    <CommonPage
      title={receiptId ? "Cập nhật phiếu nhập kho" : "Tạo phiếu nhập kho"}
    >
      <Box sx={{ display: "flex", gap: "10px" }}>
        {/* BÊN TRÁI: 70% */}
        <Box sx={{ flex: 7, display: "flex", flexDirection: "column", gap: 2 }}>
          <InboundBasicInfoForm />
          <InboundItemsTable />
        </Box>

        {/* BÊN PHẢI: 30% */}
        <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Có thể thêm preview, tổng tiền, thông tin nhà cung cấp... */}

          <CommonButton
            title={receiptId ? "Lưu" : "Tạo mới"}
            vartiant="primary"
            onClick={onSubmit}
          />
        </Box>
      </Box>

      <DialogInboundProductSelector />
    </CommonPage>
  );
};

export default FeatCreateInboundReceipt;
