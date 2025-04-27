import { FC, useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  Typography,
  Chip,
  Grid,
  Stack,
  Divider,
} from "@mui/material";
import { CommonCart } from "../../../../components/common/card";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoIcon from "@mui/icons-material/Info";
import CircleIcon from "@mui/icons-material/Circle";
import { useViewProduct } from "../../../../context/A/view-products";
import {
  ProductInventoryInfo,
  ProductStatus,
} from "../../../../services/response/product.response";

export const ProductInventoryInfoCard: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inventoryInfo, setInventoryInfo] = useState<
    ProductInventoryInfo | undefined
  >(undefined);
  const { getProductInventoryInfoById, productIdViewStatistics } =
    useViewProduct();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getProductInventoryInfoById(productIdViewStatistics);
      setInventoryInfo(res);
      setLoading(false);
    };
    fetchData();
  }, [productIdViewStatistics]);

  // Render status chip with appropriate color
  const renderStatusChip = (status: ProductStatus) => {
    let color: "success" | "error" | "warning" | "default";
    let label: string;

    switch (status) {
      case ProductStatus.ACTIVE:
        color = "success";
        label = "Đang bán";
        break;
      case ProductStatus.OUT_OF_STOCK:
        color = "warning";
        label = "Tạm hết hàng";
        break;
      case ProductStatus.DISCONTINUED:
        color = "error";
        label = "Ngừng kinh doanh";
        break;
      default:
        color = "default";
        label = "Không xác định";
    }

    return (
      <Chip
        icon={<CircleIcon fontSize="small" />}
        label={label}
        color={color}
        size="small"
      />
    );
  };

  // Calculate available stock (total stock minus pending orders)
  const calculateAvailableStock = () => {
    if (!inventoryInfo) return 0;
    return inventoryInfo.stockQuantity - inventoryInfo.pendingOrderQuantity;
  };

  if (loading) {
    return (
      <CommonCart title="Chi tiết tồn kho">
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" height={30} />
          <Skeleton variant="rectangular" height={100} />
        </Box>
      </CommonCart>
    );
  }

  return (
    inventoryInfo && (
      <CommonCart title="Chi tiết tồn kho">
        <Box sx={{ p: 2 }}>
          {/* Product Identification */}
          <Box sx={{ mb: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" component="div" sx={{ mb: 0.5 }}>
                  {inventoryInfo.name}
                </Typography>
                <Chip
                  icon={<InfoIcon fontSize="small" />}
                  label={`Mã: ${inventoryInfo.id}`}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                />
                {renderStatusChip(inventoryInfo.status)}
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Inventory Statistics */}
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <InventoryIcon color="primary" />
                <Typography variant="body1">Tồn kho hiện tại:</Typography>
              </Stack>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {inventoryInfo.stockQuantity}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <ShoppingCartIcon color="warning" />
                <Typography variant="body1">Đang chờ xử lý:</Typography>
              </Stack>
              <Typography variant="h6" fontWeight="bold" color="warning.main">
                {inventoryInfo.pendingOrderQuantity}
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "action.hover",
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Có thể bán:
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={
                  calculateAvailableStock() > 10 ? "success.main" : "error.main"
                }
              >
                {calculateAvailableStock()}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CommonCart>
    )
  );
};
