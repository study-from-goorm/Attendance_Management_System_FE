import { Outlet, Navigate } from 'react-router-dom';
import { CheckToken } from '../auth/checkToken';

function PrivateRouter() {
  const { isAuth } = CheckToken();
  if (isAuth === 'Failed') {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default PrivateRouter;
