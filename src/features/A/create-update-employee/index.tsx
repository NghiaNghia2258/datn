import { FC, useEffect } from "react";
import { CommonDialog } from "../../../components/common/dialog";
import { Box } from "@mui/material";
import { CommonButton } from "../../../components/common/button";
import { CommonTextField } from "../../../components/common/text-field";
import { useValidation } from "../../../context/validate";
import { EmployeeCreateSchema, EmployeeCreateSchemaSchema } from "./zod";
import { CommonRadioButton } from "../../../components/common/radio-button";
import { useViewEmployee } from "../../../context/A/view-employees";
import EmployeeService from "../../../services/employee.service";

export interface CreateUpdateEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
}
export const CreateUpdateEmployee: FC<CreateUpdateEmployeeProps> = ({
  isOpen,
  onClose,
}) => {
  const { formData, validateForm, setSchema } =
    useValidation<EmployeeCreateSchema>();
  const { code } = useViewEmployee();

  useEffect(() => {
    setSchema(EmployeeCreateSchemaSchema);
  }, []);
  useEffect(() => {}, [code]);
  return (
    <CommonDialog isOpen={isOpen} title="Thông tin" onClose={onClose}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          width: "70%",
          gap: 2,
        }}
      >
        <CommonTextField<EmployeeCreateSchema> name="name" label="Họ và tên" />
        <CommonTextField<EmployeeCreateSchema>
          name="phone"
          label="Số điện thoại"
        />
        <CommonTextField<EmployeeCreateSchema> name="mail" label="Mail" />
        <CommonRadioButton<EmployeeCreateSchema>
          direction="row"
          name="gender"
          options={[
            {
              value: "Nam",
              label: "Nam",
            },
            {
              value: "Nữ",
              label: "Nữ",
            },
            {
              value: "Khác",
              label: "Khác",
            },
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
              const model: EmployeeCreateSchema = {
                name: formData.name ?? "",
                phone: formData.phone ?? "",
                mail: formData.mail ?? "",
                gender: formData.gender ?? "Nam",
              };
              if (code) {
                await EmployeeService.update({
                  code: code,
                  ...model,
                });
              } else {
                await EmployeeService.create(model);
              }
            }}
          />
          <CommonButton title="Cancel" onClick={onClose} />
        </Box>
      </Box>
    </CommonDialog>
  );
};
