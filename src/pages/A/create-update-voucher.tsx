import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Alert,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import VoucherService from "../../services/voucher.service";

const VoucherForm = () => {
  const [voucher, setVoucher] = useState({
    id: "",
    voucherCode: "",
    title: "",
    description: "",
    discountPercent: "",
    discountValue: "",
    maxDiscountValue: "",
    minOrderValue: "",
    usageLimit: "",
    startDate: new Date().toISOString().slice(0, 16), // yyyy-MM-ddThh:mm format
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16),
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // API call function
  const callAPI = async (method, url, data = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: "", message: "" });

    // Validation
    const newErrors = {};
    if (!voucher.voucherCode.trim())
      newErrors.voucherCode = "Mã voucher là bắt buộc";
    if (!voucher.title?.trim()) newErrors.title = "Tiêu đề là bắt buộc";
    if (!voucher.startDate) newErrors.startDate = "Ngày bắt đầu là bắt buộc";
    if (!voucher.expirationDate)
      newErrors.expirationDate = "Ngày hết hạn là bắt buộc";

    const startDateTime = new Date(voucher.startDate);
    const endDateTime = new Date(voucher.expirationDate);

    if (
      voucher.startDate &&
      voucher.expirationDate &&
      startDateTime >= endDateTime
    ) {
      newErrors.expirationDate = "Ngày hết hạn phải sau ngày bắt đầu";
    }
    if (!voucher.discountPercent && !voucher.discountValue) {
      newErrors.discount =
        "Phải có ít nhất một loại giảm giá (% hoặc giá trị cố định)";
    }
    if (
      voucher.discountPercent &&
      (voucher.discountPercent < 0 || voucher.discountPercent > 100)
    ) {
      newErrors.discountPercent = "Phần trăm giảm giá phải từ 0 đến 100";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const apiPayload = {
          voucherCode: voucher.voucherCode,
          title: voucher.title,
          description: voucher.description || null,
          discountPercent: voucher.discountPercent
            ? parseFloat(voucher.discountPercent)
            : null,
          discountValue: voucher.discountValue
            ? parseFloat(voucher.discountValue)
            : null,
          maxDiscountValue: voucher.maxDiscountValue
            ? parseFloat(voucher.maxDiscountValue)
            : null,
          minOrderValue: voucher.minOrderValue
            ? parseFloat(voucher.minOrderValue)
            : null,
          usageLimit: voucher.usageLimit ? parseInt(voucher.usageLimit) : null,
          startDate: new Date(voucher.startDate).toISOString(),
          expirationDate: new Date(voucher.expirationDate).toISOString(),
        };

        console.log("API Payload:", apiPayload);

        let result;
        if (isEditMode && voucher.id) {
          // Update API call
          result = await callAPI(
            "PUT",
            `/api/voucher/${voucher.id}`,
            apiPayload
          );
        } else {
          await VoucherService.create(apiPayload);
        }

        // Assuming your API returns { success: true/false, message: "..." }
        if (result.success !== false) {
          // Success if not explicitly false
          setSubmitStatus({
            type: "success",
            message: isEditMode
              ? "Cập nhật voucher thành công!"
              : "Tạo voucher thành công!",
          });

          if (!isEditMode) {
            // Reset form after successful creation
            handleReset();
          }
        } else {
          setSubmitStatus({
            type: "error",
            message: result.message || "Có lỗi xảy ra",
          });
        }
      } catch (error) {
        console.error("Submit Error:", error);
        setSubmitStatus({
          type: "error",
          message: "Có lỗi xảy ra. Vui lòng thử lại.",
        });
      }
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setVoucher((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
    // Clear general discount error
    if (field === "discountPercent" || field === "discountValue") {
      if (errors.discount) {
        setErrors((prev) => ({
          ...prev,
          discount: "",
        }));
      }
    }
  };

  const handleReset = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    setVoucher({
      id: "",
      voucherCode: "",
      title: "",
      description: "",
      discountPercent: "",
      discountValue: "",
      maxDiscountValue: "",
      minOrderValue: "",
      usageLimit: "",
      startDate: now.toISOString().slice(0, 16),
      expirationDate: nextWeek.toISOString().slice(0, 16),
    });
    setErrors({});
    setSubmitStatus({ type: "", message: "" });
    setIsEditMode(false);
  };

  const generateVoucherCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    handleInputChange("voucherCode", result);
  };

  // Load voucher for editing
  const loadVoucher = async (id) => {
    try {
      setLoading(true);
      const result = await callAPI("GET", `/api/voucher/${id}`);

      if (result && result.data) {
        const voucherData = result.data;
        setVoucher({
          id: voucherData.id,
          voucherCode: voucherData.voucherCode,
          title: voucherData.title || "",
          description: voucherData.description || "",
          discountPercent: voucherData.discountPercent || "",
          discountValue: voucherData.discountValue || "",
          maxDiscountValue: voucherData.maxDiscountValue || "",
          minOrderValue: voucherData.minOrderValue || "",
          usageLimit: voucherData.usageLimit || "",
          startDate: new Date(voucherData.startDate).toISOString().slice(0, 16),
          expirationDate: new Date(voucherData.expirationDate)
            .toISOString()
            .slice(0, 16),
        });
        setIsEditMode(true);
        setSubmitStatus({
          type: "success",
          message: "Đã tải thông tin voucher",
        });
      } else {
        setSubmitStatus({ type: "error", message: "Không tìm thấy voucher" });
      }
    } catch (error) {
      console.error("Load voucher error:", error);
      setSubmitStatus({ type: "error", message: "Có lỗi khi tải voucher" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 3 }}
        >
          {isEditMode ? "Sửa Mã Giảm Giá" : "Tạo Mã Giảm Giá Mới"}
        </Typography>

        {submitStatus.message && (
          <Alert severity={submitStatus.type} sx={{ mb: 3 }}>
            {submitStatus.message}
          </Alert>
        )}

        {errors.discount && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.discount}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Thông tin cơ bản */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Thông tin cơ bản
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        fullWidth
                        label="Mã Voucher"
                        value={voucher.voucherCode}
                        onChange={(e) =>
                          handleInputChange(
                            "voucherCode",
                            e.target.value.toUpperCase()
                          )
                        }
                        error={!!errors.voucherCode}
                        helperText={errors.voucherCode}
                        required
                        placeholder="Nhập mã voucher"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button
                        variant="outlined"
                        onClick={generateVoucherCode}
                        fullWidth
                        sx={{ height: "56px" }}
                        disabled={loading}
                      >
                        Tạo mã tự động
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Tiêu đề"
                        value={voucher.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        error={!!errors.title}
                        helperText={errors.title}
                        required
                        placeholder="Nhập tiêu đề voucher"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Mô tả"
                        value={voucher.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        multiline
                        rows={3}
                        placeholder="Nhập mô tả cho voucher"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Thông tin giảm giá */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Thông tin giảm giá
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Giảm giá theo %</InputLabel>
                        <OutlinedInput
                          type="number"
                          value={voucher.discountPercent}
                          onChange={(e) =>
                            handleInputChange("discountPercent", e.target.value)
                          }
                          endAdornment={
                            <InputAdornment position="end">%</InputAdornment>
                          }
                          label="Giảm giá theo %"
                          inputProps={{ min: 0, max: 100, step: 0.01 }}
                          error={!!errors.discountPercent}
                        />
                        {errors.discountPercent && (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 0.5, ml: 1.75 }}
                          >
                            {errors.discountPercent}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Giảm giá cố định</InputLabel>
                        <OutlinedInput
                          type="number"
                          value={voucher.discountValue}
                          onChange={(e) =>
                            handleInputChange("discountValue", e.target.value)
                          }
                          endAdornment={
                            <InputAdornment position="end">₫</InputAdornment>
                          }
                          label="Giảm giá cố định"
                          inputProps={{ min: 0, step: 10 }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Giảm giá tối đa</InputLabel>
                        <OutlinedInput
                          type="number"
                          value={voucher.maxDiscountValue}
                          onChange={(e) =>
                            handleInputChange(
                              "maxDiscountValue",
                              e.target.value
                            )
                          }
                          endAdornment={
                            <InputAdornment position="end">₫</InputAdornment>
                          }
                          label="Giảm giá tối đa"
                          inputProps={{ min: 0, step: 10 }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Giá trị đơn hàng tối thiểu</InputLabel>
                        <OutlinedInput
                          type="number"
                          value={voucher.minOrderValue}
                          onChange={(e) =>
                            handleInputChange("minOrderValue", e.target.value)
                          }
                          endAdornment={
                            <InputAdornment position="end">₫</InputAdornment>
                          }
                          label="Giá trị đơn hàng tối thiểu"
                          inputProps={{ min: 0, step: 10 }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Thông tin sử dụng và thời gian */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Thông tin sử dụng và thời gian
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Giới hạn sử dụng"
                        type="number"
                        value={voucher.usageLimit}
                        onChange={(e) =>
                          handleInputChange("usageLimit", e.target.value)
                        }
                        inputProps={{ min: 1 }}
                        placeholder="Nhập số lần sử dụng tối đa"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {/* Placeholder for balance */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày bắt đầu"
                        type="datetime-local"
                        value={voucher.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày hết hạn"
                        type="datetime-local"
                        value={voucher.expirationDate}
                        onChange={(e) =>
                          handleInputChange("expirationDate", e.target.value)
                        }
                        error={!!errors.expirationDate}
                        helperText={errors.expirationDate}
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Action buttons */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading}
                  size="large"
                >
                  Đặt lại
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (isEditMode) {
                      handleReset();
                    } else {
                      // Demo: load a sample voucher for editing
                      const sampleId = "sample-voucher-id";
                      loadVoucher(sampleId);
                    }
                  }}
                  disabled={loading}
                  size="large"
                >
                  {isEditMode
                    ? "Chuyển sang tạo mới"
                    : "Demo: Load voucher để sửa"}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  size="large"
                  sx={{ minWidth: 120 }}
                >
                  {loading
                    ? "Đang xử lý..."
                    : isEditMode
                      ? "Cập nhật"
                      : "Tạo mới"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default VoucherForm;
