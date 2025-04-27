import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/view-products");
  };

  return (
    <div>
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;
