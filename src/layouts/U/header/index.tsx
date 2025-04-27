import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Tabs,
  Tab,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            display: { xs: "none", sm: "block" },
            flexGrow: 1,
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          TECH SHOP
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
          >
            TECH
          </Typography>
        </Box>

        <Box
          sx={{
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: "#f1f3f4",
            "&:hover": { backgroundColor: "#e4e6e8" },
            mr: 2,
            ml: 0,
            width: "100%",
            display: { xs: "none", sm: "flex" },
            maxWidth: "400px",
          }}
        >
          <IconButton sx={{ p: 1 }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Tìm sản phẩm..."
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ "aria-label": "tìm sản phẩm" }}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <IconButton
            size="large"
            aria-label="shows cart items"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {!isMobile && (
        <Toolbar
          variant="dense"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            minHeight: "40px",
          }}
        >
          <Container>
            <Tabs
              value={1}
              onChange={() => {}}
              variant="scrollable"
              scrollButtons="auto"
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab
                label="Trang chủ"
                icon={<HomeIcon fontSize="small" />}
                iconPosition="start"
              />
              <Tab label="Điện thoại" />
              <Tab label="Laptop" />
              <Tab label="Máy tính bảng" />
              <Tab label="Phụ kiện" />
              <Tab label="Đồng hồ" />
              <Tab label="Khuyến mãi" />
            </Tabs>
          </Container>
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
