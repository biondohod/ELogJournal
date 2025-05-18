import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useUser } from "../../query/queries";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading } = useUser();

  if (isLoading) return <Loader size={86} />;

  if (!user) return <Navigate to="/auth" replace />;

  return children;
};

export default ProtectedRoute;
