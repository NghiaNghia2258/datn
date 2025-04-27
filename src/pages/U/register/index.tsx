import { AuthProvider } from "../../../context/AuthContext";
import FeatCustomerRegister from "../../../features/U/register";

const UserRegister = () => {
  return (
    <AuthProvider>
      <FeatCustomerRegister />
    </AuthProvider>
  );
};

export default UserRegister;
