import CommonTable from "../../../components/common/table";
import CommonPage from "../../../components/common/page";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../../../context/toast";
import { useValidation } from "../../../context/validate";
import CustomerService from "../../../services/customer.service";
import { commonDebounce } from "../../../utils/debounce";
import { CommonCart } from "../../../components/common/card";
import { useViewCustomer } from "../../../context/A/view-customer";
import { CreateUpdateCustomer } from "../create-update-customer";
import { Box } from "@mui/material";
import CustomerStatsDashboard from "./stat-dashboard";

const FeatViewCustomers = () => {
  const {
    customers,
    loading,
    getListCustomers,
    setCode,
    textSearch,
    setTextSearch,
  } = useViewCustomer();
  const { setFormData } = useValidation();
  const { showToast } = useToast();
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  const [pagingOptions, setPagingOptions] = useState<any>({
    currentPage: 0,
    rowsPerPage: 2,
    totalRows: 10,
    rowsPerPageOptions: [2, 4, 6],
  });

  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      await CustomerService.getAll({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    []
  );

  useEffect(() => {
    getListCustomers({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
  }, [pagingOptions]);

  const columns = [
    { id: "name", label: "Khách hàng", align: "left" as const },
    { id: "phone", label: "Số điện thoại", align: "left" as const },
    { id: "email", label: "Email", align: "left" as const },
    { id: "address", label: "Địa chỉ", align: "left" as const },
    { id: "gender", label: "Giới tính", align: "left" as const },
  ];

  const handleClickAddCustomer = () => {
    setOpenEditDialog(true);
  };

  return (
    <CommonPage title="Danh sách khách hàng">
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ flex: 7 }}>
          <CommonCart>
            <CommonTable
              fullWidth
              enableActions
              loading={loading}
              showButtonAdd
              showInputSearch
              columns={columns}
              data={customers}
              onClickButtonAdd={handleClickAddCustomer}
              textSearch={textSearch}
              onSearch={async (e) => {
                setTextSearch(e);
                await handleSearch(e);
              }}
              onDeleteRow={async (row) => {
                await CustomerService.delete(row.id);
                showToast("Xóa khách hàng thành công");
              }}
              onEditRow={(row) => {
                setFormData(row);
                setCode(row.id);
                setOpenEditDialog(true);
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
          <CommonCart className="stat_dashboard">
            <CustomerStatsDashboard />
          </CommonCart>
        </Box>
      </Box>

      <CreateUpdateCustomer
        onClose={() => {
          setOpenEditDialog(false);
          setFormData({});
        }}
        isOpen={openEditDialog}
      />
    </CommonPage>
  );
};

export default FeatViewCustomers;
