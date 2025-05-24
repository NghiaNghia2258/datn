import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
  discount?: string;
}

const Product: React.FC<ProductProps> = ({ name, price, image, discount }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="200" image={image} alt={name} />
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "error.main",
            color: "white",
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          {discount && (
            <Typography variant="caption" fontWeight="bold">
              -{discount}%
            </Typography>
          )}
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="subtitle1" component="div" noWrap>
          {name}
        </Typography>
        <Typography variant="h6" color="primary" fontWeight="bold">
          {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth>
          Thêm vào giỏ
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
