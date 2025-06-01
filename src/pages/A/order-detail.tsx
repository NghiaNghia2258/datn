import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import {
  ArrowBack,
  ShoppingCart,
  Person,
  LocationOn,
  LocalOffer,
  Receipt,
  Edit,
} from "@mui/icons-material";
import OrderService from "../../context/A/view-orders/sevice";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [alert, setAlert] = useState(null);

  const paymentStatusOptions = [
    { value: 1, label: "Chờ thanh toán", color: "warning" },
    { value: 2, label: "Đã thanh toán", color: "success" },
    { value: 3, label: "Đã hủy", color: "error" },
    { value: 4, label: "Hoàn tiền", color: "info" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await OrderService.getById(orderId ?? "");
      setOrder(res);
      setSelectedStatus(res.paymentStatus);
      setLoading(false);
    };
    fetchData();
  }, [orderId]);

  const getStatusChip = (status) => {
    const statusOption = paymentStatusOptions.find(
      (opt) => opt.value === status
    );
    return (
      <Chip
        label={statusOption?.label || "Không xác định"}
        color={statusOption?.color || "default"}
        size="small"
      />
    );
  };

  const handleUpdateStatus = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setOrder((prev) => ({ ...prev, paymentStatus: selectedStatus }));
      setOpenStatusDialog(false);
      setAlert({
        type: "success",
        message: "Cập nhật trạng thái đơn hàng thành công!",
      });

      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Có lỗi xảy ra khi cập nhật trạng thái!",
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography>Đang tải...</Typography>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography>Không tìm thấy đơn hàng</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <IconButton onClick={() => window.history.back()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1">
          Chi tiết đơn hàng #{order.code}
        </Typography>
        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setOpenStatusDialog(true)}
            color="primary"
          >
            Cập nhật trạng thái
          </Button>
        </Box>
      </Stack>

      {/* Alert */}
      {alert && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Order Information */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Receipt color="primary" />
                <Typography variant="h6">Thông tin đơn hàng</Typography>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Mã đơn hàng
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {order.code}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Trạng thái
                  </Typography>
                  {getStatusChip(order.paymentStatus)}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Tên đơn hàng
                  </Typography>
                  <Typography variant="body1">
                    {order.name || "Không có"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Cửa hàng
                  </Typography>
                  <Typography variant="body1">{order.storeName}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Ghi chú
                  </Typography>
                  <Typography variant="body1">
                    {order.note || "Không có ghi chú"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Ngày tạo
                  </Typography>
                  <Typography variant="body1">
                    {formatDateTime(order.createdAt)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Người tạo
                  </Typography>
                  <Typography variant="body1">{order.createdName}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <Person color="primary" />
                <Typography variant="h6">Thông tin khách hàng</Typography>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Tên khách hàng
                  </Typography>
                  <Typography variant="body1">
                    {order.customerName || "Khách lẻ"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Số điện thoại
                  </Typography>
                  <Typography variant="body1">
                    {order.customerPhone || "Không có"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Ghi chú khách hàng
                  </Typography>
                  <Typography variant="body1">
                    {order.customerNote || "Không có ghi chú"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <LocationOn color="primary" />
                  <Typography variant="h6">Địa chỉ giao hàng</Typography>
                </Stack>

                <Typography variant="body1" fontWeight="bold">
                  {order.shippingAddress.recipientName}
                </Typography>
                <Typography variant="body1">
                  {order.shippingAddress.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  {order.shippingAddress.fullAddress}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" mb={2}>
                Tổng kết đơn hàng
              </Typography>

              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Tạm tính:</Typography>
                  <Typography variant="body2">
                    {formatCurrency(
                      order.totalPrice + (order.discountValue || 0)
                    )}
                  </Typography>
                </Stack>

                {order.discountPercent > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2">
                      Giảm giá ({order.discountPercent}%):
                    </Typography>
                    <Typography variant="body2" color="error">
                      -{formatCurrency(order.discountValue || 0)}
                    </Typography>
                  </Stack>
                )}

                {order.voucherCode && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocalOffer fontSize="small" color="secondary" />
                    <Typography variant="body2">
                      Mã giảm giá: {order.voucherCode}
                    </Typography>
                  </Stack>
                )}

                <Divider />

                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="h6">Tổng cộng:</Typography>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(order.totalPrice)}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Items */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <ShoppingCart color="primary" />
                <Typography variant="h6">Sản phẩm trong đơn hàng</Typography>
              </Stack>

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell>Thông tin</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="right">Đơn giá</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar
                              src={item.imageUrl}
                              alt={item.productVariant?.name}
                              sx={{ width: 60, height: 60 }}
                              variant="rounded"
                            />
                            <Box>
                              <Typography variant="body1" fontWeight="bold">
                                {item.productVariant?.name}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item.productVariant?.propertyValue1}
                          </Typography>
                          <Typography variant="body2">
                            {item.productVariant?.propertyValue2}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1" fontWeight="bold">
                            {item.quantity}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {formatCurrency(item.unitPrice)}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1" fontWeight="bold">
                            {formatCurrency(item.unitPrice * item.quantity)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Update Dialog */}
      <Dialog
        open={openStatusDialog}
        onClose={() => setOpenStatusDialog(false)}
      >
        <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={selectedStatus}
              label="Trạng thái"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {paymentStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Hủy</Button>
          <Button onClick={handleUpdateStatus} variant="contained">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetail;
