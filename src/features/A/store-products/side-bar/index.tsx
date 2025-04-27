import {
  Box,
  Grid,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import { Twitter, Phone, LocationOn, Email } from "@mui/icons-material";
import RangePrice from "./range-price";
import Brands from "./branch";
import { useStoreProduct } from "../../../../context/U/store-products";
import Category from "./category";
function Sidebar() {
  const { storeData } = useStoreProduct();
  return (
    <Grid item md={3} lg={2.5}>
      <Category />
      <RangePrice />
      <Brands />

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Thông tin shop
        </Typography>

        <List disablePadding>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LocationOn fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={storeData.location}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Phone fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={storeData.contactPhone}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>

          <ListItem sx={{ px: 0 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Email fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={storeData.contactEmail}
              primaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        </List>

        <Box sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
          <IconButton size="small" aria-label="facebook" color="primary">
            <Facebook />
          </IconButton>
          <IconButton size="small" aria-label="instagram" color="primary">
            <Instagram />
          </IconButton>
          <IconButton size="small" aria-label="twitter" color="primary">
            <Twitter />
          </IconButton>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Sidebar;
