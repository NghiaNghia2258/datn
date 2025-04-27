import { createContext, ReactNode, useContext, useState } from "react";

interface HomeContextType {
  currentBanner: number;
  setCurrentBanner: (value: number) => void;
}

export const HomeContext = createContext<HomeContextType | undefined>(
  undefined
);

export const HomeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentBanner, setCurrentBanner] = useState<number>(1);
  return (
    <HomeContext.Provider value={{ currentBanner, setCurrentBanner }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useCustomer phải được dùng bên trong CustomerProvider");
  }
  return context;
};
