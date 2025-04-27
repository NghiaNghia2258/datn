import { createContext, ReactNode, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { IInboundItemSchema } from "../../../features/A/create-update-inbound-receipt/zod";

export type SelectedProduct = {
  productId: string;
  productName: string;
};

interface CreateUpdateInboundReceiptContextType {
  receiptId?: string;

  // Dialog chọn sản phẩm
  isOpenProductDialog: boolean;
  toggleProductDialog: () => void;

  // Danh sách sản phẩm đã được chọn
  selectedProducts: IInboundItemSchema[];
  setSelectedProducts: (products: IInboundItemSchema[]) => void;
}

const InboundReceiptContext = createContext<
  CreateUpdateInboundReceiptContextType | undefined
>(undefined);

export const InboundReceiptProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { receiptId } = useParams<{ receiptId?: string }>();

  const [isOpenProductDialog, setIsOpenProductDialog] = useState(false);
  const toggleProductDialog = async () => {
    setIsOpenProductDialog((prev) => !prev);
  };

  const [selectedProducts, setSelectedProducts] = useState<
    IInboundItemSchema[]
  >([]);

  return (
    <InboundReceiptContext.Provider
      value={{
        receiptId,
        isOpenProductDialog,
        toggleProductDialog,
        selectedProducts,
        setSelectedProducts,
      }}
    >
      {children}
    </InboundReceiptContext.Provider>
  );
};

export const useCreateUpdateInboundReceipt =
  (): CreateUpdateInboundReceiptContextType => {
    const context = useContext(InboundReceiptContext);
    if (!context) {
      throw new Error(
        "useCreateUpdateInboundReceipt must be used within InboundReceiptProvider"
      );
    }
    return context;
  };
