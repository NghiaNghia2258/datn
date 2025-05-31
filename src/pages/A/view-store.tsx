import { useCallback, useEffect, useMemo, useState } from "react";
import StoreService from "../../services/store.service";
import { useToast } from "../../context/toast";
import { CommonCart } from "../../components/common/card";
import CommonPage from "../../components/common/page";
import CommonTable from "../../components/common/table";
import { commonDebounce } from "../../utils/debounce";
import { useNavigateCommon } from "../../hooks/navigate";

const FeatViewStores = () => {
  const { showToast } = useToast();
  const navigate = useNavigateCommon();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");

  const [pagingOptions, setPagingOptions] = useState<any>({
    currentPage: 0,
    rowsPerPage: 2,
    totalRows: 10,
    rowsPerPageOptions: [2, 4, 6],
  });

  const getListStores = async (options?: any) => {
    setLoading(true);
    const res = await StoreService.getAll(options);
    setStores(res.data);
    setLoading(false);
  };

  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      await getListStores({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    []
  );

  useEffect(() => {
    getListStores({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
  }, [pagingOptions]);

  const columns = useMemo(() => {
    return [
      { id: "name", label: "Tên cửa hàng", align: "left" as const },
      { id: "location", label: "Địa điểm", align: "left" as const },
      { id: "contactPhone", label: "SĐT", align: "left" as const },
      { id: "contactEmail", label: "Email", align: "left" as const },
      {
        id: "verified",
        label: "Trạng thái",
        align: "left" as const,
        render: (row: any) => {
          const style = {
            display: "inline-block",
            padding: "4px 10px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: "600",
            color: row ? "#155724" : "#856404",
            backgroundColor: row ? "#d4edda" : "#fff3cd",
            border: `1px solid ${row ? "#c3e6cb" : "#ffeeba"}`,
            userSelect: "none",
          };
          return (
            <span style={style}>{row ? "Hoạt động" : "Chờ xác nhận"}</span>
          );
        },
      },
    ];
  }, []);

  return (
    <CommonPage title="Danh sách cửa hàng">
      <CommonCart>
        <CommonTable
          fullWidth
          loading={loading}
          showButtonAdd
          showInputSearch
          enableActions
          columns={columns}
          data={stores}
          textSearch={textSearch}
          onSearch={async (e) => {
            setTextSearch(e);
            await handleSearch(e);
          }}
          onDeleteRow={async (row) => {
            await StoreService.delete(row.id);
            showToast("Xóa cửa hàng thành công");
          }}
          onEditRow={(row) => {
            navigate(`dashboard/store-detail/${row.id}`);
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
    </CommonPage>
  );
};

export default FeatViewStores;
