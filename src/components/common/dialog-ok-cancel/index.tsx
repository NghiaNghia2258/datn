import React from "react";
import { Box, Typography } from "@mui/material";
import { CommonButton } from "../button";

interface CommonDialogOkCancelProps {
  open: boolean;
  title?: string;
  content?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const CommonDialogOkCancel: React.FC<CommonDialogOkCancelProps> = ({
  open,
  title = "Xác nhận",
  content = "Bạn có chắc chắn muốn tiếp tục?",
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Hủy",
}) => {
  if (!open) return null;

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
        }}
      >
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
        <Typography
          variant="body1"
          sx={{
            minHeight: 100,
            fontSize: 15,
            p: 1.5,
            borderBottom: "1px solid #938a8a80",
          }}
        >
          {content}
        </Typography>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 1.5 }}
        >
          <CommonButton
            onClick={onConfirm}
            vartiant="primary"
            title={confirmText}
          />
          <CommonButton title={cancelText} onClick={onClose}></CommonButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonDialogOkCancel;
