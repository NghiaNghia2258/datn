import {
  Radio,
  FormControlLabel,
  FormHelperText,
  FormControl,
  FormGroup,
} from "@mui/material";
import React from "react";
import { useValidation } from "../../../context/validate";

export type OptionItemRaidoButton = {
  label: React.ReactNode;
  value: string;
};

export type CommonRadioButtonProps<T> = {
  name: keyof T;
  options: OptionItemRaidoButton[];
  direction?: "row" | "column"; // Thêm props direction
};

export const CommonRadioButton = <T,>({
  name,
  options,
  direction = "column", // Mặc định là dọc
}: CommonRadioButtonProps<T>) => {
  const { setFieldValue, formData, validationErrors } = useValidation<T>();
  const value = (formData[name] ?? "") as string;

  return (
    <FormControl error={!!validationErrors[name]}>
      <FormGroup row={direction === "row"}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Radio
                sx={{
                  transform: "scale(0.9)",
                }}
                checked={value === option.value}
                onChange={() => setFieldValue(name, option.value as T[keyof T])}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      {!!validationErrors[name] && (
        <FormHelperText>{validationErrors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
