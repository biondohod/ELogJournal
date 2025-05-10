import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const user = true;
  const isLoading = false;

  if (isLoading) return <Loader size={86} />;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
