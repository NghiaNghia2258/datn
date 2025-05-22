import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../../context/toast";
import InboundReceiptService from "../../../services/inbound-receipt.service";
import { commonDebounce } from "../../../utils/debounce";
import CommonTable from "../../../components/common/table";
import CommonPage from "../../../components/common/page";
import { CommonCart } from "../../../components/common/card";
import { DASHBOARD_URLS } from "../../../routes/AppRoutes";
import { useNavigateCommon } from "../../../hooks/navigate";

const FeatViewInboundReceipts = () => {
  const { showToast } = useToast();
  const navigate = useNavigateCommon();

  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");

  const [pagingOptions, setPagingOptions] = useState<any>({
    currentPage: 0,
    rowsPerPage: 10,
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
  });

  const getReceipts = async (params: {
    pageIndex: number;
    pageSize: number;
    keyWord?: string;
  }) => {
    try {
      setLoading(true);
      const res = await InboundReceiptService.getAll(params);
      setReceipts(res || []);
    } catch (err) {
      showToast("Lỗi khi tải danh sách phiếu nhập kho");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      await getReceipts({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    [pagingOptions.rowsPerPage]
  );

  useEffect(() => {
    getReceipts({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
      keyWord: textSearch,
    });
  }, [pagingOptions.currentPage, pagingOptions.rowsPerPage]);

  const columns = [
    { id: "receiptId", label: "Mã phiếu" },
    { id: "createdAt", label: "Ngày nhập" },
    { id: "createdBy", label: "Người tạo" },
    { id: "supplierName", label: "Nhà cung cấp" },
    { id: "totalQuantity", label: "Tổng SL" },
    { id: "totalValue", label: "Tổng giá trị" },
  ];

  return (
    <CommonPage title="Danh sách phiếu nhập kho">
      <CommonCart>
        <CommonTable
          fullWidth
          enableActions
          loading={loading}
          showButtonAdd
          showInputSearch
          columns={columns}
          data={receipts}
          textSearch={textSearch}
          onClickButtonAdd={() => navigate(DASHBOARD_URLS.INBOUND.CREATE)}
          onSearch={async (e) => {
            setTextSearch(e);
            await handleSearch(e);
          }}
          onEditRow={(row) => {
            navigate(DASHBOARD_URLS.INBOUND.UPDATE(row.receiptId));
          }}
          onDeleteRow={async (row) => {
            await InboundReceiptService.delete(row.receiptId);
            showToast("Xóa phiếu nhập kho thành công");
            getReceipts({
              pageIndex: pagingOptions.currentPage,
              pageSize: pagingOptions.rowsPerPage,
              keyWord: textSearch,
            });
          }}
          pagingOptions={{
            ...pagingOptions,
            onPageChange: (newPage) => {
              setPagingOptions((prev: any) => ({
                ...prev,
                currentPage: newPage,
              }));
            },
            onRowsPerPageChange: (e) => {
              setPagingOptions((prev: any) => ({
                ...prev,
                rowsPerPage: e.target.value,
                currentPage: 0,
              }));
            },
          }}
        />
      </CommonCart>
    </CommonPage>
  );
};

export default FeatViewInboundReceipts;
