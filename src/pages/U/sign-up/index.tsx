import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  InputAdornment,
  Card,
  Divider,
} from "@mui/material";
import {
  Store as StoreIcon,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Instagram,
  Twitter,
  Description,
} from "@mui/icons-material";
import SingleImageUploader from "../../../components/common/image-upload";
import AuthService from "../../../services/auth.service";
import UploadService from "../../../services/upload.service";

const StoreRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileLogo, setFileLogo] = useState();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên cửa hàng là bắt buộc";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Địa chỉ là bắt buộc";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email liên hệ là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Email không hợp lệ";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.contactPhone)) {
      newErrors.contactPhone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      const urlLogo = await UploadService.upload(fileLogo);
      await AuthService.StoreRegist({
        ...formData,
        logo: urlLogo,
      });
      setSubmitSuccess(true);
      setFormData({
        name: "",
        description: "",
        logo: "",
        location: "",
        contactPhone: "",
        contactEmail: "",
        facebook: "",
        instagram: "",
        twitter: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ textAlign: "center", p: 4, backgroundColor: "#f8f9ff" }}>
          <StoreIcon sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
          <Typography variant="h4" color="success.main" gutterBottom>
            Đăng ký thành công!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Cửa hàng của bạn đã được đăng ký thành công. Chúng tôi sẽ liên hệ
            với bạn trong thời gian sớm nhất.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setSubmitSuccess(false)}
            size="large"
          >
            Đăng ký cửa hàng khác
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <StoreIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Đăng Ký Cửa Hàng
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Điền thông tin để đăng ký cửa hàng của bạn vào hệ thống
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Thông tin cơ bản */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <StoreIcon /> Thông tin cơ bản
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={1}>
              <SingleImageUploader
                initialImage={fileLogo}
                onChange={(file) => {
                  setFileLogo(file);
                }}
              />
            </Grid>

            <Grid item xs={12} md={11}>
              <TextField
                fullWidth
                label="Tên cửa hàng"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <StoreIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả cửa hàng"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                placeholder="Mô tả ngắn về cửa hàng của bạn..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1 }}
                    >
                      <Description />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Thông tin liên hệ */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <Phone /> Thông tin liên hệ
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                error={!!errors.location}
                helperText={errors.location}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email liên hệ"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleInputChange}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Mạng xã hội */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
              >
                <Facebook /> Mạng xã hội (tùy chọn)
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourstore"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourstore"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Instagram />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourstore"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Submit button */}
            <Grid item xs={12}>
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 200,
                    py: 1.5,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1976D2 30%, #1BA3D3 90%)",
                    },
                  }}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng Ký Cửa Hàng"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 3 }}>
            Vui lòng kiểm tra lại các thông tin bắt buộc
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default StoreRegistration;
