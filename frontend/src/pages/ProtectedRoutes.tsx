import React from "react";
import { useAppContext } from "../hooks/useAppContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useAppContext();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
