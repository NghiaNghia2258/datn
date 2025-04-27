import { Breadcrumbs, Typography, Link } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useStoreProduct } from "../../../../context/U/store-products";

export default function StoreBreadcrumbs() {
  const { storeData } = useStoreProduct();

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      <Link color="inherit" href="/" underline="hover">
        Trang chủ
      </Link>
      <Link color="inherit" href="/shops" underline="hover">
        Shops
      </Link>
      <Typography color="text.primary">{storeData.name}</Typography>
    </Breadcrumbs>
  );
}
