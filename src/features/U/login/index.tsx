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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useToast } from "../../../context/toast";
import { useNavigate } from "react-router-dom";

const LoginWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[100],
}));

const LoginFormContainer = styled(Box)(({ theme }) => ({
  flex: "1 1 50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 480,
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

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const FeatCustomerLogin = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
    // Reset error when user types
    if (error) setError(null);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    if (!formData.email) {
      setError("Vui lòng nhập email");
      return false;
    }

    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu");
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

      showToast("Đăng nhập thành công!");
    } catch (err: any) {
      setError(
        err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Xử lý đăng nhập qua mạng xã hội
    showToast(`Đăng nhập qua ${provider} đang được phát triển`);
  };

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <LoginForm elevation={3}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Box
              component="img"
              src="https://ping.design/wp-content/uploads/2016/09/20160929-Free-Logos-12.jpg"
              alt="Logo"
              sx={{ height: 40, mr: 2 }}
            />
            <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
              Đăng nhập tài khoản
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
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
                      onClick={handleTogglePassword}
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
              sx={{ mb: 1 }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="Ghi nhớ đăng nhập"
              />
              <Link
                href="/customer/forgot-password"
                variant="body2"
                underline="hover"
              >
                Quên mật khẩu?
              </Link>
            </Box>

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
                  <LoginIcon />
                )
              }
              sx={{ mb: 3, py: 1.5 }}
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Hoặc đăng nhập bằng
              </Typography>
            </Divider>

            <Box sx={{ mb: 3 }}>
              <SocialButton
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin("Google")}
              >
                Đăng nhập với Google
              </SocialButton>

              <SocialButton
                fullWidth
                variant="outlined"
                color="primary"
                startIcon={<FacebookIcon sx={{ color: "#1877F2" }} />}
                onClick={() => handleSocialLogin("Facebook")}
              >
                Đăng nhập với Facebook
              </SocialButton>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Chưa có tài khoản?{" "}
                <Link
                  href="/customer/register"
                  variant="body2"
                  underline="hover"
                  sx={{ fontWeight: 600 }}
                >
                  Đăng ký ngay
                </Link>
              </Typography>

              <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<PersonAddAltIcon />}
                onClick={() => navigate("/customer/register")}
              >
                Tạo tài khoản mới
              </Button>
            </Box>
          </Box>
        </LoginForm>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 3, textAlign: "center" }}
        >
          © {new Date().getFullYear()} Công ty TNHH Thương mại Dịch vụ XYZ. Tất
          cả quyền được bảo lưu.
        </Typography>
      </LoginFormContainer>
    </LoginWrapper>
  );
};

export default FeatCustomerLogin;
