import { useNavigate } from "react-router-dom";

export function useNavigateCommon() {
  const navigate = useNavigate();

  const absoluteNavigate = (
    to: string,
    options?: { replace?: boolean; state?: any }
  ) => {
    // Đảm bảo to luôn bắt đầu bằng dấu "/"
    const absolutePath = to.startsWith("/") ? to : `/${to}`;
    navigate(absolutePath, options);
  };

  return absoluteNavigate;
}
