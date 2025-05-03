import { NavbarItemModel } from "./type";
import {
  Home,
  Fastfood,
  Grade,
  Groups, // icon cho khách hàng
} from "@mui/icons-material";

export const DEFAULT_ROUTE: NavbarItemModel[] = [
  {
    title: "Trang chủ",
    path: "",
    icon: Home,
  },
  {
    title: "Sản phẩm",
    path: "products",
    icon: Fastfood,
    children: [
      {
        title: "Danh sách sản phẩm",
        path: "",
      },
      {
        title: "Thêm sản phẩm",
        path: "add",
      },
    ],
  },
  {
    title: "Đơn hàng",
    path: "orders",
    icon: Fastfood,
    children: [
      {
        title: "Danh sách đơn hàng",
        path: "/",
      },
    ],
  },
  {
    title: "Quản lý nhân viên",
    path: "employees",
    icon: Grade,
    children: [
      {
        title: "Danh sách nhân viên",
        path: "/",
      },
      {
        title: "Thêm nhân viên",
        path: "add",
      },
    ],
  },
  {
    title: "Khách hàng",
    path: "customers",
    icon: Groups,
    children: [
      {
        title: "Danh sách khách hàng",
        path: "/",
      },
    ],
  },
  {
    title: "Kho hàng",
    path: "inbounds",
    icon: Groups,
    children: [
      {
        title: "Danh sách phiếu nhập",
        path: "/",
      },
      {
        title: "Tạo phiếu nhập",
        path: "add",
      },
    ],
  },
  {
    title: "Giảm giá",
    path: "discounts",
    icon: Groups,
    children: [
      {
        title: "Danh sách chiến dịch",
        path: "/",
      },
      {
        title: "Danh sách voucher",
        path: "vouchers",
      },
      {
        title: "Tạo voucher",
        path: "add",
      },
      {
        title: "Tạo bundle",
        path: "add/bundle",
      },
      {
        title: "Tạo volume",
        path: "add/voulme",
      },
    ],
  },
];
