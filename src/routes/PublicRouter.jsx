import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentAuth } from '../store/authSlice';

function PublicRouter() {
  const { authenticated, accessToken } = useSelector(getCurrentAuth);
  const location = useLocation();

  if (authenticated && accessToken) {
    return <Navigate to="/player" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PublicRouter;
