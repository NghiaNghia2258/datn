import { IconButton, Tooltip } from "@mui/material";
import React, { FC } from "react";
export interface CommonButtonProps {
  icon: React.ReactElement;
  textTooltip?: string;
  onClick?: () => void;
}
export const CommonButtonIcon: FC<CommonButtonProps> = ({
  icon,
  textTooltip,
  onClick,
}) => {
  return (
    <Tooltip title={textTooltip}>
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor: "#303030",
          borderRadius: "8px",
          fontSize: "12px",
          textTransform: "none",
          fontWeight: "bold",
          color: "#fff",
          p: "4px",
          boxShadow:
            "0rem -0.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem 0.0625rem rgba(0, 0, 0, .1) inset, 0rem 0.03125rem 0rem 0.09375rem #fff inset", // Hiệu ứng bóng trên mờ nhẹ
          "&:hover": {
            backgroundColor: "#303030",
            transform: "scale(1)",
            boxShadow:
              "0px 6px 8px rgba(0, 0, 0, 0.15), 0px -2px 5px rgba(255, 255, 255, 0.7)",
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
