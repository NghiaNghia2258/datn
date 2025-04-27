import { Badge, Box, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import AccountMenu from "./account-menu";
interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        backgroundColor: "#fff",
        top: 1,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 60,
        padding: "0 50px",
        paddingLeft: "280px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ fontSize: "22px", fontWeight: "bold" }}>
        {title ?? "Dashboard"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Badge badgeContent={4} color="primary">
          <MailIcon color="action" />
        </Badge>
        <AccountMenu />
      </Box>
    </Box>
  );
};
