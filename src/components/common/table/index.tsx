import { Box, IconButton, TablePagination, Typography } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import CommonDialogOkCancel from "../dialog-ok-cancel";
import { CommonButtonIcon } from "../button/button-icon";
import AddIcon from "@mui/icons-material/Add";
import { Loader } from "../loader";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchTextField from "../input-search";

export interface Column<T> {
  id: keyof T | string;
  label: string;
  flex?: number;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T) => React.ReactNode;
  width?: string | number;
}

export interface PagingOptions {
  currentPage: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  totalRows: number;

  onPageChange: (
    newPage: number,
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => void;
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface CommonTableProps<T> {
  pagingOptions?: PagingOptions;
  showButtonAdd?: boolean;
  showInputSearch?: boolean;
  enableActions?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  textSearch?: string;
  columns: Column<T>[];
  data: T[];
  getNestedRows?: (row: T) => any[] | undefined;
  onSearch?: (e: any) => void;
  onDeleteRow?: (row: T) => void;
  onEditRow?: (row: T) => void;
  onClickButtonAdd?: () => void;
}

const CommonTable = <T,>({
  pagingOptions,
  enableActions,
  showButtonAdd,
  fullWidth,
  columns,
  textSearch,
  data,
  showInputSearch,
  getNestedRows,
  loading,
  onDeleteRow,
  onEditRow,
  onClickButtonAdd,
  onSearch,
}: CommonTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [openDialog, setOpenDialog] = useState(false);
  const [row, setRow] = useState<T>();
  const toggleExpand = (rowIndex: number) => {
    setExpandedRows((prev) => ({ ...prev, [rowIndex]: !prev[rowIndex] }));
  };
  if (enableActions) {
    if (columns.filter((x) => x.id === "actions").length === 0) {
      columns.push({
        id: "actions",
        label: "",
        width: 80,
        render: (_, row) => (
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.15)",
                },
                "& svg": {
                  fontSize: "1.25rem",
                  transition: "color 0.3s ease-in-out",
                },
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setOpenDialog(true);
                  setRow(row);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.15)",
                },
                "& svg": {
                  fontSize: "1.25rem",
                  transition: "color 0.3s ease-in-out",
                },
              }}
            >
              <IconButton
                aria-label="delete"
                onClick={() => onEditRow && onEditRow(row)}
              >
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Box>
          </Box>
        ),
      });
    }
  }
  return (
    <Box
      sx={{
        position: "relative",
        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pb: "10px",
          alignItems: "end",
        }}
      >
        <Box>
          {showInputSearch && (
            <SearchTextField
              value={textSearch ?? ""}
              onChange={(e) => onSearch && onSearch(e)}
            />
          )}
        </Box>
        <Box>
          {showButtonAdd && (
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                justifyContent: "end",
              }}
            >
              <CommonButtonIcon
                textTooltip="Tải lên"
                onClick={onClickButtonAdd}
                icon={<FileUploadIcon />}
              />
              <CommonButtonIcon
                textTooltip="Tải xuống file excel"
                onClick={onClickButtonAdd}
                icon={<FileDownloadIcon />}
              />
              <CommonButtonIcon
                textTooltip="Tạo mới"
                onClick={onClickButtonAdd}
                icon={<AddIcon />}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box
        className="custom-table-container"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          borderRadius: "8px",

          border: "1px solid #cac4c4",
          overflow: "hidden",
          width: fullWidth ? "100%" : "auto",
          "& *": {
            fontSize: "14px",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", bgcolor: "#eee", p: 1 }}>
          {columns.map((col) => {
            return (
              <Box
                key={col.id.toString()}
                sx={{
                  flex: col.width ? "0 0 auto" : (col.flex ?? 1),
                  pl: 1,
                  width: col.width ?? "auto",
                  textAlign: col.align || "left",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {col.label}
              </Box>
            );
          })}
        </Box>

        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Loader />
          </Box>
        ) : (
          <Box>
            {/* Body */}
            {data.map((row, rowIndex) => {
              const nestedRows = getNestedRows
                ? (getNestedRows(row) ?? [])
                : [];
              const isExpanded = !!expandedRows[rowIndex];

              return (
                <Box
                  key={rowIndex}
                  sx={{
                    borderBottom: "1px solid #cac4c4",
                    backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#d8d3d32e",
                  }}
                >
                  {/* Dòng cha */}
                  <Box
                    sx={{
                      display: "flex",
                      cursor:
                        nestedRows && nestedRows.length > 0
                          ? "pointer"
                          : "default",
                      p: 1,
                      bgcolor: isExpanded ? "#f5f5f5" : "transparent",
                    }}
                    onClick={() =>
                      nestedRows &&
                      nestedRows.length > 0 &&
                      toggleExpand(rowIndex)
                    }
                  >
                    {columns.map((col) => (
                      <Typography
                        component="div"
                        key={col.id.toString()}
                        sx={{
                          flex: col.width ? "0 0 auto" : (col.flex ?? 1),
                          width: col.width ?? "auto",
                          display: "flex",
                          alignItems: "center",
                          textAlign: col.align || "left",
                          pl: 1,
                        }}
                      >
                        {col.render
                          ? col.render((row as any)[col.id], row)
                          : (row as any)[col.id]}
                      </Typography>
                    ))}
                  </Box>

                  {/* Dòng con với AnimatePresence */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }} // Giúp trượt lên trước khi biến mất
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        {nestedRows.map((nestedRow, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              pl: 2,
                              mb: 1,
                              bgcolor: "#f9f9f9",
                              " & > div:last-child": {
                                visibility: "hidden",
                              },
                            }}
                          >
                            {columns.map((col) => {
                              const value = (nestedRow as any)[col.id];
                              return (
                                <Box
                                  key={col.id.toString()}
                                  sx={{
                                    flex: col.width
                                      ? "0 0 auto"
                                      : (col.flex ?? 1),
                                    width: col.width ?? "auto",
                                    textAlign: col.align || "left",
                                  }}
                                >
                                  {col.render
                                    ? col.render(value, nestedRow)
                                    : value}
                                </Box>
                              );
                            })}
                          </Box>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              );
            })}
          </Box>
        )}
        {pagingOptions && (
          <TablePagination
            component="div"
            count={pagingOptions.totalRows}
            page={pagingOptions.currentPage}
            onPageChange={(e, page) => {
              pagingOptions.onPageChange(page, e);
            }}
            rowsPerPage={pagingOptions.rowsPerPage}
            onRowsPerPageChange={pagingOptions.onRowsPerPageChange}
            rowsPerPageOptions={pagingOptions.rowsPerPageOptions}
          />
        )}
        <CommonDialogOkCancel
          open={openDialog}
          title="Xác nhận xóa"
          content="Bạn có chắc chắn muốn xóa bản ghi này?"
          onClose={() => setOpenDialog(false)}
          onConfirm={() => {
            onDeleteRow && row && onDeleteRow(row);
            setOpenDialog(false);
          }}
          confirmText="Xóa"
          cancelText="Hủy"
        />
      </Box>
    </Box>
  );
};

export default CommonTable;
