import { Checkbox, FormControlLabel, FormControl } from "@mui/material";

export type CommonBooleanCheckboxVer2Props = {
  label: string;
  value: boolean;
  onChange?: (value: boolean) => void;
};

export const CommonBooleanCheckboxVer2 = ({
  label,
  value,
  onChange,
}: CommonBooleanCheckboxVer2Props) => {
  return (
    <FormControl>
      <FormControlLabel
        sx={{ margin: 0 }}
        control={
          <Checkbox
            checked={value}
            onChange={(e) => onChange && onChange(e.target.checked)}
            sx={{
              color: "#000000 !important",
              transform: "scale(0.8)",
              padding: 0,
            }}
          />
        }
        label={label}
      />
    </FormControl>
  );
};
