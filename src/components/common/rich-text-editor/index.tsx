import React, { useState, useRef, useEffect, FC } from "react";
import {
  Box,
  Divider,
  IconButton,
  Select,
  MenuItem,
  Tooltip,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
} from "@mui/material";

// MUI Icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkIcon from "@mui/icons-material/Link";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CodeIcon from "@mui/icons-material/Code";

type props = {
  onChange?: (value: string) => void;
  value?: string;
};
const TextEditor: FC<props> = ({ value, onChange }) => {
  const [headingStyle, setHeadingStyle] = useState("Heading 1");
  const [formats, setFormats] = useState([]);
  const [listMenuAnchor, setListMenuAnchor] = useState(null);
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null);
  const [currentColor, setCurrentColor] = useState("black");
  const editorRef = useRef(null);
  useEffect(() => {
    const handleInput = () => {
      const html = editorRef.current?.innerHTML || "";
      onChange?.(html);
    };

    const current = editorRef.current;
    current?.addEventListener("input", handleInput);

    return () => current?.removeEventListener("input", handleInput);
  }, []);
  const handleHeadingChange = (event: any) => {
    setHeadingStyle(event.target.value);
    applyHeadingStyle(event.target.value);
  };

  const handleFormatChange = (event, newFormats) => {
    const oldFormats = formats;
    setFormats(newFormats);

    if (newFormats.length > oldFormats.length) {
      const addedFormat = newFormats.find((f) => !oldFormats.includes(f));
      applyInlineFormat(addedFormat);
    } else {
      const removedFormat = oldFormats.find((f) => !newFormats.includes(f));
      removeInlineFormat(removedFormat);
    }
  };

  const handleListClick = (event) => {
    setListMenuAnchor(event.currentTarget);
  };

  const handleListClose = (listType = null) => {
    if (listType) {
      applyListFormat(listType);
    }
    setListMenuAnchor(null);
  };

  const handleColorClick = (event) => {
    setColorMenuAnchor(event.currentTarget);
  };

  const handleColorClose = (color = null) => {
    if (color) {
      setCurrentColor(color);
      applyColor(color);
    }
    setColorMenuAnchor(null);
  };

  // Apply heading style to selected text
  const applyHeadingStyle = (headingType) => {
    if (!editorRef.current) return;

    document.execCommand("formatBlock", false, getHeadingTag(headingType));
  };

  // Convert heading type to HTML tag
  const getHeadingTag = (headingType) => {
    switch (headingType) {
      case "Heading 1":
        return "h1";
      case "Heading 2":
        return "h2";
      case "Heading 3":
        return "h3";
      default:
        return "p";
    }
  };

  // Apply inline formatting
  const applyInlineFormat = (format) => {
    if (!editorRef.current) return;

    switch (format) {
      case "bold":
        document.execCommand("bold", false, null);
        break;
      case "italic":
        document.execCommand("italic", false, null);
        break;
      case "underlined":
        document.execCommand("underline", false, null);
        break;
      default:
        break;
    }
  };

  // Remove inline formatting
  const removeInlineFormat = (format) => {
    if (!editorRef.current) return;

    // For removing formats, we need to toggle them off
    switch (format) {
      case "bold":
        document.execCommand("bold", false, null);
        break;
      case "italic":
        document.execCommand("italic", false, null);
        break;
      case "underlined":
        document.execCommand("underline", false, null);
        break;
      default:
        break;
    }
  };

  // Apply color to selected text
  const applyColor = (color) => {
    if (!editorRef.current) return;

    document.execCommand("foreColor", false, color);

    // Update formats if color was applied
    if (!formats.includes("color")) {
      setFormats([...formats, "color"]);
    }
  };

  // Apply list format
  const applyListFormat = (listType) => {
    if (!editorRef.current) return;

    switch (listType) {
      case "bullet":
        document.execCommand("insertUnorderedList", false, null);
        break;
      case "number":
        document.execCommand("insertOrderedList", false, null);
        break;
      default:
        break;
    }
  };

  // Update toolbar state based on current selection
  const updateToolbarState = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    // Check for active formatting
    const activeFormats = [];

    if (document.queryCommandState("bold")) {
      activeFormats.push("bold");
    }

    if (document.queryCommandState("italic")) {
      activeFormats.push("italic");
    }

    if (document.queryCommandState("underline")) {
      activeFormats.push("underlined");
    }

    // Check for text color
    const currentForeColor = document.queryCommandValue("foreColor");
    if (currentForeColor && currentForeColor !== "") {
      // Convert RGB to hex or standard color name
      setCurrentColor(rgbToColor(currentForeColor));
      if (!activeFormats.includes("color")) {
        activeFormats.push("color");
      }
    }

    setFormats(activeFormats);

    // Update heading style
    updateHeadingStyle();
  };

  // Update heading style based on current selection
  const updateHeadingStyle = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const parentElement = selection.getRangeAt(0).startContainer.parentElement;

    if (parentElement) {
      // Check what block element contains the selection
      let currentBlock = parentElement;
      while (
        currentBlock &&
        !["P", "H1", "H2", "H3", "H4", "H5", "H6"].includes(
          currentBlock.tagName
        )
      ) {
        currentBlock = currentBlock.parentElement;
      }

      if (currentBlock) {
        switch (currentBlock.tagName) {
          case "H1":
            setHeadingStyle("Heading 1");
            break;
          case "H2":
            setHeadingStyle("Heading 2");
            break;
          case "H3":
            setHeadingStyle("Heading 3");
            break;
          default:
            setHeadingStyle("Paragraph");
        }
      }
    }
  };

  // Helper function to convert RGB to standard color name
  const rgbToColor = (rgb) => {
    // This is a simplified conversion - in a real app you might want a more precise conversion
    const colorMap = {
      "rgb(0, 0, 0)": "black",
      "rgb(255, 0, 0)": "red",
      "rgb(0, 0, 255)": "blue",
      "rgb(0, 128, 0)": "green",
      "rgb(128, 0, 128)": "purple",
    };

    return colorMap[rgb] || "black";
  };

  // Handle selection change in the editor
  const handleSelectionChange = () => {
    updateToolbarState();
  };

  // Set up event listeners for selection changes
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  // Initial content setup
  useEffect(() => {
    if (editorRef.current) {
      // Set initial content with example text
      editorRef.current.innerHTML = value ?? "";

      // Focus the editor
      editorRef.current.focus();
    }
  }, []);

  // Color options
  const colorOptions = ["black", "red", "blue", "green", "purple"];

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "4px 8px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {/* Heading dropdown */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
          <Select
            value={headingStyle}
            onChange={handleHeadingChange}
            displayEmpty
            size="small"
            sx={{
              minWidth: 120,
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              height: "32px",
              "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value="Paragraph">Paragraph</MenuItem>
            <MenuItem value="Heading 1">Heading 1</MenuItem>
            <MenuItem value="Heading 2">Heading 2</MenuItem>
            <MenuItem value="Heading 3">Heading 3</MenuItem>
          </Select>
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Text formatting */}
        <ToggleButtonGroup
          value={formats}
          onChange={handleFormatChange}
          aria-label="text formatting"
          size="small"
          sx={{
            height: "32px",
            "& .MuiToggleButton-root": {
              border: "none",
              padding: "4px",
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            },
          }}
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton
            value="color"
            aria-label="text color"
            onClick={handleColorClick}
          >
            <TextFieldsIcon
              fontSize="small"
              style={{
                color: formats.includes("color") ? currentColor : "inherit",
              }}
            />
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Color menu */}
        <Menu
          anchorEl={colorMenuAnchor}
          open={Boolean(colorMenuAnchor)}
          onClose={() => handleColorClose()}
        >
          {colorOptions.map((color) => (
            <MenuItem
              key={color}
              onClick={() => handleColorClose(color)}
              sx={{
                color: color,
                fontWeight: color === currentColor ? "bold" : "normal",
              }}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </MenuItem>
          ))}
        </Menu>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* List formatting */}
        <IconButton size="small" onClick={handleListClick} sx={{ mx: 0.5 }}>
          <FormatListBulletedIcon fontSize="small" />
          <KeyboardArrowDownIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={listMenuAnchor}
          open={Boolean(listMenuAnchor)}
          onClose={() => handleListClose()}
        >
          <MenuItem onClick={() => handleListClose("bullet")}>
            Bulleted list
          </MenuItem>
          <MenuItem onClick={() => handleListClose("number")}>
            Numbered list
          </MenuItem>
        </Menu>

        {/* Link */}
        <Tooltip title="Insert link">
          <IconButton size="small" sx={{ mx: 0.5 }}>
            <LinkIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Image */}
        <Tooltip title="Insert image">
          <IconButton size="small" sx={{ mx: 0.5 }}>
            <InsertPhotoIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Video */}
        <Tooltip title="Insert video">
          <IconButton size="small" sx={{ mx: 0.5 }}>
            <PlayCircleOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* More options */}
        <Tooltip title="More options">
          <IconButton size="small" sx={{ mx: 0.5 }}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Divider */}
        <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

        {/* Code view */}
        <Tooltip title="Code view">
          <IconButton size="small" sx={{ ml: 0.5 }}>
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Text Editor Area with contentEditable */}
      <Box
        sx={{
          padding: "16px",
          minHeight: "150px",
        }}
      >
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          style={{
            outline: "none",
            width: "100%",
            minHeight: "100px",
          }}
        />
      </Box>
    </Paper>
  );
};

export default TextEditor;
