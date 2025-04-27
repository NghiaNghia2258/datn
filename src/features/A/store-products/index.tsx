import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Close, CheckCircle } from "@mui/icons-material";
import Sidebar from "./side-bar";
import { StoreHeader } from "./header";
import StoreBreadcrumbs from "./bread-crumbs";
import StoreNavigationTabs from "./nav";
import ProductList from "./product-list";
import { useStoreProduct } from "../../../context/U/store-products";
import StorePolicies from "./policies";
import FilterBar from "./filter-bar";

export default function StoreProductsPage() {
  const { storeData } = useStoreProduct();
  const followStore = storeData.isFollow;
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <StoreHeader />
      <Container>
        <StoreBreadcrumbs />
        <StoreNavigationTabs />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <StorePolicies />

          <Box sx={{ display: "flex", gap: 5 }}>
            <Sidebar />
            <Box>
              <FilterBar />
              <ProductList />
            </Box>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
          {followStore ? "Đã theo dõi cửa hàng" : "Hủy theo dõi cửa hàng"}
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", py: 2 }}>
          {followStore ? (
            <>
              <CheckCircle
                sx={{ fontSize: 60, color: "success.main", mb: 2 }}
              />
              <Typography variant="body1">
                Bạn sẽ nhận được thông báo về sản phẩm mới và khuyến mãi từ{" "}
                {storeData.name}
              </Typography>
            </>
          ) : (
            <>
              <Close sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
              <Typography variant="body1">
                Bạn sẽ không nhận được thông báo từ {storeData.name} nữa
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
