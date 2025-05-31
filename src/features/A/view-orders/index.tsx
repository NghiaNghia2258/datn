import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../../context/toast";
import { commonDebounce } from "../../../utils/debounce";
import CommonTable from "../../../components/common/table";
import CommonPage from "../../../components/common/page";
import { CommonCart } from "../../../components/common/card";
import { useViewOrder } from "../../../context/A/view-orders";

const FeatViewOrders = () => {
  const { orders, loading, getListOrders, setTextSearch, textSearch } =
    useViewOrder();
  const { showToast } = useToast();

  const [pagingOptions, setPagingOptions] = useState({
    currentPage: 0,
    rowsPerPage: 10,
    totalRows: 10,
    rowsPerPageOptions: [10, 20, 50],
  });

  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      await getListOrders({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    [pagingOptions.rowsPerPage]
  );

  useEffect(() => {
    getListOrders({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
  }, [pagingOptions]);

  const columns = [
    { id: "code", label: "Mã hóa đơn", align: "left" as const },
    { id: "customerName", label: "Khách hàng", align: "left" as const },
    { id: "customerPhone", label: "SĐT", align: "left" as const },
    {
      id: "paymentStatus",
      label: "Trạng thái thanh toán",
      align: "left" as const,
      format: (value: number) =>
        value === 1 ? "Chưa thanh toán" : "Đã thanh toán",
    },
    {
      id: "totalPrice",
      label: "Tổng tiền",
      align: "right" as const,
      format: (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      id: "discountValue",
      label: "Chiết khấu",
      align: "right" as const,
      format: (value: number) =>
        value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
      align: "left" as const,
      format: (value: string) => new Date(value).toLocaleString("vi-VN"),
    },
  ];

  return (
    <CommonPage title="Danh sách hóa đơn">
      <CommonCart>
        <CommonTable
          fullWidth
          enableActions={false}
          loading={loading}
          showInputSearch
          showButtonAdd={false}
          columns={columns}
          data={orders}
          textSearch={textSearch}
          onSearch={async (value) => {
            setTextSearch(value);
            await handleSearch(value);
          }}
          pagingOptions={{
            ...pagingOptions,
            onPageChange: (newPage) =>
              setPagingOptions({ ...pagingOptions, currentPage: newPage }),
            onRowsPerPageChange: (e) =>
              setPagingOptions({
                ...pagingOptions,
                rowsPerPage: e.target.value,
              }),
          }}
        />
      </CommonCart>
    </CommonPage>
  );
};

export default FeatViewOrders;
