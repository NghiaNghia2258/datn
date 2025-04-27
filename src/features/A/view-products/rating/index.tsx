import { FC, useEffect, useState } from "react";
import { useViewProduct } from "../../../../context/A/view-products";
import { ResponseStatisticsOneProduct } from "../../../../services/response/product.response";
import {
  Box,
  Skeleton,
  Typography,
  Rating,
  LinearProgress,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import { CommonCart } from "../../../../components/common/card";
import StarIcon from "@mui/icons-material/Star";
import SellIcon from "@mui/icons-material/Sell";

export const RatingStatistics: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rate, setRate] = useState<ResponseStatisticsOneProduct | undefined>(
    undefined
  );
  const { getProductRateById, productIdViewStatistics } = useViewProduct();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await getProductRateById(productIdViewStatistics);
      setRate(res);
      setLoading(false);
    };
    fetchData();
  }, [productIdViewStatistics]);

  if (loading) {
    return (
      <CommonCart title="Thống kê">
        <Box>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      </CommonCart>
    );
  }

  return (
    rate && (
      <CommonCart title="Thống kê">
        <Box sx={{ p: 2 }}>
          {/* Summary Section */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                component="div"
                color="primary"
                sx={{ fontWeight: "bold" }}
              >
                {rate.rate.toFixed(1)}
              </Typography>
              <Rating value={rate.rate} precision={0.5} readOnly size="large" />
              <Typography variant="body2" color="text.secondary">
                {rate.rateCount} lượt đánh giá
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              {/* Rating Distribution */}
              <Box>
                <StarRatingBar
                  stars={5}
                  count={rate.ratingFiveStar}
                  total={rate.rateCount}
                />
                <StarRatingBar
                  stars={4}
                  count={rate.ratingFourStar}
                  total={rate.rateCount}
                />
                <StarRatingBar
                  stars={3}
                  count={rate.ratingThreeStar}
                  total={rate.rateCount}
                />
                <StarRatingBar
                  stars={2}
                  count={rate.ratingTwoStar}
                  total={rate.rateCount}
                />
                <StarRatingBar
                  stars={1}
                  count={rate.ratingOneStar}
                  total={rate.rateCount}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Additional Stats */}
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Chip
              icon={<SellIcon />}
              label={`Đã bán: ${rate.sellCount}`}
              color="success"
              variant="outlined"
            />
            <Chip
              icon={<StarIcon />}
              label={`ID: ${rate.productId}`}
              variant="outlined"
            />
          </Box>
        </Box>
      </CommonCart>
    )
  );
};

// Helper component for star rating bars
const StarRatingBar: FC<{ stars: number; count: number; total: number }> = ({
  stars,
  count,
  total,
}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ minWidth: "60px" }}>
        {stars} <StarIcon sx={{ fontSize: 16, mb: -0.3, color: "gold" }} />
      </Typography>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 1,
          width: "100%",
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor:
              stars >= 4 ? "#388e3c" : stars >= 3 ? "#f57c00" : "#d32f2f",
          },
        }}
      />
      <Typography variant="body2" sx={{ minWidth: "60px" }}>
        {count} ({percentage.toFixed(1)}%)
      </Typography>
    </Stack>
  );
};
