import { Box, Paper } from "@mui/material";
import { FC } from "react";
import { useHome } from "../../../../context/U/home";

interface BannerSliderProps {
  banners: any[];
}
const BannerSlider: FC<BannerSliderProps> = ({ banners }) => {
  const { currentBanner, setCurrentBanner } = useHome();
  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      <Paper
        elevation={2}
        sx={{
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          height: { xs: "200px", sm: "300px", md: "400px" },
        }}
      >
        {banners.map((banner, index) => (
          <Box
            key={banner.id}
            component="img"
            src={banner.image}
            alt={banner.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: currentBanner === index ? "block" : "none",
            }}
          />
        ))}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {banners.map((index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor:
                  currentBanner === index ? "primary.main" : "white",
                cursor: "pointer",
              }}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default BannerSlider;
