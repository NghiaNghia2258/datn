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
    title: "Quản lý sản phẩm",
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
    title: "Quản lý đơn hàng",
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
    title: "Quản lý kho hàng",
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
    title: "Quản lý mã giảm giá",
    path: "discounts",
    icon: Groups,
    children: [
      {
        title: "Danh sách voucher",
        path: "vouchers",
      },
      {
        title: "Tạo voucher",
        path: "add",
      },
     
    ],
  },
  {
    title: "Đăng xuất",
    path: "login",
    icon: Home,
  },
];

export const DEFAULT_ROUTE_1: NavbarItemModel[] = [
  {
    title: "Trang chủ",
    path: "",
    icon: Home,
  },
  {
    title: "Quản lý đơn hàng",
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
    title: "Quản lý khách hàng",
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
    title: "Quản lý cửa hàng",
    path: "stores",
    icon: Groups,
    children: [
      {
        title: "Danh sách cửa hàng",
        path: "/",
      },
    ],
  },
  {
    title: "Đăng xuất",
    path: "login",
    icon: Home,
  },
]