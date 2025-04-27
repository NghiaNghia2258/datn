import { Button } from "@mui/material";
import { FC } from "react";
export interface CommonButtonProps {
  title?: string;
  vartiant?: string;

  onClick?: () => void;
}
export const CommonButton: FC<CommonButtonProps> = ({
  title,
  vartiant,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: vartiant === "primary" ? "#303030" : "#ebeaea",
        color: vartiant !== "primary" ? "#303030" : "#fff",
        borderRadius: "8px",
        fontSize: "12px",
        textTransform: "none",
        fontWeight: "bold",
        boxShadow:
          "0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, .1) inset, 0rem 0.03125rem 0rem 0.09375rem #fff inset", // Hiệu ứng bóng trên mờ nhẹ
        "&:hover": {
          transform: "scale(1)",

          boxShadow:
            "0px 6px 8px rgba(0, 0, 0, 0.15), 0px -2px 5px rgba(255, 255, 255, 0.7)",
        },
      }}
    >
      {title}
    </Button>
  );
};
