import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { RequestGetALlEmployees } from "../../../services/request/employee.request";
import EmployeeService from "../../../services/employee.service";
import { ResponseGetAllEmployees } from "../../../services/response/employee.response";
import {
  EmployeeCreateSchema,
  EmployeeUpdateSchema,
} from "../../../features/A/create-update-employee/zod";

interface EmployeeContextType {
  employees: ResponseGetAllEmployees[];
  employeeEdit: ResponseGetAllEmployees | null;
  loading: boolean;
  filter: string;
  textSearch: string;
  code?: string;
  employeeCreateSchema: EmployeeCreateSchema;
  employeeUpdateSchema?: EmployeeUpdateSchema;
  setFilter: (filter: string) => void;
  setLoading: (loading: boolean) => void;
  getListEmployees: (option?: RequestGetALlEmployees) => void;
  setEmployeeEdit: (value: ResponseGetAllEmployees) => void;
  setEmployeeCreateSchema: (value: EmployeeCreateSchema) => void;
  setEmployeeUpdateSchema: (value: EmployeeUpdateSchema) => void;
  setCode: (value: string) => void;
  setTextSearch: (value: string) => void;
}

export const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [employees, setEmployees] = useState<ResponseGetAllEmployees[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");
  const [employeeCreateSchema, setEmployeeCreateSchema] =
    useState<EmployeeCreateSchema>({
      name: "",
      gender: "Nam",
      phone: "",
      mail: "",
    });
  const [employeeUpdateSchema, setEmployeeUpdateSchema] =
    useState<EmployeeUpdateSchema>({
      code: "",
      name: "",
      gender: "Nam",
      phone: "",
      mail: "",
    });
  const [employeeEdit, setEmployeeEdit] =
    useState<ResponseGetAllEmployees | null>(null);
  const getListEmployees = async (option?: RequestGetALlEmployees) => {
    setLoading(true);
    try {
      const response = await EmployeeService.getAll(option);
      setEmployees(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListEmployees();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        code,
        setCode,
        textSearch,
        setTextSearch,
        employeeUpdateSchema,
        setEmployeeUpdateSchema,
        employeeCreateSchema,
        setEmployeeCreateSchema,
        employees,
        loading,
        filter,
        employeeEdit,
        setEmployeeEdit,
        setFilter,
        setLoading,
        getListEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useViewEmployee = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee phải được dùng bên trong EmployeeProvider");
  }
  return context;
};
