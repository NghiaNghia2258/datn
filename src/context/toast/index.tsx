import { createContext, ReactNode, useContext, useState } from "react";

interface ToastContextType {
  showToast: (message: string, duration?: number) => void;
  isOpenToast: boolean;
  message: string;
}
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Show toast");
  const showToast = (message: string, duration?: number) => {
    setIsOpenToast(true);
    setMessage(message);
    setTimeout(() => {
      setIsOpenToast(false);
    }, duration || 3000);
  };
  return (
    <ToastContext.Provider value={{ showToast, isOpenToast, message }}>
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useEmployee phải được dùng bên trong EmployeeProvider");
  }
  return context;
};
