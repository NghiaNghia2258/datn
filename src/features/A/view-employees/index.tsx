import { useViewEmployee } from "../../../context/A/view-employees";
import CommonTable from "../../../components/common/table";
import CommonPage from "../../../components/common/page";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "../../../context/toast";
import { CreateUpdateEmployee } from "../create-update-employee";
import { useValidation } from "../../../context/validate";
import EmployeeService from "../../../services/employee.service";
import { commonDebounce } from "../../../utils/debounce";
import { CommonCart } from "../../../components/common/card";

const FeatViewEmployees = () => {
  const {
    employees,
    loading,
    getListEmployees,
    setCode,
    textSearch,
    setTextSearch,
  } = useViewEmployee();
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
      await EmployeeService.getAll({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    []
  );
  useEffect(() => {
    getListEmployees({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
  }, [pagingOptions]);
  const columns = [
    { id: "code", label: "Mã nhân viên", align: "left" as const },
    { id: "name", label: "Nhân viên", align: "left" as const },
    { id: "phone", label: "Số điện thoại", align: "left" as const },
    { id: "gender", label: "Giời tính", align: "left" as const },
    { id: "mail", label: "Mail", align: "left" as const },
  ];
  const handleClickAddEmployee = () => {
    setOpenEditDialog(true);
  };
  return (
    <CommonPage title="Danh sách nhân viên">
      <CommonCart>
        <CommonTable
          fullWidth
          enableActions
          loading={loading}
          showButtonAdd
          showInputSearch
          columns={columns}
          data={employees}
          onClickButtonAdd={handleClickAddEmployee}
          textSearch={textSearch}
          onSearch={async (e) => {
            setTextSearch(e);
            await handleSearch(e);
          }}
          onDeleteRow={async (row) => {
            await EmployeeService.delete(row.id);
            showToast("Xóa nhân viên thành công");
          }}
          onEditRow={(row) => {
            setFormData(row);
            setCode(row.code);
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

      <CreateUpdateEmployee
        onClose={() => {
          setOpenEditDialog(false);
          setFormData({});
        }}
        isOpen={openEditDialog}
      />
    </CommonPage>
  );
};

export default FeatViewEmployees;
