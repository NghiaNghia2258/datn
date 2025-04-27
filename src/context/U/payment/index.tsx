import { createContext, ReactNode, useContext } from "react";

interface PaymentContextType {}

export const PaymentContext = createContext<PaymentContextType | undefined>(
  undefined
);

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <PaymentContext.Provider value={{}}>{children}</PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("useCustomer phải được dùng bên trong CustomerProvider");
  }
  return context;
};
