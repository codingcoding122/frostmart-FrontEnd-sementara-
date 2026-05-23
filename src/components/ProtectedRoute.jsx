import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // DUMMY LOGIN
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;