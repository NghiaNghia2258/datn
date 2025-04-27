import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import React, { FC } from "react";

export type CommonTextFieldVer2Props = {
  variant?: "outlined" | "standard" | "filled";
  label: React.ReactNode;
  type?: string;
  helpText?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  value: string;
};

export const CommonTextFieldVer2 = ({
  label,
  variant,
  type,
  helpText,
  prefix,
  suffix,
  onChange,
  error,
  errorMessage,
  value,
}: CommonTextFieldVer2Props) => {
  return (
    <Box>
      <Typography sx={{ marginBottom: "4px" }}>{label}</Typography>
      <TextField
        error={error}
        helperText={errorMessage}
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
        onChange={(e) => onChange(e.target.value)}
        value={value}
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
