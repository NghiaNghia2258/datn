import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { useValidation } from "../../../context/validate";

export type OptionItemCheckbox = {
  label: string;
  value: any;
};

export type CommonCheckboxProps<T> = {
  name: keyof T;
  options: OptionItemCheckbox[];
};

export const CommonCheckbox = <T,>({
  name,
  options,
}: CommonCheckboxProps<T>) => {
  const { setFieldValue, formData, validationErrors } = useValidation<T>();

  const selectedValues = (formData[name] as any[]) || [];

  const handleChange = (checked: boolean, value: any) => {
    const newValues = checked
      ? [...selectedValues, value] // Nếu chọn, thêm vào mảng
      : selectedValues.filter(
          (v) => JSON.stringify(v) !== JSON.stringify(value)
        );

    setFieldValue(name, newValues as T[keyof T]); // Cập nhật state
  };

  return (
    <FormControl error={!!validationErrors[name]}>
      {options.map((option, index) => (
        <FormControlLabel
          sx={{
            margin: 0,
            height: 28,
          }}
          key={index}
          control={
            <Checkbox
              className="lll"
              sx={{
                color: "#000000 !important;",
                transform: "scale(0.8)",
                padding: 0,
                "& span.Mui-checked": {},
              }}
              checked={selectedValues.some(
                (v) => JSON.stringify(v) === JSON.stringify(option.value)
              )}
              onChange={(event) =>
                handleChange(event.target.checked, option.value)
              }
            />
          }
          label={option.label}
        />
      ))}
      {!!validationErrors[name] && (
        <FormHelperText>{validationErrors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
