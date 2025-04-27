import { AuthProvider } from "../../../context/AuthContext";
import FeatCustomerLogin from "../../../features/U/login";

const UserLogin = () => {
  return (
    <AuthProvider>
      <FeatCustomerLogin />
    </AuthProvider>
  );
};

export default UserLogin;
