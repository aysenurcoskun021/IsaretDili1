import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
export default function RequireAuth({ children }) {
  const { isAuthenticated } = useApp();
  const location = useLocation();
  return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location.pathname, notice: "Bu sayfayı kullanmak için giriş yapmalısın." }} />;
}