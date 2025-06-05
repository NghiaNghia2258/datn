import { FC, useCallback, useEffect, useState } from "react";
import CommonPage from "../../../components/common/page";
import { Box, Typography } from "@mui/material";
import CommonTable, { Column } from "../../../components/common/table";
import { useViewProduct } from "../../../context/A/view-products";
import { ResponseGetAllProducts } from "../../../services/response/product.response";
import CommonImage from "../../../components/common/image";
import { CommonCart } from "../../../components/common/card";
import { commonDebounce } from "../../../utils/debounce";
import ProductService from "../../../services/product.service";
import { useToast } from "../../../context/toast";
import { RatingStatistics } from "./rating";
import { ProductInventoryInfoCard } from "./inventory-detail";
import { DASHBOARD_URLS } from "../../../routes/AppRoutes";
import { useNavigateCommon } from "../../../hooks/navigate";

export const FeatViewProducts: FC = () => {
  const { products, loading, getListProducts, textSearch, setTextSearch } =
    useViewProduct();
  const navigate = useNavigateCommon();
  const { showToast } = useToast();
  const productColumns: Column<ResponseGetAllProducts>[] = [
    {
      id: "name",
      flex: 3,
      label: "Sản phẩm",
      render: (_, row) => {
        return (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <CommonImage
              width={34}
              height={34}
              borderRadius={2}
              src={row.mainImageUrl ?? row.imageUrl}
            />
            <Typography>{row.name}</Typography>
          </Box>
        );
      },
    },
    {
      id: "propertyValue1",
      flex: 2,
      label: "Biến thể",
      render: (value, row) => {
        const variant = row as any;
        return (
          <Typography>
            {value} - {variant.propertyValue2}
          </Typography>
        );
      },
    },
    { id: "categoryName", flex: 2, label: "Danh mục" },
    {
      id: "inventory",
      width: 80,
      label: "Tồn kho",
      render: (value, row) => {
        return <Typography>{value ?? row.totalInventory}</Typography>;
      },
    },
  ];
  const [pagingOptions, setPagingOptions] = useState<any>({
    currentPage: 0,
    rowsPerPage: 2,
    totalRows: 10,
    rowsPerPageOptions: [2, 4, 6],
  });
  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      await ProductService.getAll({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    []
  );
  useEffect(() => {
    getListProducts({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
  }, [pagingOptions]);
  return (
    <CommonPage title="Danh sách sản phẩm">
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ flex: 7 }}>
          <CommonCart>
            <CommonTable
              loading={loading}
              showButtonAdd
              showInputSearch
              enableActions
              textSearch={textSearch}
              onSearch={async (e) => {
                setTextSearch(e);
                await handleSearch(e);
              }}
              columns={productColumns}
              data={products}
              getNestedRows={(obj) => obj.productVariants}
              onDeleteRow={async (row) => {
                await ProductService.delete(row.id);
                showToast("Xóa sản phẩm thành công");
              }}
              onEditRow={(row) => {
                navigate(DASHBOARD_URLS.PRODUCT.UPDATE(row.id));
              }}
              pagingOptions={{
                ...pagingOptions,
                onPageChange: (newPage) => {
                  setPagingOptions({
                    ...pagingOptions,
                    currentPage: newPage,
                  });
                },
                onRowsPerPageChange: (e) => {
                  setPagingOptions({
                    ...pagingOptions,
                    rowsPerPage: e.target.value,
                  });
                },
              }}
            />
          </CommonCart>
        </Box>
        <Box sx={{ flex: 3, display: "flex", flexDirection: "column", gap: 1 }}>
          <ProductInventoryInfoCard />
          <RatingStatistics />
        </Box>
      </Box>
    </CommonPage>
  );
};
