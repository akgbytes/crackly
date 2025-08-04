import { useAppContext } from "../hooks/useAppContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // const { user, loading } = useAppContext();
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div>Loading...</div>
  //     </div>
  //   );
  // }

  return true ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
