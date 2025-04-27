import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchTextField({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
}: SearchTextFieldProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-block", width: "250px" }}>
      <TextField
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            paddingRight: "40px", // Chừa chỗ cho nút "X"
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <IconButton
        size="small"
        onClick={() => onChange("")}
        sx={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: value ? 1 : 0, // Ẩn khi không có nội dung
          transition: "opacity 0.2s ease-in-out",
          "&:hover": { opacity: 1 },
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
