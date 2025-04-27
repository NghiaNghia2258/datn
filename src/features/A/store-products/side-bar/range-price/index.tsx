import { Box, Paper, Slider, Typography } from "@mui/material";
import { useStoreProduct } from "../../../../../context/U/store-products";
import { formatPrice } from "../../../../../utils/format-price";

function RangePrice() {
  const { priceRange, setPriceRange } = useStoreProduct();
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Khoảng giá
      </Typography>

      <Box sx={{ px: 1 }}>
        <Slider
          value={priceRange}
          onChange={(_, value) => setPriceRange(value as number[])}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatPrice(value)}
          min={0}
          max={40000000}
          step={500000}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography variant="body2">{formatPrice(priceRange[0])}</Typography>
          <Typography variant="body2">{formatPrice(priceRange[1])}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default RangePrice;
