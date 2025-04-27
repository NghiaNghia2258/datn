import { Box } from "@mui/material";
import { useState } from "react";

interface CommonImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  fallbackSrc?: string; // Ảnh mặc định khi load lỗi
}

export default function CommonImage({
  src,
  alt = "Hình ảnh",
  width = 150,
  height = 150,
  borderRadius = 8,
  fallbackSrc = "https://via.placeholder.com/150?text=No+Image",
}: CommonImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Box
      component="img"
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      sx={{
        objectFit: "cover",
        borderRadius: borderRadius,
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ddd",
      }}
      onError={() => setImgSrc(fallbackSrc)} // Khi ảnh lỗi, hiển thị fallback
    />
  );
}
