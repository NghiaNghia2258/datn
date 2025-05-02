import { Box, Card } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { DEFAULT_ROUTE } from "../constant";
import { useNavigate } from "react-router-dom";
import { NavbarItemModel } from "../type";
export const Navbar: React.FC = () => {
  return (
    <Card
      sx={{
        height: "100vh",
        width: "250px",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 2,
        borderRadius: 0,
      }}
      variant="outlined"
    >
      {/* Logo */}
      <Box
        sx={{
          padding: "10px",
          height: 40,
          borderBottom: "1px solid #ddd9d9",
        }}
      >
        Logo
      </Box>

      {/* Các mục menu */}
      <Box
        sx={{
          maxHeight: "calc(100vh - 50px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
        }}
      >
        {DEFAULT_ROUTE.map((item, index) => {
          return (
            <NavItem
              key={index}
              path={item.path}
              title={item.title}
              icon={item.icon}
              children={item.children}
            />
          );
        })}
      </Box>
    </Card>
  );
};

const NavItem: React.FC<NavbarItemModel> = ({
  title,
  path,
  icon,
  children = [],
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          cursor: "pointer",
          "&:hover": { backgroundColor: "#f5f5f5" },
        }}
        onClick={() => {
          if (!open) {
            navigate(`/dashboard/${path}`);
          }
          setOpen(!open);
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              paddingTop: "3px",
              "& svg": {
                fontSize: "1.25rem",
              },
            }}
          >
            <Box component={icon} />
          </Box>
          <Box>{title}</Box>
        </Box>
        {children.length > 0 && (open ? <ExpandLess /> : <ExpandMore />)}
      </Box>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        {children.map((option, index) => (
          <Box
            key={index}
            onClick={() => {
              navigate(`dashboard/${path}/${option.path}`);
            }}
            sx={{
              padding: "8px 10px",
              paddingLeft: "20px",
              fontSize: "14px",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#eee" },
            }}
          >
            {option.title}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default Navbar;
