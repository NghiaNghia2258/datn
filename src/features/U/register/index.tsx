import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import { useToast } from "../../../context/toast";
import { useNavigate } from "react-router-dom";

const RegisterWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[100],
}));

const RegisterFormContainer = styled(Box)(({ theme }) => ({
  flex: "1 1 50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const RegisterForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 600,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const SocialButton = styled(Button)(({ theme }) => ({
  justifyContent: "flex-start",
  textAlign: "left",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  "& .MuiButton-startIcon": {
    marginRight: theme.spacing(2),
  },
}));

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: string;
  agreeTerms: boolean;
}

const FeatCustomerRegister = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "male",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "agreeTerms" ? checked : value,
    });
    // Reset error when user types
    if (error) setError(null);
  };

  const handleTogglePassword = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.fullName) {
      setError("Vui lòng nhập họ tên");
      return false;
    }

    if (!formData.email) {
      setError("Vui lòng nhập email");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }

    if (!formData.phone) {
      setError("Vui lòng nhập số điện thoại");
      return false;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Số điện thoại không hợp lệ");
      return false;
    }

    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return false;
    }

    if (!formData.agreeTerms) {
      setError("Bạn cần đồng ý với điều khoản sử dụng");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      // Mô phỏng API call (sẽ thay bằng API thực)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showToast("Đăng ký tài khoản thành công!");
      navigate("/customer/login");
    } catch (err: any) {
      setError(
        err.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Xử lý đăng nhập qua mạng xã hội
    showToast(`Đăng ký qua ${provider} đang được phát triển`);
  };

  return (
    <RegisterWrapper>
      <RegisterFormContainer>
        <RegisterForm elevation={3}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              component="img"
              src="https://ping.design/wp-content/uploads/2016/09/20160929-Free-Logos-12.jpg"
              alt="Logo"
              sx={{ height: 40, mr: 2 }}
            />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Đăng ký tài khoản
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullName"
                  label="Họ và tên"
                  name="fullName"
                  autoComplete="name"
                  autoFocus
                  value={formData.fullName}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Số điện thoại"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Địa chỉ"
                  name="address"
                  autoComplete="street-address"
                  value={formData.address}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Giới tính</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Nữ"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Khác"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleTogglePassword("password")}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            handleTogglePassword("confirmPassword")
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Tôi đồng ý với{" "}
                      <Link href="/terms" underline="hover">
                        Điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link href="/privacy" underline="hover">
                        Chính sách bảo mật
                      </Link>
                    </Typography>
                  }
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <HowToRegIcon />
                )
              }
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Hoặc đăng ký bằng
              </Typography>
            </Divider>

            <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
              <SocialButton
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin("Google")}
              >
                Google
              </SocialButton>

              <SocialButton
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
                onClick={() => handleSocialLogin("Facebook")}
              >
                Facebook
              </SocialButton>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Đã có tài khoản?{" "}
                <Link
                  href="/customer/login"
                  variant="body2"
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  Đăng nhập ngay
                </Link>
              </Typography>

              <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<LoginIcon />}
                onClick={() => navigate("/customer/login")}
                sx={{ mt: 1 }}
              >
                Quay lại đăng nhập
              </Button>
            </Box>
          </Box>
        </RegisterForm>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, textAlign: "center" }}
        >
          © {new Date().getFullYear()} Công ty TNHH Thương mại Dịch vụ XYZ. Tất
          cả quyền được bảo lưu.
        </Typography>
      </RegisterFormContainer>
    </RegisterWrapper>
  );
};

export default FeatCustomerRegister;
