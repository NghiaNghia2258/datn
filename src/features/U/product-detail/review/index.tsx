import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { useProductDetail } from "../../../../context/U/product-detail";
import ProductDetailService from "../../../../context/U/product-detail/service";

// Labels for rating hover state
const labels = {
  0.5: "Rất tệ",
  1: "Tệ",
  1.5: "Yếu",
  2: "Không tốt",
  2.5: "Bình thường",
  3: "Khá",
  3.5: "Tốt",
  4: "Rất tốt",
  4.5: "Xuất sắc",
  5: "Tuyệt vời",
};

// Component chính - tự quản lý trạng thái, không cần truyền các props từ bên ngoài
const ReviewModal = () => {
  // State quản lý trạng thái mở/đóng của modal
  const { id } = useProductDetail();
  const [open, setOpen] = useState(true);

  // State cho đánh giá
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState(false);

  // State cho thông báo sau khi gửi đánh giá
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Mở modal đánh giá
  const handleOpenModal = () => {
    setOpen(true);
  };

  // Đóng modal và reset form
  const handleClose = () => {
    setValue(0);
    setReviewText("");
    setError(false);
    setOpen(false);
  };

  // Xử lý khi Submit form
  const handleSubmitReview = async () => {
    if (value === 0) {
      setError(true);
      return;
    }

    const reviewData = {
      productId: id,
      rating: value,
      comment: reviewText,
    };
    await ProductDetailService.customeReview(reviewData);

    // Hiển thị thông báo thành công
    setNotification({
      open: true,
      message: `Cảm ơn bạn đã đánh giá ${reviewData.rating} sao!`,
      severity: "success",
    });

    // Reset form
    setValue(0);
    setReviewText("");
    setError(false);
    setOpen(false);

    // Trong ứng dụng thực tế, ở đây bạn sẽ gửi dữ liệu đến API
  };

  // Đóng thông báo
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <>
      {/* Nút mở modal */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Đánh giá
      </Button>

      {/* Modal Đánh giá */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
          Đánh giá của bạn
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: "100%",
            }}
          >
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                component="legend"
                sx={{ mb: 2, fontSize: "1.1rem", fontWeight: 500 }}
              >
                Chọn đánh giá của bạn
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Rating
                  name="rating"
                  value={value}
                  precision={0.5}
                  size="large"
                  onChange={(_, newValue) => {
                    setValue(newValue ?? 0);
                    setError(false);
                  }}
                  onChangeActive={(_, newHover) => {
                    setHover(newHover);
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                  sx={{
                    "& .MuiRating-icon": {
                      fontSize: "2.5rem", // Tăng kích thước icon
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#c7c7c7",
                    },
                    "& .MuiRating-iconFilled": {
                      color: "#faaf00", // Màu vàng đậm hơn cho sao đã chọn
                    },
                  }}
                />
                {value !== null && (
                  <Box sx={{ mt: 0, minHeight: 30 }}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {labels[hover !== -1 ? hover : value]}
                    </Typography>
                  </Box>
                )}
                {error && (
                  <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                    Vui lòng chọn số sao đánh giá
                  </Typography>
                )}
              </Box>
            </Box>

            <TextField
              label="Chia sẻ trải nghiệm của bạn"
              multiline
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              fullWidth
              placeholder="Hãy chia sẻ những điều bạn thích hoặc không thích về sản phẩm/dịch vụ..."
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            color="primary"
          >
            Gửi đánh giá
          </Button>
        </DialogActions>
      </Dialog>

      {/* Thông báo khi đánh giá thành công */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewModal;
