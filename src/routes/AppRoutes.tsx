import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import App from "../App";
import Login from "../pages/A/Login";
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

export const DASHBOARD_URLS = {
  EMPLOYEE: {
    VIEW: "dashboard/employees",
  },
  PRODUCT: {
    VIEW: "dashboard/products",
    ADD: "dashboard/products/add",
    UPDATE: (id: string) => `dashboard/products/update/${id}`,
  },
  CUSTOMER: {
    VIEW: "dashboard/customers",
  },
  INBOUND: {
    CREATE: "dashboard/inbound/add",
    VIEW: "dashboard/inbounds",
    UPDATE: (id: string) => `dashboard/inbounds/update/${id}`,
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
  { path: "dashboard/products/update/:productId", element: <CreateProduct /> },
  {
    path: "dashboard/inbounds/update/:receiptId",
    element: <CreateUpdateInboundReceipt />,
  },
  {
    path: DASHBOARD_URLS.INBOUND.CREATE,
    element: <CreateUpdateInboundReceipt />,
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
];
const AppRoutes = () => (
  <Router>
    <Routes>
      <Route element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path={USER_URLS.AUTH.LOGIN} element={<UserLogin />} />
        <Route path={USER_URLS.AUTH.REGISTER} element={<UserRegister />} />
        <Route path="/" element={<DashboardLayout />} />
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
