import { Box, Typography } from "@mui/material";
import { FC } from "react";
export interface CommonPageProps {
  title: string;
  children: React.ReactNode;
}
const CommonPage: FC<CommonPageProps> = ({ title, children }) => {
  return (
    <Box>
      <Typography
        sx={{ marginBottom: 2, fontSize: "24px" }}
        variant="h6"
        fontWeight="bold"
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default CommonPage;
