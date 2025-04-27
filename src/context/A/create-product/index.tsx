import { createContext, ReactNode, useContext } from "react";
import { useParams } from "react-router-dom";

interface CreateUpdateProductContextType {
  productId?: string;
}
export const CreateProductContext = createContext<
  CreateUpdateProductContextType | undefined
>(undefined);
export const CreateProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { productId } = useParams();
  return (
    <CreateProductContext.Provider value={{ productId }}>
      {children}
    </CreateProductContext.Provider>
  );
};
export const useCreateUpdateProduct = (): CreateUpdateProductContextType => {
  const context = useContext(CreateProductContext);
  if (!context) {
    throw new Error("useEmployee phải được dùng bên trong EmployeeProvider");
  }
  return context;
};
