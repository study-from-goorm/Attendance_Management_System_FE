import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentAuth } from '../store/authSlice';

function PublicRouter() {
  const { authenticated, accessToken } = useSelector(getCurrentAuth);
  const location = useLocation();

  if (authenticated && accessToken) {
    return <Navigate to="/player" state={{ from: location }} replace />;
  }
  return (
    <>
      <h1>귀하는 로그인 되어있지 않습니다.</h1>
      <Outlet />
    </>
  );
}

export default PublicRouter;
