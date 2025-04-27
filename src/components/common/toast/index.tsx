import { Box, Snackbar, SnackbarOrigin } from "@mui/material";
import { FC } from "react";

interface CommonToastProps extends SnackbarOrigin {
  message: string;
  open: boolean;
  type?: string;
  onClose: () => void;
}
export const CommonToast: FC<CommonToastProps> = ({
  open,
  message,
  vertical,
  horizontal,
  onClose,
}) => {
  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={onClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  );
};
