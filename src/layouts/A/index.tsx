import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./nav-bar";
import { Header } from "./header";
interface DashboardProps {}

export const DashboardLayout: React.FC<DashboardProps> = () => {
  return (
    <Box>
      <Navbar />
      <Header />
      <Box
        sx={{
          padding: "90px 150px 10px 425px",
          maxWidth: "1200px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
