import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Grid,
  Paper,
  Stack,
  Chip,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideoIcon from "@mui/icons-material/Videocam";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CancelIcon from "@mui/icons-material/Cancel";

// Interface for media file
interface MediaFile {
  id: string;
  file: File;
  preview: string;
  type: "image" | "video";
  name: string;
  size: number;
}

interface MediaInputProps {
  multiple?: boolean;
  maxFiles?: number;
  acceptedTypes?: string[];
  onFilesChange?: (files: MediaFile[]) => void;
  label?: string;
}

const MediaInput: React.FC<MediaInputProps> = ({
  multiple = false,
  maxFiles = 5,
  acceptedTypes = ["image/*", "video/*"],
  onFilesChange,
  label = "Tải tệp lên",
}) => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Limit number of files
    const availableSlots = maxFiles - mediaFiles.length;
    if (availableSlots <= 0) {
      alert(`Bạn chỉ có thể tải lên tối đa ${maxFiles} tệp`);
      return;
    }

    // Process files
    const filesToProcess = Array.from(selectedFiles).slice(0, availableSlots);
    processFiles(filesToProcess);

    // Clear input
    event.target.value = "";
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Limit number of files
      const availableSlots = maxFiles - mediaFiles.length;
      if (availableSlots <= 0) {
        alert(`Bạn chỉ có thể tải lên tối đa ${maxFiles} tệp`);
        return;
      }

      // Process files
      const filesToProcess = Array.from(e.dataTransfer.files).slice(
        0,
        availableSlots
      );
      processFiles(filesToProcess);
    }
  };

  const processFiles = (files: File[]) => {
    const newMediaFiles: MediaFile[] = [];

    files.forEach((file) => {
      // Check file type
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        alert(`Tệp "${file.name}" không phải là ảnh hoặc video được hỗ trợ`);
        return;
      }

      // Create preview
      const preview = URL.createObjectURL(file);

      // Add to media files
      newMediaFiles.push({
        id: generateId(),
        file,
        preview,
        type: isImage ? "image" : "video",
        name: file.name,
        size: file.size,
      });
    });

    const updatedMediaFiles = multiple
      ? [...mediaFiles, ...newMediaFiles]
      : newMediaFiles;

    setMediaFiles(updatedMediaFiles);

    // Notify parent component
    if (onFilesChange) {
      onFilesChange(updatedMediaFiles);
    }
  };

  const removeFile = (id: string) => {
    const updatedFiles = mediaFiles.filter((file) => file.id !== id);
    setMediaFiles(updatedFiles);

    // Notify parent component
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Drop zone */}
      <Box
        sx={{
          border: "2px dashed",
          borderColor: dragActive ? "primary.main" : "grey.400",
          borderRadius: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: dragActive
            ? "rgba(25, 118, 210, 0.04)"
            : "background.paper",
          transition: "all 0.2s ease",
          cursor: "pointer",
          minHeight: 150,
        }}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <ImageIcon color="primary" />
          <VideoIcon color="primary" />
        </Stack>

        <Typography variant="body1" textAlign="center" gutterBottom>
          Kéo và thả tệp vào đây hoặc
        </Typography>

        <Button
          component="label"
          variant="contained"
          startIcon={<InsertDriveFileIcon />}
        >
          {label}
          <input
            type="file"
            hidden
            multiple={multiple}
            accept={acceptedTypes.join(",")}
            onChange={handleFileChange}
          />
        </Button>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          Chấp nhận: {acceptedTypes.join(", ")} • Tối đa: {maxFiles} tệp
        </Typography>
      </Box>

      {/* Preview area */}
      {mediaFiles.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Tệp đã chọn ({mediaFiles.length}/{maxFiles})
          </Typography>

          <Grid container spacing={2}>
            {mediaFiles.map((media) => (
              <Grid item xs={12} sm={6} md={4} key={media.id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 1,
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Preview */}
                  <Box
                    sx={{
                      height: 180,
                      position: "relative",
                      backgroundColor: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      borderRadius: 1,
                    }}
                  >
                    {media.type === "image" ? (
                      <Box
                        component="img"
                        src={media.preview}
                        alt={media.name}
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Box
                        component="video"
                        src={media.preview}
                        controls
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    )}

                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "rgba(0,0,0,0.7)",
                        },
                      }}
                      onClick={() => removeFile(media.id)}
                    >
                      <CancelIcon fontSize="small" />
                    </IconButton>

                    <Chip
                      label={media.type === "image" ? "Ảnh" : "Video"}
                      size="small"
                      color={media.type === "image" ? "primary" : "secondary"}
                      icon={
                        media.type === "image" ? <ImageIcon /> : <VideoIcon />
                      }
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                      }}
                    />
                  </Box>

                  {/* File info */}
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      title={media.name}
                      sx={{ fontWeight: "medium" }}
                    >
                      {media.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(media.size)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MediaInput;
