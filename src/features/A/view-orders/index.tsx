import { useEffect, useState, useCallback } from "react";
import { useToast } from "../../../context/toast";
import { commonDebounce } from "../../../utils/debounce";
import CommonTable from "../../../components/common/table";
import CommonPage from "../../../components/common/page";
import { CommonCart } from "../../../components/common/card";
import { useViewOrder } from "../../../context/A/view-orders";
import { useNavigateCommon } from "../../../hooks/navigate";

const FeatViewOrders = () => {
  const {
    orders,
    loading,
    getListOrders,
    setTextSearch,
    textSearch,
    totalRows,
  } = useViewOrder();
  const { showToast } = useToast();
  const navigate = useNavigateCommon();

  const [pagingOptions, setPagingOptions] = useState({
    currentPage: 0,
    rowsPerPage: 2,
    totalRows: 10,
    rowsPerPageOptions: [2, 4, 6],
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
    setPagingOptions({
      ...pagingOptions,
      totalRows: totalRows,
    });
  }, [totalRows]);

  useEffect(() => {
    getListOrders({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
    });
  }, [pagingOptions.currentPage, pagingOptions.rowsPerPage]);

  const columns = [
    {
      id: "code",
      label: "Mã hóa đơn",
      align: "left" as const,
      render: (row) => <p>{row.split("-")[0]}</p>,
    },
    { id: "customerName", label: "Khách hàng", align: "left" as const },
    { id: "customerPhone", label: "SĐT", align: "left" as const },
    {
      id: "paymentStatus",
      label: "Trạng thái thanh toán",
      align: "left" as const,
      render: (value) => (value === 1 ? "Chưa thanh toán" : "Đã thanh toán"),
    },
    {
      id: "totalPrice",
      label: "Tổng tiền",
      align: "left" as const,
      render: (value: number) =>
        value.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      id: "discountValue",
      label: "Chiết khấu",
      align: "left" as const,
      render: (value: number) =>
        value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
    },
    {
      id: "createdAt",
      label: "Ngày tạo",
      align: "left" as const,
      render: (row) => <p>{new Date(row).toLocaleString("vi-VN")}</p>,
    },
  ];

  return (
    <CommonPage title="Danh sách hóa đơn">
      <CommonCart>
        <CommonTable
          fullWidth
          enableActions
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
          onEditRow={(row) => navigate(`dashboard/order-detail/${row.id}`)}
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
