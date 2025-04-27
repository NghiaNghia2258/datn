import "./App.css";
import { Outlet } from "react-router-dom";
import { CommonToast } from "./components/common/toast";
import { useToast } from "./context/toast";
import { ValidationProvider } from "./context/validate";

function App() {
  const { isOpenToast, message } = useToast();
  return (
    <ValidationProvider>
      <Outlet />
      <CommonToast
        message={message}
        open={isOpenToast}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        vertical={"bottom"}
        horizontal={"center"}
      />
    </ValidationProvider>
  );
}

export default App;
