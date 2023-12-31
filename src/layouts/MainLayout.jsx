import { Outlet, useLocation, Navigate } from "react-router-dom";
import { getCurrentAuth } from "../store/authSlice";
import { getCurrentUser } from "../store/userSlice";
import { useSelector } from "react-redux";

function MainLayout() {
  const { authenticated } = useSelector(getCurrentAuth);
  const { role } = useSelector(getCurrentUser);
  const location = useLocation();

  if (location.pathname === "/") {
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    switch (role) {
      case "ROLE_ADMIN":
        return <Navigate to="/admin" state={{ from: location }} replace />;
      case "ROLE_PLAYER":
        return <Navigate to="/player" state={{ from: location }} replace />;
      default:
        return null;
    }
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default MainLayout;
