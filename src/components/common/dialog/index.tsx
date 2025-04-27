import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { CommonButtonIcon } from "../button/button-icon";
import CloseIcon from "@mui/icons-material/Close";
import { CommonButton } from "../button";

export interface CommonDialogProps {
  isOpen?: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  showButton?: boolean;
}
export const CommonDialog: FC<CommonDialogProps> = ({
  isOpen,
  title,
  children,
  onClose,
  showButton,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          width: "500px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: 3,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 5, right: 10 }}>
          <CommonButtonIcon onClick={onClose} icon={<CloseIcon />} />
        </Box>
        <Typography
          sx={{
            fontSize: 14,
            p: 1.5,
            borderBottom: "1px solid #938a8a80",
          }}
          variant="h6"
          fontWeight="bold"
        >
          {title}
        </Typography>
        <Box>{children}</Box>
        {showButton && (
          <Box sx={{ borderTop: "1px solid #938a8a80" }}>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", p: 1, gap: 1 }}
            >
              <CommonButton
                vartiant="primary"
                title="Save"
                onClick={() => {
                  onConfirm && onConfirm();
                  onClose();
                }}
              />
              <CommonButton title="Cancel" onClick={onClose} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
