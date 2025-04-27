import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";

interface BreadcrumbsProps {
  categories: string[]; // Chỉ chứa mảng các label
  productName: string;
}

const CustomBreadcrumbs: React.FC<BreadcrumbsProps> = ({
  categories,
  productName,
}) => {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
      {categories.map((category, index) => (
        <Typography key={index} color="inherit">
          {category}
        </Typography>
      ))}
      <Typography color="text.primary">{productName}</Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
