import { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { useToast } from "../../context/toast";
import VoucherService from "../../services/voucher.service";
import { commonDebounce } from "../../utils/debounce";
import CommonPage from "../../components/common/page";
import { CommonCart } from "../../components/common/card";
import CommonTable from "../../components/common/table";
import { formatPrice } from "../../utils/format-price";
import { formatDateOnly } from "../../utils/format-date";

const FeatViewVouchers = () => {
  const { showToast } = useToast();
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");

  const [pagingOptions, setPagingOptions] = useState({
    currentPage: 0,
    rowsPerPage: 2,
    totalRows: 0,
    rowsPerPageOptions: [2, 4, 6],
  });

  const getListVouchers = async ({
    pageIndex,
    pageSize,
    keyWord,
  }: {
    pageIndex: number;
    pageSize: number;
    keyWord?: string;
  }) => {
    setLoading(true);
    try {
      const res = await VoucherService.getAll({
        pageIndex,
        pageSize,
        keyWord: keyWord || "",
      });
      setVouchers(res.data);
      setPagingOptions((prev) => ({
        ...prev,
        totalRows: res.TotalRecordsCount || 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    commonDebounce(async (value: string) => {
      await getListVouchers({
        pageIndex: 0,
        pageSize: pagingOptions.rowsPerPage,
        keyWord: value,
      });
    }, 500),
    [pagingOptions.rowsPerPage]
  );

  useEffect(() => {
    getListVouchers({
      pageIndex: pagingOptions.currentPage,
      pageSize: pagingOptions.rowsPerPage,
      keyWord: textSearch,
    });
  }, [pagingOptions.currentPage, pagingOptions.rowsPerPage]);

  const columns = [
    { id: "voucherCode", label: "Mã", align: "left" as const },
    { id: "title", label: "Tiêu đề", align: "left" as const },
    { id: "discountPercent", label: "Giảm (%)", align: "left" as const },
    {
      id: "discountValue",
      label: "Giảm (Giá trị)",
      align: "left" as const,
      render: (value) => <p>{formatPrice(value)}</p>,
    },
    {
      id: "maxDiscountValue",
      label: "Tối đa",
      align: "left" as const,
      render: (value) => <p>{formatPrice(value)}</p>,
    },
    {
      id: "minOrderValue",
      label: "Tối thiểu đơn",
      align: "left" as const,
      render: (value) => <p>{formatPrice(value)}</p>,
    },
    {
      id: "startDate",
      label: "Bắt đầu",
      align: "left" as const,
      render: (value) => <p>{formatDateOnly(value)}</p>,
    },
    {
      id: "expirationDate",
      label: "Hết hạn",
      align: "left" as const,
      render: (value) => <p>{formatDateOnly(value)}</p>,
    },
  ];

  const handleClickAddVoucher = () => {};

  return (
    <CommonPage title="Danh sách Voucher">
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box sx={{ flex: 12 }}>
          <CommonCart>
            <CommonTable
              fullWidth
              enableActions
              loading={loading}
              showButtonAdd
              showInputSearch
              columns={columns}
              data={vouchers}
              onClickButtonAdd={handleClickAddVoucher}
              textSearch={textSearch}
              onSearch={async (e) => {
                setTextSearch(e);
                await handleSearch(e);
              }}
              onDeleteRow={async (row) => {
                await VoucherService.delete(row.id);
                showToast("Xóa voucher thành công");
                await getListVouchers({
                  pageIndex: pagingOptions.currentPage,
                  pageSize: pagingOptions.rowsPerPage,
                  keyWord: textSearch,
                });
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
        </Box>
      </Box>
    </CommonPage>
  );
};

export default FeatViewVouchers;
