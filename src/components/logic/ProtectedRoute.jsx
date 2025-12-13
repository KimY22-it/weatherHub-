import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const isAccessToken = Cookies.get("accessToken");

  if (!isAccessToken) {
    return <Navigate to="/login" />;
  }

  return children;
}
