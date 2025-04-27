import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useValidation } from "../../../../context/validate";

export type DynamicInputArrayProps<T> = {
  variant?: "outlined" | "standard" | "filled";
  label: React.ReactNode;
  name: keyof T;
  type?: string;
  helpText?: string;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
};

export const DynamicInputArray = <T,>({
  label,
  variant,
  name,
  type,
  helpText,
  prefix,
  suffix,
}: DynamicInputArrayProps<T>) => {
  const { setFieldValue, formData, validationErrors } = useValidation<T>();
  // Khởi tạo state để theo dõi các giá trị input
  const [inputValues, setInputValues] = useState<string[]>([""]);

  // Cập nhật formData khi inputValues thay đổi
  useEffect(() => {
    setFieldValue(
      name as keyof T,
      inputValues.filter((val) => val !== "") as T[keyof T]
    );
  }, [inputValues, name, setFieldValue]);

  // Lấy giá trị từ formData khi component được mount
  useEffect(() => {
    if (formData[name] && Array.isArray(formData[name])) {
      const values = formData[name] as string[];
      // Luôn đảm bảo có một ô input trống ở cuối
      if (values.length > 0 && values[values.length - 1] !== "") {
        setInputValues([...values, ""]);
      } else {
        setInputValues(values.length > 0 ? values : [""]);
      }
    }
  }, [JSON.stringify(formData[name])]);

  // Xử lý khi giá trị input thay đổi
  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = value;

    // Nếu ô cuối cùng không còn trống, thêm một ô trống mới
    if (index === inputValues.length - 1 && value !== "") {
      newValues.push("");
    }

    setInputValues(newValues);
  };

  // Xóa một input
  const handleRemoveInput = (index: number) => {
    if (inputValues.length > 1) {
      const newValues = inputValues.filter((_, i) => i !== index);

      // Đảm bảo luôn có một ô trống ở cuối
      if (newValues.length > 0 && newValues[newValues.length - 1] !== "") {
        newValues.push("");
      }

      setInputValues(newValues);
    }
  };

  return (
    <Box>
      <Typography sx={{ marginBottom: "4px" }}>{label}</Typography>

      {inputValues.map((value, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TextField
            error={!!validationErrors[name]}
            sx={{
              flex: 1,
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
            variant={variant ?? "outlined"}
            onChange={(event) => handleInputChange(index, event.target.value)}
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

          {/* Nút xóa input (không hiển thị cho ô input trống cuối cùng) */}
          {(index < inputValues.length - 1 || inputValues.length > 1) && (
            <IconButton
              onClick={() => handleRemoveInput(index)}
              sx={{ ml: 1 }}
              size="small"
            >
              ×
            </IconButton>
          )}
        </Box>
      ))}

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

      {/* Hiển thị lỗi validation nếu có */}
      {validationErrors[name] && (
        <Typography
          sx={{
            fontSize: 12,
            color: "error.main",
            marginTop: "4px",
          }}
        >
          {validationErrors[name]}
        </Typography>
      )}
    </Box>
  );
};
