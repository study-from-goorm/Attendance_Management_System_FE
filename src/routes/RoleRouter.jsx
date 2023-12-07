import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../store/userSlice';
import Unauthorized from '../pages/Unauthorized';

function RoleRouter({ allowedRoles, children }) {
  const { role } = useSelector(getCurrentUser);
  const location = useLocation();

  // eslint-disable-next-line react/prop-types
  if (role && allowedRoles?.includes(role)) {
    console.log('위!!!');
    return <>{children}</>;
  }
  console.log('아래!!');
  return <Unauthorized state={{ from: location }} replace />;
}

export default RoleRouter;
