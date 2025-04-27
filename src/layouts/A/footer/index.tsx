import { Box } from "@mui/material";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        color: "#8b8989",
        transform: "translateX(-50%)",
        fontSize: 12,
        padding: "10px",
      }}
    >
      Create by nghĩa nghĩa
    </Box>
  );
};
