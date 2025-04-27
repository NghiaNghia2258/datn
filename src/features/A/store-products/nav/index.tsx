import { Box, Tabs, Tab } from "@mui/material";
import { useStoreProduct } from "../../../../context/U/store-products";

export default function StoreNavigationTabs() {
  const { storeData } = useStoreProduct();
  const categories = storeData.categories;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
      <Tabs
        value={1}
        onChange={() => {}}
        aria-label="store navigation tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Tất cả sản phẩm" />
        {categories.map((category) => (
          <Tab key={category} label={category} />
        ))}
        <Tab label="Thông tin cửa hàng" />
        <Tab label="Đánh giá" />
      </Tabs>
    </Box>
  );
}
