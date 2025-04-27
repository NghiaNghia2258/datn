import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ResponseGetAllInboundReceipts } from "../../../services/response/inbound-receipt.response";
import InboundReceiptService from "../../../services/inbound-receipt.service";
import { RequestGetAllInboundReceipts } from "../../../services/request/inbound-receipt.request";

interface InboundReceiptContextType {
  inboundReceipts: ResponseGetAllInboundReceipts[];
  loading: boolean;
  filter: string;
  textSearch: string;
  setFilter: (filter: string) => void;
  setLoading: (loading: boolean) => void;
  getListInboundReceipts: (option?: RequestGetAllInboundReceipts) => void;
  setTextSearch: (value: string) => void;
}

export const InboundReceiptContext = createContext<
  InboundReceiptContextType | undefined
>(undefined);

export const InboundReceiptProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inboundReceipts, setInboundReceipts] = useState<
    ResponseGetAllInboundReceipts[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [textSearch, setTextSearch] = useState<string>("");

  const getListInboundReceipts = async (
    option?: RequestGetAllInboundReceipts
  ) => {
    setLoading(true);
    try {
      const response = await InboundReceiptService.getAll(option);
      setInboundReceipts(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListInboundReceipts();
  }, []);

  return (
    <InboundReceiptContext.Provider
      value={{
        inboundReceipts,
        loading,
        filter,
        textSearch,
        setFilter,
        setLoading,
        getListInboundReceipts,
        setTextSearch,
      }}
    >
      {children}
    </InboundReceiptContext.Provider>
  );
};

export const useViewInboundReceipts = (): InboundReceiptContextType => {
  const context = useContext(InboundReceiptContext);
  if (!context) {
    throw new Error(
      "useViewInboundReceipts phải được dùng bên trong InboundReceiptProvider"
    );
  }
  return context;
};
