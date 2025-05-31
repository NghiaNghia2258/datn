import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  IconButton,
  Link,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Store as StoreIcon,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle,
  Cancel,
  Block,
  Schedule,
  ArrowBack,
  Edit,
  Description,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import StoreProductService from "../../context/U/store-products/store-product.service";
import StoreService from "../../services/store.service";

// Mock data cho demo
const mockStoreData = {
  id: 1,
  name: "Cửa hàng thời trang ABC Fashion",
  description:
    "Chuyên bán quần áo thời trang nam nữ, phong cách trẻ trung hiện đại. Cam kết chất lượng và dịch vụ tốt nhất cho khách hàng.",
  logo: "https://via.placeholder.com/150x150?text=ABC+Fashion",
  location: "123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.Hồ Chí Minh",
  contactPhone: "0123456789",
  contactEmail: "contact@abcfashion.com",
  facebook: "https://facebook.com/abcfashion",
  instagram: "https://instagram.com/abcfashion",
  twitter: "https://twitter.com/abcfashion",
  verified: false,
  registeredDate: "2024-01-15T10:30:00",
  approvedDate: null,
  rejectedDate: null,
  blockedDate: null,
  adminNote: "",
};

const StoreDetailManagement = () => {
  const { id } = useParams();
  const [storeData, setStoreData] = useState(mockStoreData);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [blockReason, setBlockReason] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await StoreProductService.getStoreInfo(id ?? "");
      setStoreData(res);
    };
    fetchData();
  }, [id]);
  const getStatusColor = (status) => {
    return status ? "success" : "default";
  };

  const getStatusText = (status) => {
    return status ? "Đã phê duyệt" : "Chờ duyệt";
  };

  const handleApprove = async () => {
    await StoreService.Active(id);
    setStoreData((prev) => ({
      ...prev,
      verified: true,
    }));
    setSnackbar({
      open: true,
      message: "Cửa hàng đã được phê duyệt thành công!",
      severity: "success",
    });
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      return;
    }
    setStoreData((prev) => ({
      ...prev,
      status: "rejected",
      rejectedDate: new Date().toISOString(),
      adminNote: rejectReason,
    }));
    setOpenRejectDialog(false);
    setRejectReason("");
    setSnackbar({
      open: true,
      message: "Cửa hàng đã được từ chối!",
      severity: "info",
    });
  };

  const handleBlock = () => {
    if (!blockReason.trim()) {
      return;
    }
    setStoreData((prev) => ({
      ...prev,
      status: "blocked",
      blockedDate: new Date().toISOString(),
      adminNote: blockReason,
    }));
    setOpenBlockDialog(false);
    setBlockReason("");
    setSnackbar({
      open: true,
      message: "Cửa hàng đã được khóa!",
      severity: "warning",
    });
  };

  const handleUnblock = () => {
    setStoreData((prev) => ({
      ...prev,
      status: "approved",
      blockedDate: null,
      adminNote: "",
    }));
    setSnackbar({
      open: true,
      message: "Cửa hàng đã được mở khóa!",
      severity: "success",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa có";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={() => window.history.back()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Chi Tiết Cửa Hàng
        </Typography>
        <Chip
          label={getStatusText(storeData.verified)}
          color={getStatusColor(storeData.verified)}
          size="medium"
          icon={storeData.verified ? <CheckCircle /> : <Schedule />}
        />
      </Box>

      <Grid container spacing={3}>
        {/* Thông tin cơ bản */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <StoreIcon /> Thông tin cơ bản
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
              <Avatar
                src={storeData.logo}
                alt={storeData.name}
                sx={{ width: 100, height: 100 }}
                variant="rounded"
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {storeData.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {storeData.description || "Không có mô tả"}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Thông tin liên hệ */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Phone /> Thông tin liên hệ
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <LocationOn color="action" />
                  <Typography variant="body1">
                    <strong>Địa chỉ:</strong> {storeData.location}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Phone color="action" />
                  <Typography variant="body1">
                    <strong>Điện thoại:</strong> {storeData.contactPhone}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Email color="action" />
                  <Typography variant="body1">
                    <strong>Email:</strong> {storeData.contactEmail}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Mạng xã hội */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Facebook /> Mạng xã hội
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              {storeData.facebook && (
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Facebook color="action" />
                    <Link
                      href={storeData.facebook}
                      target="_blank"
                      rel="noopener"
                    >
                      Facebook
                    </Link>
                  </Box>
                </Grid>
              )}
              {storeData.instagram && (
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Instagram color="action" />
                    <Link
                      href={storeData.instagram}
                      target="_blank"
                      rel="noopener"
                    >
                      Instagram
                    </Link>
                  </Box>
                </Grid>
              )}
              {storeData.twitter && (
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Twitter color="action" />
                    <Link
                      href={storeData.twitter}
                      target="_blank"
                      rel="noopener"
                    >
                      Twitter
                    </Link>
                  </Box>
                </Grid>
              )}
              {!storeData.facebook &&
                !storeData.instagram &&
                !storeData.twitter && (
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ fontStyle: "italic" }}
                    >
                      Chưa cập nhật thông tin mạng xã hội
                    </Typography>
                  </Grid>
                )}
            </Grid>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Thông tin trạng thái */}
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin trạng thái
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Ngày đăng ký:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {formatDate(storeData.registeredDate)}
              </Typography>
            </Box>

            {storeData.approvedDate && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ngày phê duyệt:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(storeData.approvedDate)}
                </Typography>
              </Box>
            )}

            {storeData.rejectedDate && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ngày từ chối:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(storeData.rejectedDate)}
                </Typography>
              </Box>
            )}

            {storeData.blockedDate && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ngày khóa:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {formatDate(storeData.blockedDate)}
                </Typography>
              </Box>
            )}

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ID cửa hàng:
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                #{storeData.id}
              </Typography>
            </Box>
          </Paper>

          {/* Ghi chú admin */}
          {storeData.adminNote && (
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Description /> Ghi chú Admin
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                {storeData.adminNote}
              </Typography>
            </Paper>
          )}

          {/* Hành động */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Hành động
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {!storeData.verified && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={handleApprove}
                    fullWidth
                  >
                    Phê duyệt
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => setOpenRejectDialog(true)}
                    fullWidth
                  >
                    Từ chối
                  </Button>
                </>
              )}

              <Button
                variant="outlined"
                startIcon={<Edit />}
                fullWidth
                disabled
                sx={{ opacity: 0.6 }}
              >
                Chỉnh sửa thông tin
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog từ chối */}
      <Dialog
        open={openRejectDialog}
        onClose={() => setOpenRejectDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Từ chối cửa hàng</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Vui lòng nhập lý do từ chối cửa hàng này:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="Nhập lý do từ chối..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRejectDialog(false)}>Hủy</Button>
          <Button
            onClick={handleReject}
            color="error"
            variant="contained"
            disabled={!rejectReason.trim()}
          >
            Từ chối
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog khóa */}
      <Dialog
        open={openBlockDialog}
        onClose={() => setOpenBlockDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Khóa cửa hàng</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Vui lòng nhập lý do khóa cửa hàng này:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
            placeholder="Nhập lý do khóa..."
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBlockDialog(false)}>Hủy</Button>
          <Button
            onClick={handleBlock}
            color="warning"
            variant="contained"
            disabled={!blockReason.trim()}
          >
            Khóa cửa hàng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StoreDetailManagement;
