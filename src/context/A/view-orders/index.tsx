import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { RequestGetAllOrders, ResponseGetAllOrders } from "./model";
import OrderService from "./sevice";

interface OrderContextType {
  orders: ResponseGetAllOrders[];
  orderEdit: ResponseGetAllOrders | null;
  loading: boolean;
  textSearch: string;
  setTextSearch: (text: string) => void;
  setLoading: (loading: boolean) => void;
  getListOrders: (option?: RequestGetAllOrders) => Promise<void>;
  setOrderEdit: (value: ResponseGetAllOrders) => void;
  totalRows: number;
}

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<ResponseGetAllOrders[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [textSearch, setTextSearch] = useState<string>("");
  const [orderEdit, setOrderEdit] = useState<ResponseGetAllOrders | null>(null);
  const [totalRows, setTotalRow] = useState<number>(0);

  const getListOrders = async (option?: RequestGetAllOrders) => {
    setLoading(true);
    try {
      const response = await OrderService.getAll(option);
      setOrders(response.items || []);
      setTotalRow(response.totalRows);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        totalRows,
        orders,
        loading,
        textSearch,
        orderEdit,
        getListOrders,
        setLoading,
        setTextSearch,
        setOrderEdit,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useViewOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useViewOrder phải được dùng bên trong OrderProvider");
  }
  return context;
};
