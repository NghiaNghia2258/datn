import { Button, Paper, Typography } from "@mui/material";
import { useStoreProduct } from "../../../../../context/U/store-products";

function NotFoundProduct() {
  const { setSelectedCategory, setPriceRange, setSelectedBrands } =
    useStoreProduct();

  return (
    <>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Không tìm thấy sản phẩm nào
        </Typography>
        <Typography variant="body1">
          Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            setSelectedCategory("all");
            setPriceRange([0, 40000000]);
            setSelectedBrands([]);
          }}
        >
          Xóa bộ lọc
        </Button>
      </Paper>
    </>
  );
}

export default NotFoundProduct;
