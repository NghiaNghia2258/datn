import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Badge,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import {
  AccountCircle,
  Email,
  Phone,
  LocationOn,
  Edit,
  CalendarToday,
  Favorite,
  ShoppingBag,
  Settings,
  Notifications,
  PhotoCamera,
  Save,
  Cancel,
} from "@mui/icons-material";

// Mock data
const userData = {
  id: "1234567",
  name: "Nguyễn Văn A",
  email: "nguyenvana@example.com",
  phone: "0987654321",
  address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
  birthday: "15/05/1990",
  avatar: "https://source.unsplash.com/random/?portrait",
  memberSince: "20/04/2020",
  rank: "Gold",
  points: 1450,
  orders: [
    {
      id: "ORD-001",
      date: "05/04/2025",
      total: "2,500,000đ",
      status: "Đã giao hàng",
    },
    {
      id: "ORD-002",
      date: "20/03/2025",
      total: "1,800,000đ",
      status: "Đã giao hàng",
    },
    {
      id: "ORD-003",
      date: "10/03/2025",
      total: "3,200,000đ",
      status: "Đã giao hàng",
    },
  ],
  wishlist: [
    {
      id: "P001",
      name: "iPhone 15 Pro",
      price: "28,990,000đ",
      image: "https://source.unsplash.com/random/?iphone",
    },
    {
      id: "P002",
      name: "MacBook Air M3",
      price: "32,490,000đ",
      image: "https://source.unsplash.com/random/?macbook",
    },
    {
      id: "P003",
      name: "AirPods Pro 2",
      price: "6,490,000đ",
      image: "https://source.unsplash.com/random/?airpods",
    },
  ],
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);
  const [openDialog, setOpenDialog] = useState(false);

  const handleTabChange = (_, newValue: any) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setEditedUserData(userData);
  };

  const handleSaveChanges = () => {
    // In a real app, you would send the updated data to the server
    // For now, we'll just toggle out of edit mode
    setEditMode(false);
    // Display success message or update userData state
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Left sidebar with user info */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <IconButton
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    width: 30,
                    height: 30,
                  }}
                  onClick={handleOpenDialog}
                >
                  <PhotoCamera sx={{ fontSize: 16 }} />
                </IconButton>
              }
            >
              <Avatar
                src={userData.avatar}
                sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
              />
            </Badge>

            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              {userData.name}
            </Typography>

            <Chip
              label={`Hạng ${userData.rank}`}
              color="primary"
              sx={{ mb: 2 }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              ID Khách hàng: {userData.id}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Thành viên từ: {userData.memberSince}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Typography
                variant="h6"
                color="primary.main"
                sx={{ fontWeight: "bold" }}
              >
                {userData.points}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                điểm thưởng
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <List sx={{ width: "100%" }}>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={userData.email}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Phone color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Số điện thoại"
                  secondary={userData.phone}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Địa chỉ"
                  secondary={userData.address}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <CalendarToday color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Ngày sinh"
                  secondary={userData.birthday}
                  primaryTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                  secondaryTypographyProps={{ variant: "body1" }}
                />
              </ListItem>
            </List>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<Edit />}
              onClick={handleEditToggle}
              fullWidth
              sx={{ mt: 2 }}
            >
              Chỉnh sửa thông tin
            </Button>
          </Paper>
        </Grid>

        {/* Main content area */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper elevation={3} sx={{ minHeight: "80vh" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="profile tabs"
                sx={{
                  px: 2,
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                  },
                }}
              >
                <Tab
                  icon={<AccountCircle />}
                  iconPosition="start"
                  label="Thông tin cá nhân"
                />
                <Tab
                  icon={<ShoppingBag />}
                  iconPosition="start"
                  label="Đơn hàng của tôi"
                />
                <Tab
                  icon={<Favorite />}
                  iconPosition="start"
                  label="Sản phẩm yêu thích"
                />
                <Tab
                  icon={<Notifications />}
                  iconPosition="start"
                  label="Thông báo"
                />
                <Tab icon={<Settings />} iconPosition="start" label="Cài đặt" />
              </Tabs>
            </Box>

            {/* Profile Information Tab */}
            <TabPanel value={tabValue} index={0}>
              {editMode ? (
                <Box component="form" noValidate autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Họ tên"
                        name="name"
                        value={editedUserData.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editedUserData.email}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        name="phone"
                        value={editedUserData.phone}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Ngày sinh"
                        name="birthday"
                        value={editedUserData.birthday}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        name="address"
                        value={editedUserData.address}
                        onChange={handleInputChange}
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={handleEditToggle}
                        >
                          Hủy
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Save />}
                          onClick={handleSaveChanges}
                        >
                          Lưu thay đổi
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 500 }}
                  >
                    Thông tin cá nhân
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Quản lý thông tin cá nhân của bạn để bảo mật tài khoản
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 3, bgcolor: "background.default" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Thông tin tài khoản
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                              ID Khách hàng
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">
                              {userData.id}
                            </Typography>
                          </Grid>

                          <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                              Hạng thành viên
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">
                              {userData.rank}
                            </Typography>
                          </Grid>

                          <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                              Điểm thưởng
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">
                              {userData.points} điểm
                            </Typography>
                          </Grid>

                          <Grid item xs={4}>
                            <Typography variant="body2" color="text.secondary">
                              Thành viên từ
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">
                              {userData.memberSince}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper
                        variant="outlined"
                        sx={{ p: 3, bgcolor: "background.default" }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Tổng quan hoạt động
                        </Typography>

                        <Grid container spacing={3} sx={{ mt: 1 }}>
                          <Grid item xs={4}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "primary.lighter",
                                borderRadius: 2,
                              }}
                            >
                              <Typography variant="h4" color="primary.main">
                                {userData.orders.length}
                              </Typography>
                              <Typography variant="body2">Đơn hàng</Typography>
                            </Paper>
                          </Grid>

                          <Grid item xs={4}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "error.lighter",
                                borderRadius: 2,
                              }}
                            >
                              <Typography variant="h4" color="error.main">
                                {userData.wishlist.length}
                              </Typography>
                              <Typography variant="body2">
                                Sản phẩm yêu thích
                              </Typography>
                            </Paper>
                          </Grid>

                          <Grid item xs={4}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                textAlign: "center",
                                bgcolor: "success.lighter",
                                borderRadius: 2,
                              }}
                            >
                              <Typography variant="h4" color="success.main">
                                0
                              </Typography>
                              <Typography variant="body2">Đánh giá</Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </TabPanel>

            {/* Orders Tab */}
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h5" gutterBottom>
                Đơn hàng của tôi
              </Typography>

              <Typography variant="body1" paragraph>
                Theo dõi và quản lý tất cả đơn hàng của bạn
              </Typography>

              <Divider sx={{ my: 3 }} />

              {userData.orders.map((order) => (
                <Paper
                  key={order.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    },
                    transition: "box-shadow 0.3s ease-in-out",
                  }}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="body1" fontWeight="bold">
                        {order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.date}
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography
                        variant="body1"
                        color="primary.main"
                        fontWeight="bold"
                      >
                        {order.total}
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Chip label={order.status} color="success" size="small" />
                    </Grid>

                    <Grid item xs={3} sx={{ textAlign: "right" }}>
                      <Button variant="outlined" size="small">
                        Chi tiết
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Button variant="contained" color="primary">
                  Xem tất cả đơn hàng
                </Button>
              </Box>
            </TabPanel>

            {/* Wishlist Tab */}
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h5" gutterBottom>
                Sản phẩm yêu thích
              </Typography>

              <Typography variant="body1" paragraph>
                Danh sách sản phẩm bạn đã đánh dấu yêu thích
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                {userData.wishlist.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": {
                          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        },
                        transition: "box-shadow 0.3s ease-in-out",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          pt: "56.25%" /* 16:9 aspect ratio */,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "background.paper",
                            color: "error.main",
                            "&:hover": { bgcolor: "error.lighter" },
                          }}
                        >
                          <Favorite color="error" />
                        </IconButton>
                      </Box>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="primary.main"
                          fontWeight="bold"
                        >
                          {product.price}
                        </Typography>
                      </CardContent>

                      <CardActions
                        sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                      >
                        <Button size="small" variant="outlined">
                          Chi tiết
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                        >
                          Thêm vào giỏ
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={tabValue} index={3}>
              <Typography variant="h5" gutterBottom>
                Thông báo
              </Typography>

              <Typography variant="body1" paragraph>
                Quản lý thông báo và tin tức của bạn
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ textAlign: "center", py: 8 }}>
                <Notifications
                  sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6">Không có thông báo mới</Typography>
                <Typography variant="body1" color="text.secondary">
                  Bạn hiện không có thông báo nào cần xem
                </Typography>
              </Box>
            </TabPanel>

            {/* Settings Tab */}
            <TabPanel value={tabValue} index={4}>
              <Typography variant="h5" gutterBottom>
                Cài đặt tài khoản
              </Typography>

              <Typography variant="body1" paragraph>
                Quản lý cài đặt và tùy chọn tài khoản của bạn
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 3, bgcolor: "background.default" }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Thay đổi mật khẩu
                    </Typography>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Mật khẩu hiện tại"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Mật khẩu mới"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Xác nhận mật khẩu mới"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary">
                          Cập nhật mật khẩu
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 3, bgcolor: "background.default" }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Tùy chọn thông báo
                    </Typography>

                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Thông báo qua Email"
                          secondary="Nhận thông báo về đơn hàng, khuyến mãi và tin tức"
                        />
                        <Button variant="outlined" size="small">
                          Đăng ký
                        </Button>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText
                          primary="Thông báo qua SMS"
                          secondary="Nhận thông báo về đơn hàng qua tin nhắn SMS"
                        />
                        <Button variant="outlined" color="error" size="small">
                          Hủy đăng ký
                        </Button>
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <ListItemText
                          primary="Thông báo trong ứng dụng"
                          secondary="Nhận thông báo trên trang web và ứng dụng di động"
                        />
                        <Button variant="outlined" size="small">
                          Đăng ký
                        </Button>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 3, bgcolor: "background.default" }}
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "error.main" }}
                    >
                      Vùng nguy hiểm
                    </Typography>

                    <Typography
                      variant="body2"
                      paragraph
                      color="text.secondary"
                    >
                      Các hành động dưới đây không thể hoàn tác. Hãy thận trọng!
                    </Typography>

                    <Button variant="outlined" color="error">
                      Vô hiệu hóa tài khoản
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Avatar Change Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Thay đổi ảnh đại diện</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <Avatar
              src={userData.avatar}
              sx={{ width: 120, height: 120, mx: "auto" }}
            />

            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              Tải ảnh lên
              <input type="file" hidden accept="image/*" />
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              Hỗ trợ file: JPG, PNG. Kích thước tối đa: 5MB
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
