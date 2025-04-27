import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
function Footer() {
  return (
    <>
      {/* Footer */}
      <Box
        sx={{
          bgcolor: "background.paper",
          color: "text.secondary",
          pt: 6,
          pb: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                TECH SHOP
              </Typography>
              <Typography variant="body2" paragraph>
                Cung cấp sản phẩm công nghệ chính hãng với giá tốt nhất thị
                trường.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" sx={{ color: "#3b5998" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "#c32aa3" }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "#1da1f2" }}>
                  <TwitterIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Thông tin
              </Typography>
              <Typography variant="body2" paragraph>
                Về chúng tôi
              </Typography>
              <Typography variant="body2" paragraph>
                Chính sách bảo mật
              </Typography>
              <Typography variant="body2" paragraph>
                Điều khoản sử dụng
              </Typography>
              <Typography variant="body2" paragraph>
                Chính sách đổi trả
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Hỗ trợ khách hàng
              </Typography>
              <Typography variant="body2" paragraph>
                Trung tâm trợ giúp
              </Typography>
              <Typography variant="body2" paragraph>
                Hướng dẫn mua hàng
              </Typography>
              <Typography variant="body2" paragraph>
                Phương thức thanh toán
              </Typography>
              <Typography variant="body2" paragraph>
                Vận chuyển & giao hàng
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Liên hệ
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">1900 1234</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <MailIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">support@techshop.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                <HomeIcon fontSize="small" sx={{ mr: 1, mt: 0.3 }} />
                <Typography variant="body2">
                  123 Đường Công Nghệ, Quận 10,
                  <br />
                  TP. Hồ Chí Minh, Việt Nam
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} TECH SHOP. Tất cả quyền được bảo
              lưu.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Footer;
