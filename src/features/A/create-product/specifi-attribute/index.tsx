// Pricing.tsx
import { Box, IconButton, Stack } from "@mui/material";
import { CommonCart } from "../../../../components/common/card";
import { CommonTextFieldVer2 } from "../../../../components/common/text-field/text-field-2";
import { useValidation } from "../../../../context/validate";
import { IProductCreateSchema } from "../zod";
import { useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const SpecifiAttribute = () => {
  const { formData, setFieldValue } = useValidation<IProductCreateSchema>();
  const specifications = formData.specifications ?? [];

  // Ensure there's at least one entry on initial load
  useEffect(() => {
    if (specifications.length === 0) {
      setFieldValue("specifications", [
        {
          attributeName: "",
          attributeValue: "",
        },
      ]);
    }
  }, [specifications, setFieldValue]);

  const handleChange = (
    index: number,
    field: "attributeName" | "attributeValue",
    value: string
  ) => {
    const updated = [...specifications];
    updated[index] = { ...updated[index], [field]: value };
    setFieldValue("specifications", updated);

    // Nếu đang sửa dòng cuối cùng và cả hai field đều có dữ liệu → thêm dòng mới
    const isLast = index === specifications.length - 1;
    const lastFilled =
      updated[index].attributeName.trim() !== "" &&
      updated[index].attributeValue.trim() !== "";
    if (isLast && lastFilled) {
      setFieldValue("specifications", [
        ...updated,
        { attributeName: "", attributeValue: "" },
      ]);
    }
  };
  const handleDelete = (index: number) => {
    if (specifications.length <= 1) return;
    setFieldValue(
      "specifications",
      specifications.filter((_, i) => i != index)
    );
  };
  return (
    <CommonCart title="Thuộc tính đặc biệt">
      <Stack spacing={2}>
        {specifications.map((item, index) => (
          <Box sx={{ display: "flex", gap: 5, alignItems: "end" }} key={index}>
            <CommonTextFieldVer2
              label="Thuộc tính"
              value={item.attributeName}
              onChange={(val) => handleChange(index, "attributeName", val)}
            />
            <CommonTextFieldVer2
              label="Giá trị"
              value={item.attributeValue}
              onChange={(val) => handleChange(index, "attributeValue", val)}
            />
            <IconButton aria-label="delete" onClick={() => handleDelete(index)}>
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
    </CommonCart>
  );
};
