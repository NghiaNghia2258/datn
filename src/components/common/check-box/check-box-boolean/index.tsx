import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { useValidation } from "../../../../context/validate";

export type CommonBooleanCheckboxProps<T> = {
  name: keyof T;
  label: string;
};

export const CommonBooleanCheckbox = <T,>({
  name,
  label,
}: CommonBooleanCheckboxProps<T>) => {
  const { setFieldValue, formData, validationErrors } = useValidation<T>();

  const checked = Boolean(formData[name]);

  return (
    <FormControl error={!!validationErrors[name]}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(e) =>
              setFieldValue(name, e.target.checked as T[keyof T])
            }
            sx={{
              color: "#000000 !important",
              transform: "scale(0.8)",
              padding: 0,
            }}
          />
        }
        label={label}
      />
      {!!validationErrors[name] && (
        <FormHelperText>{validationErrors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
