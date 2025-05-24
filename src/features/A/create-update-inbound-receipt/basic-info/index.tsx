import { Box } from "@mui/material";
import { IInboundReceiptCreateSchema } from "../zod";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextField } from "../../../../components/common/text-field";
import { CommonDropdown } from "../../../../components/common/dropdown";
import { useEffect, useState } from "react";
import SupplierService from "../../../../services/supplier.service";
import { CommonButtonIcon } from "../../../../components/common/button/button-icon";
import { CommonDialog } from "../../../../components/common/dialog";
import { CommonTextFieldVer2 } from "../../../../components/common/text-field/text-field-2";
import AddIcon from "@mui/icons-material/Add";

export const InboundBasicInfoForm = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [supplierName, setSupplierName] = useState<string>("");

  const fetchData = async () => {
    const res = await SupplierService.getAll();
    setSuppliers(
      (res ?? []).map((x: any) => ({ label: x.name, value: x.id.toString() }))
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CommonCart title="Thông tin chung">
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <CommonTextField<IInboundReceiptCreateSchema>
            name="stockInDate"
            label="Ngày nhập kho"
            type="date"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "end", gap: 1, flex: 2 }}>
          <Box sx={{ flex: 1 }}>
            <CommonDropdown<IInboundReceiptCreateSchema>
              name="supplierId"
              label="Mã nhà cung cấp"
              options={suppliers}
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
      </Box>

      <Box>
        <CommonTextField<IInboundReceiptCreateSchema>
          name="note"
          label="Ghi chú"
          type="text"
        />
      </Box>

      <CommonDialog
        showButton
        isOpen={isOpen}
        title="Thêm mới nhà cung cấp"
        onClose={() => setIsOpen(false)}
        onConfirm={async () => {
          await SupplierService.create(supplierName);
          setIsOpen(false);
          setSupplierName("");
          fetchData();
        }}
      >
        <Box sx={{ p: 1 }}>
          <CommonTextFieldVer2
            label={"Tên loại nhà cung cấp"}
            onChange={(value) => setSupplierName(value)}
            value={supplierName}
          />
        </Box>
      </CommonDialog>
    </CommonCart>
  );
};
