import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import CustomerService from "../../../services/customer.service";
import {
  Customer,
  CustomerCreate,
  CustomerUpdate,
} from "../../../features/A/view-customer/zod";
import { RequestGetAllCustomers } from "../../../services/request/customer.request";

interface CustomerContextType {
  customers: Customer[];
  customerEdit: Customer | null;
  loading: boolean;
  filter: string;
  textSearch: string;
  code?: string;
  customerCreateSchema: CustomerCreate;
  customerUpdateSchema?: CustomerUpdate;
  setFilter: (filter: string) => void;
  setLoading: (loading: boolean) => void;
  getListCustomers: (option?: RequestGetAllCustomers) => void;
  setCustomerEdit: (value: Customer) => void;
  setCustomerCreateSchema: (value: CustomerCreate) => void;
  setCustomerUpdateSchema: (value: CustomerUpdate) => void;
  setCode: (value: string) => void;
  setTextSearch: (value: string) => void;
}

export const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");
  const [customerCreateSchema, setCustomerCreateSchema] =
    useState<CustomerCreate>({
      name: "",
      phone: "",
      password: "",
    });
  const [customerUpdateSchema, setCustomerUpdateSchema] =
    useState<CustomerUpdate>({
      id: "",
      name: "",
      phone: "",
      password: "",
    });
  const [customerEdit, setCustomerEdit] = useState<Customer | null>(null);

  const getListCustomers = async (option?: RequestGetAllCustomers) => {
    setLoading(true);
    try {
      const response = await CustomerService.getAll(option);
      setCustomers(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListCustomers();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        code,
        setCode,
        textSearch,
        setTextSearch,
        customerUpdateSchema,
        setCustomerUpdateSchema,
        customerCreateSchema,
        setCustomerCreateSchema,
        customers,
        loading,
        filter,
        customerEdit,
        setCustomerEdit,
        setFilter,
        setLoading,
        getListCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useViewCustomer = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer phải được dùng bên trong CustomerProvider");
  }
  return context;
};
