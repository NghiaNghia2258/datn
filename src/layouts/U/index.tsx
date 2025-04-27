import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
interface DashboardProps {}

export const UserLayout: React.FC<DashboardProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};
