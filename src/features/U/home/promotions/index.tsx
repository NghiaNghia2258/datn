import { Box, Paper, Typography, InputBase, Button } from "@mui/material";

interface PromotionsProps {
  title: string;
  description: string;
  buttonText: string;
}

const Promotions: React.FC<PromotionsProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 0,
          borderRadius: 2,
          overflow: "hidden",
          backgroundColor: "primary.main",
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ color: "white", mb: { xs: 2, md: 0 } }}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {description}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", width: { xs: "100%", md: "auto" } }}>
            <InputBase
              placeholder="Email của bạn"
              sx={{
                backgroundColor: "white",
                pl: 2,
                borderRadius: "4px 0 0 4px",
                width: { xs: "70%", md: "250px" },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "0 4px 4px 0",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                },
              }}
            >
              {buttonText}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Promotions;
