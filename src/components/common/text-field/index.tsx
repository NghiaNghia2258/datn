import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import { useValidation } from "../../../context/validate";

export type CommonTextFieldProps<T> = {
  variant?: "outlined" | "standard" | "filled";
  label: React.ReactNode;
  name: keyof T;
  type?: string;
  helpText?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
};

export const CommonTextField = <T,>({
  label,
  variant,
  name,
  type,
  helpText,
  prefix,
  suffix,
}: CommonTextFieldProps<T>) => {
  const { setFieldValue, formData, validationErrors } = useValidation<T>();
  return (
    <Box>
      <Typography sx={{ marginBottom: "4px" }}>{label}</Typography>
      <TextField
        error={!!validationErrors[name]}
        helperText={validationErrors[name] || ""}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "& label.MuiFormLabel-filled": { top: 0 },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8a8a8a",
          },
          "& .MuiInputLabel-root": {
            fontSize: "14px",
            top: -10,
          },
          "& input": {
            fontSize: "14px",
            padding: "5px 10px",
          },
        }}
        label={""}
        variant={variant ?? "outlined"}
        onChange={(event) =>
          setFieldValue(name as keyof T, event.target.value as T[keyof T])
        }
        value={formData[name] ?? ""}
        type={type ?? "text"}
        InputProps={{
          startAdornment: prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : undefined,
          endAdornment: suffix ? (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ) : undefined,
        }}
      />
      {helpText && (
        <Typography
          sx={{
            fontSize: 12,
            color: "#616161",
            marginTop: "4px",
            fontWeight: 400,
          }}
        >
          {helpText}
        </Typography>
      )}
    </Box>
  );
};
