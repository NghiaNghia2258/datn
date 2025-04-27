import { FC, useEffect } from "react";
import { CommonDialog } from "../../../components/common/dialog";
import { Box } from "@mui/material";
import { CommonButton } from "../../../components/common/button";
import { CommonTextField } from "../../../components/common/text-field";
import { useValidation } from "../../../context/validate";

import { CommonRadioButton } from "../../../components/common/radio-button";
import CustomerService from "../../../services/customer.service";
import { CustomerCreate, CustomerCreateSchema } from "../view-customer/zod";
import { useViewCustomer } from "../../../context/A/view-customer";

export interface CreateUpdateCustomerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateUpdateCustomer: FC<CreateUpdateCustomerProps> = ({
  isOpen,
  onClose,
}) => {
  const { formData, validateForm, setSchema } = useValidation<CustomerCreate>();
  const { code } = useViewCustomer();

  useEffect(() => {
    setSchema(CustomerCreateSchema);
  }, []);

  useEffect(() => {}, [code]);

  return (
    <CommonDialog
      isOpen={isOpen}
      title="Thông tin khách hàng"
      onClose={onClose}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          width: "70%",
          gap: 2,
        }}
      >
        <CommonTextField<CustomerCreate> name="name" label="Họ và tên" />
        <CommonTextField<CustomerCreate> name="phone" label="Số điện thoại" />
        <CommonTextField<CustomerCreate> name="password" label="Mật khẩu" />
        <CommonTextField<CustomerCreate> name="email" label="Email" />
        <CommonTextField<CustomerCreate> name="address" label="Địa chỉ" />
        <CommonRadioButton<CustomerCreate>
          direction="row"
          name="gender"
          options={[
            { value: "Nam", label: "Nam" },
            { value: "Nữ", label: "Nữ" },
            { value: "Khác", label: "Khác" },
          ]}
        />
      </Box>

      <Box sx={{ borderTop: "1px solid #938a8a80" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, gap: 1 }}>
          <CommonButton
            vartiant="primary"
            title="Save"
            onClick={async () => {
              validateForm();
              const model: CustomerCreate = {
                name: formData.name ?? "",
                phone: formData.phone ?? "",
                email: formData.email ?? "",
                password: formData.password ?? "",
                address: formData.address ?? "",
                gender: formData.gender ?? "Nam",
              };
              if (code) {
                await CustomerService.update({
                  id: code,
                  ...model,
                });
              } else {
                await CustomerService.create(model);
              }
            }}
          />
          <CommonButton title="Cancel" onClick={onClose} />
        </Box>
      </Box>
    </CommonDialog>
  );
};
