import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const PublicRoute = ({ children }) => {
  const user = true;
  const isLoading = false;

  if (isLoading) return <Loader size={86} />;

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
