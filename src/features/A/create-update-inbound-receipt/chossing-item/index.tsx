import { FC, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useCreateUpdateInboundReceipt } from "../../../../context/A/inbound-receipt";
import CommonTable, { Column } from "../../../../components/common/table";
import { CommonBooleanCheckboxVer2 } from "../../../../components/common/check-box/check-box-boolean-ver2";
import CommonImage from "../../../../components/common/image";
import { CommonDialog } from "../../../../components/common/dialog";
import {
  IInboundItemSchema,
  IInboundReceiptCreateSchema,
  InboundProduct,
} from "../zod";
import { useValidation } from "../../../../context/validate";
import ProductService from "../../../../services/product.service";

export const DialogInboundProductSelector: FC = () => {
  const { isOpenProductDialog, toggleProductDialog } =
    useCreateUpdateInboundReceipt();
  const [products, setProducts] = useState<InboundProduct[]>([]);
  const [pagingOptions, setPagingOptions] = useState<any>({
    currentPage: 0,
    rowsPerPage: 5,
    totalRows: 10,
    rowsPerPageOptions: [5, 10, 20],
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductService.getInboundSelectableProducts();
      setProducts(response.data);
    };
    fetchData();
  }, []);
  const { formData, setFieldValue } =
    useValidation<IInboundReceiptCreateSchema>();

  const selectedProducts = formData.items ?? [];
  const handleToggleSelect = (product: InboundProduct, checked: boolean) => {
    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, isSelected: checked } : p
    );
    setProducts(updatedProducts);

    if (checked) {
      const newItem: IInboundItemSchema = {
        id: product.id,
        name: product.name,
        image: product.image,
        unitPrice: 0,
        quantity: 0,
      };
      const newSelected = [...selectedProducts, newItem];
      setFieldValue("items", newSelected);
    } else {
      const filtered = selectedProducts.filter((p) => p.id !== product.id);
      setFieldValue("items", filtered);
    }
  };

  const productColumns: Column<InboundProduct>[] = [
    {
      id: "select",
      width: 50,
      label: "",
      render: (_, row) => (
        <CommonBooleanCheckboxVer2
          value={selectedProducts.some((p) => p.id === row.id)}
          onChange={(checked) => handleToggleSelect(row, checked)}
          label=""
        />
      ),
    },
    {
      id: "name",
      flex: 3,
      label: "Sản phẩm",
      render: (value, row) => (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <CommonImage
            width={34}
            height={34}
            borderRadius={2}
            src={
              row.image ??
              "https://pos.nvncdn.com/778773-105877/ps/20230529_5xEM0bU9mm.jpeg"
            }
          />
          <Typography>{value}</Typography>
        </Box>
      ),
    },

    {
      id: "inventory",
      width: 80,
      label: "Tồn kho",
      render: (value, row) => {
        return <Typography>{value ?? row.inventory}</Typography>;
      },
    },
  ];

  return (
    <CommonDialog
      isOpen={isOpenProductDialog}
      onClose={toggleProductDialog}
      title="Chọn sản phẩm để nhập kho"
      showButton
      onConfirm={() => {
        console.log(selectedProducts);
      }}
    >
      <Box sx={{ p: 2 }}>
        <CommonTable
          loading={false}
          columns={productColumns}
          data={products}
          enableActions={false}
          showInputSearch={false}
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
      </Box>
    </CommonDialog>
  );
};
