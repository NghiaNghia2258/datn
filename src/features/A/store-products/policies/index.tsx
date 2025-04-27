import { Paper, Grid, Box, Typography } from "@mui/material";
import {
  LocalShipping,
  KeyboardReturn,
  VerifiedUser,
} from "@mui/icons-material";
import { useStoreProduct } from "../../../../context/U/store-products";

export default function StorePolicies() {
  const { storeData } = useStoreProduct();
  const policies = storeData.policies;
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2}>
        {policies.map((policy, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {index === 0 && <LocalShipping color="primary" sx={{ mr: 1 }} />}
              {index === 1 && <KeyboardReturn color="primary" sx={{ mr: 1 }} />}
              {index === 2 && <VerifiedUser color="primary" sx={{ mr: 1 }} />}
              <Box>
                <Typography variant="subtitle2">{policy.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {policy.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
