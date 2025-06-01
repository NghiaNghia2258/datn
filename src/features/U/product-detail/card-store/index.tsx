import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Rating,
  Divider,
  Tooltip,
} from "@mui/material";
import { VerifiedUser, Storefront, Message } from "@mui/icons-material";
import { useProductDetail } from "../../../../context/U/product-detail";
import { useNavigateCommon } from "../../../../hooks/navigate";

export function CardStore() {
  const { storeData } = useProductDetail();
  const navigate = useNavigateCommon();

  return (
    <Box
      sx={{
        position: "relative",
        height: 240,
        color: "white",
        mb: 3,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          backgroundImage: `url(${storeData?.coverImage ?? "https://placehold.co/1500x300"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      />

      <Container sx={{ position: "relative", height: "100%", zIndex: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ height: "100%", alignItems: "center" }}
        >
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={storeData.logo}
                alt={storeData.name}
                sx={{
                  width: 100,
                  height: 100,
                  border: "4px solid white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              />

              <Box sx={{ ml: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography variant="h4" component="h1" sx={{ mr: 1 }}>
                    {storeData.name}
                  </Typography>

                  {storeData.verified && (
                    <Tooltip title="Cửa hàng đã xác thực">
                      <VerifiedUser color="primary" />
                    </Tooltip>
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating
                    value={storeData.rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({storeData.reviewCount} đánh giá)
                  </Typography>
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mx: 1, bgcolor: "rgba(255,255,255,0.5)" }}
                  />
                  <Typography variant="body2">
                    {storeData.followers} người theo dõi
                  </Typography>
                </Box>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {storeData.description}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant={"outlined"}
                startIcon={<Storefront />}
                onClick={() => navigate(`store-products/${storeData.id}`)}
                sx={{
                  borderColor: "white",
                  color: "inherit",
                  mr: 1,
                }}
              >
                Truy cập shop
              </Button>

              <Button
                variant="outlined"
                startIcon={<Message />}
                sx={{ borderColor: "white", color: "white" }}
              >
                Chat với shop
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
