import { Paper, Typography } from "@mui/material";
import React, { FC } from "react";

export interface CartProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}
export const CommonCart: FC<CartProps> = ({ children, title, className }) => {
  return (
    <Paper
      sx={{
        p: 2,
        border: "1px solid #e2e2e2",
      }}
      elevation={1}
      className={className}
    >
      {title && (
        <Typography
          sx={{
            fontWeight: "bold",
            mb: 1,
            fontSize: 18,
          }}
        >
          {title}
        </Typography>
      )}

      {/* Cart items */}
      {children}
    </Paper>
  );
};
