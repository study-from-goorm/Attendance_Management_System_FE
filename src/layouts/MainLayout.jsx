import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { getCurrentAuth } from '../store/authSlice';
import { getCurrentUser } from '../store/userSlice';
import { useSelector } from 'react-redux';

function MainLayout() {
  const { authenticated } = useSelector(getCurrentAuth);
  const { role } = useSelector(getCurrentUser);
  const location = useLocation();

  if (location.pathname === '/') {
    if (!authenticated) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    switch (role) {
      case 'admin':
        return <Navigate to="/admin" state={{ from: location }} replace />;
      case 'player':
        return <Navigate to="/player" state={{ from: location }} replace />;
      default:
        return null;
    }
  }

  return (
    <>
      <p>main layout...</p>
      <Outlet />
    </>
  );
}

export default MainLayout;
