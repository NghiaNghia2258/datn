import CommonPage from "../../components/common/page";
import { CommonCart } from "../../components/common/card";
import { commonDebounce } from "../../utils/debounce";
import { useCallback, useEffect, useState } from "react";
import CommonTable from "../../components/common/table";
import InvoiceService from "../../services/invoice.service";

const ViewOrders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [textSearch, setTextSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [pagingOptions, setPagingOptions] = useState<any>({
    currentPage: 0,
    rowsPerPage: 10,
    totalRows: 100,
    rowsPerPageOptions: [10, 20, 50],
  });

  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      setLoading(true);
      const res = await InvoiceService.getAll({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
      setOrders(res.data);
      setPagingOptions({
        ...pagingOptions,
        currentPage: 0,
        totalRows: res.totalRecordsCount,
      });
      setLoading(false);
    }, 500),
    []
  );
  const getListInvoices = async () => {
    setLoading(true);
    const res = await InvoiceService.getAll({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
    setOrders(res.data);
    setPagingOptions({
      ...pagingOptions,
      totalRows: res.totalRecordsCount,
    });
    setLoading(false);
  };
  useEffect(() => {
    getListInvoices();
  }, [pagingOptions.currentPage, pagingOptions.rowsPerPage]);

  const columns = [
    { id: "invoiceNumber", label: "Số hóa đơn", align: "left" as const },
    { id: "customerName", label: "Khách hàng", align: "left" as const },
    { id: "amount", label: "Tổng tiền", align: "left" as const },
    { id: "date", label: "Ngày phát hành", align: "left" as const },
    { id: "status", label: "Trạng thái", align: "left" as const },
  ];

  return (
    <CommonPage title="Danh sách hóa đơn">
      <CommonCart>
        <CommonTable
          fullWidth
          enableActions
          loading={loading}
          showInputSearch
          columns={columns}
          data={orders}
          textSearch={textSearch}
          onSearch={async (e) => {
            setTextSearch(e);
            await handleSearch(e);
          }}
          onEditRow={(row) => {}}
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

export default ViewOrders;
