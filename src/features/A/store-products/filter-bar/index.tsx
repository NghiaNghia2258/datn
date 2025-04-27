import {
  Paper,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Pagination,
} from "@mui/material";
import { GridView, ViewList } from "@mui/icons-material";
import { useStoreProduct } from "../../../../context/U/store-products";

export default function FilterBar() {
  const {
    totalRecordsCount,
    optionFilter,
    setOptionFilter,
    viewMode,
    setViewMode,
  } = useStoreProduct();

  const sortBy = optionFilter.sortBy;
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {totalRecordsCount} sản phẩm
            </Typography>

            {/* Sort select */}
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="sort-select-label">Sắp xếp theo</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortBy}
                label="Sắp xếp theo"
                onChange={(e) => {
                  setOptionFilter({
                    ...optionFilter,
                    sortBy: e.target.value,
                  });
                }}
              >
                <MenuItem value="popular">Phổ biến nhất</MenuItem>
                <MenuItem value="newest">Mới nhất</MenuItem>
                <MenuItem value="price-asc">Giá: Thấp đến cao</MenuItem>
                <MenuItem value="price-desc">Giá: Cao đến thấp</MenuItem>
                <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{ mr: 1, display: { xs: "none", sm: "block" } }}
              >
                Hiển thị:
              </Typography>

              <IconButton
                color={viewMode === "grid" ? "primary" : "default"}
                onClick={() => setViewMode("grid")}
              >
                <GridView />
              </IconButton>

              <IconButton
                color={viewMode === "list" ? "primary" : "default"}
                onClick={() => setViewMode("list")}
              >
                <ViewList />
              </IconButton>
            </Box>

            <Box
              sx={{
                ml: 1,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ mx: 1 }}>
                Trang:
              </Typography>
              <Pagination
                count={totalRecordsCount / optionFilter.pageSize}
                page={optionFilter.pageIndex}
                onChange={(e) => {
                  console.log(e);
                }}
                size="small"
                siblingCount={0}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
