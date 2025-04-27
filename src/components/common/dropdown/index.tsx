import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useValidation } from "../../../context/validate";

export type OptionItemDropdown = {
  label: string;
  value: any;
};

export type CommonDropdownProps<T> = {
  name: keyof T;
  options: OptionItemDropdown[];
  label: string;
  helpText?: string;
};

export const CommonDropdown = <T,>({
  name,
  options,
  label,
  helpText,
}: CommonDropdownProps<T>) => {
  const { setFieldValue, formData, validationErrors } = useValidation<T>();

  return (
    <Box>
      <Typography sx={{ marginBottom: "4px" }}>{label}</Typography>
      <Autocomplete
        sx={{
          "& label.MuiFormLabel-root": { top: -10 },
          "& .MuiInputBase-root": {
            padding: "5px 10px !important",
            fontSize: "14px !important",
          },
          "& input": { padding: "0px !important" },
        }}
        disablePortal
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.find((opt) => opt.value === formData[name]) || null} // Đảm bảo controlled component
        onChange={(_, newValue) =>
          setFieldValue(name, newValue?.value as T[keyof T])
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={""}
            error={!!validationErrors[name]}
            helperText={validationErrors[name] || ""}
          />
        )}
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
