import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import App from "../App";
import { DashboardLayout } from "../layouts/A";
import ViewEmployee from "../pages/A/view-employees";
import ViewProduct from "../pages/A/View-Product";
import CreateProduct from "../pages/A/create-product";
import ViewCustomer from "../pages/A/view-customer";
import UserLogin from "../pages/U/login";
import UserRegister from "../pages/U/register";
import CreateUpdateInboundReceipt from "../pages/A/create-update-inbound-receipt";
import ViewInboundReceipt from "../pages/A/view-inbound-receipt";
import Home from "../pages/U/home";
import { UserLayout } from "../layouts/U";
import ProductDetail from "../pages/U/product-detail";
import Cart from "../pages/U/cart";
import Payment from "../pages/U/payment";
import Profile from "../pages/U/profile";
import StoreProducts from "../pages/U/store-product";
import SearchProduct from "../pages/U/search-product";
import ViewCampaingn from "../pages/A/campaingn";
import ViewVoucher from "../pages/A/view-vouchers";
import CreateBandle from "../pages/A/create-bundle";
import CreateVolume from "../pages/A/create-volume";
import CreateVoucher from "../pages/A/create-voucher";
import OrderDetail from "../pages/A/order-detail";
import StoreRegistration from "../pages/U/sign-up";
import CustomerRegistration from "../pages/A/customer-sing-up";
import LoginForm from "../pages/login";
import ViewOrders from "../pages/A/order";
import FeatViewStores from "../pages/A/view-store";
import StoreDetailManagement from "../pages/A/store-detail";

export const DASHBOARD_URLS = {
  EMPLOYEE: {
    VIEW: "dashboard/employees",
  },
  PRODUCT: {
    VIEW: "dashboard/products",
    ADD: "dashboard/products/add",
    UPDATE: (id: string) => `dashboard/products/update/${id}`,
  },
  ORDER: {
    VIEW: "dashboard/orders",
    UPDATE: (id: string) => `dashboard/orders/update/${id}`,
  },
  CUSTOMER: {
    VIEW: "dashboard/customers",
  },
  INBOUND: {
    CREATE: "dashboard/inbounds/add",
    VIEW: "dashboard/inbounds",
    UPDATE: (id: string) => `dashboard/inbounds/update/${id}`,
  },
  DISCOUNT: {
    CREATE_BUNDLE: "dashboard/discounts/add-bundle",
    CREATE_VOLUME: "dashboard/discounts/add-volume",
    UPDATE_BUNDLE: (id: string) => `dashboard/discounts/update/bundle/${id}`,
    UPDATE_VOLUME: (id: string) => `dashboard/discounts/update/volume/${id}`,
    CREATE_VOUCHER: "dashboard/discounts/add-voucher",
    UPDATE_VOUCHER: (id: string) => `dashboard/discounts/update/voucher/${id}`,
    VIEW_CAMPAINGN: "dashboard/discounts",
    VIEW_VOUCHER: "dashboard/discounts/vouchers",
  },
};

export const USER_URLS = {
  AUTH: {
    LOGIN: "user/login",
    REGISTER: "user/register",
  },
  HOME: "home",
  PRODUCT_DETAIL: "product-detail",
  CART: "cart",
  PAYMENT: "payment",
  PROFILE: "profile",
  STORE_PRODUCTS: "store-products",
  SEARCH_PRODUCTS: "search-products",
};

const dashboardRoutes = [
  {
    path: DASHBOARD_URLS.EMPLOYEE.VIEW,
    element: <ViewEmployee />,
  },
  {
    path: DASHBOARD_URLS.CUSTOMER.VIEW,
    element: <ViewCustomer />,
  },
  { path: DASHBOARD_URLS.PRODUCT.VIEW, element: <ViewProduct /> },
  { path: DASHBOARD_URLS.PRODUCT.ADD, element: <CreateProduct /> },
  { path: DASHBOARD_URLS.INBOUND.VIEW, element: <ViewInboundReceipt /> },
  { path: DASHBOARD_URLS.DISCOUNT.VIEW_CAMPAINGN, element: <ViewCampaingn /> },
  { path: DASHBOARD_URLS.DISCOUNT.VIEW_VOUCHER, element: <ViewVoucher /> },
  { path: DASHBOARD_URLS.DISCOUNT.CREATE_BUNDLE, element: <CreateBandle /> },
  { path: DASHBOARD_URLS.DISCOUNT.CREATE_VOLUME, element: <CreateVolume /> },
  { path: DASHBOARD_URLS.DISCOUNT.CREATE_VOUCHER, element: <CreateVoucher /> },
  {
    path: DASHBOARD_URLS.DISCOUNT.UPDATE_BUNDLE(":bundleId"),
    element: <CreateBandle />,
  },
  {
    path: DASHBOARD_URLS.DISCOUNT.UPDATE_VOLUME(":volumeId"),
    element: <CreateVolume />,
  },
  {
    path: DASHBOARD_URLS.DISCOUNT.UPDATE_VOUCHER(":voucherId"),
    element: <CreateVoucher />,
  },
  { path: DASHBOARD_URLS.ORDER.VIEW, element: <ViewOrders /> },
  { path: DASHBOARD_URLS.ORDER.UPDATE(":orderId"), element: <OrderDetail /> },
  { path: "dashboard/products/update/:productId", element: <CreateProduct /> },
  {
    path: "dashboard/inbounds/update/:receiptId",
    element: <CreateUpdateInboundReceipt />,
  },
  {
    path: DASHBOARD_URLS.INBOUND.CREATE,
    element: <CreateUpdateInboundReceipt />,
  },
  ,
  {
    path: `dashboard/orders`,
    element: <ViewOrders />,
  },
  {
    path: `dashboard/order-detail/:orderId`,
    element: <OrderDetail />,
  },
  {
    path: `dashboard/stores`,
    element: <FeatViewStores />,
  },
  {
    path: "dashboard/store-detail/:id",
    element: <StoreDetailManagement />,
  },
];

const userRoutes = [
  {
    path: USER_URLS.HOME,
    element: <Home />,
  },
  {
    path: `${USER_URLS.PRODUCT_DETAIL}/:id`,
    element: <ProductDetail />,
  },
  {
    path: USER_URLS.CART,
    element: <Cart />,
  },
  {
    path: USER_URLS.PAYMENT,
    element: <Payment />,
  },
  {
    path: USER_URLS.PROFILE,
    element: <Profile />,
  },
  {
    path: `${USER_URLS.STORE_PRODUCTS}/:storeId`,
    element: <StoreProducts />,
  },
  {
    path: `${USER_URLS.SEARCH_PRODUCTS}/:searchKey`,
    element: <SearchProduct />,
  },

  {
    path: "store-regist",
    element: <StoreRegistration />,
  },
  {
    path: "customer-regist",
    element: <CustomerRegistration />,
  },
];
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route element={<App />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path={USER_URLS.AUTH.LOGIN} element={<UserLogin />} />
        <Route path={USER_URLS.AUTH.REGISTER} element={<UserRegister />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/" element={<DashboardLayout />}>
          {dashboardRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="/" element={<UserLayout />}>
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route element={<PrivateRoute />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRoutes;
