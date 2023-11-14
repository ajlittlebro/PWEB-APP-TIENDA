import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./context/AuthContext";

function RutaProtegida() {
  const { loading, isAuthenticated } = UseAuth();
  console.log(loading, isAuthenticated);

  if (loading) return <h1>Loading...</h1>; 
  if (!loading && !isAuthenticated) return <Navigate to="/crud/login" replace />;

  return <Outlet />;
}

export default RutaProtegida;
