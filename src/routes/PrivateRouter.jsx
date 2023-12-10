import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCurrentAuth } from '../store/authSlice';

import Sidebar from '../components/Sidebar';
import ContentWrapper from '../components/ContentWrapper';
import Navbar from '../components/Navbar';

function PrivateRouter() {
  const { authenticated, accessToken } = useSelector(getCurrentAuth);
  const location = useLocation();

  if (!authenticated || !accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <div className="flex">
      <Sidebar />

      <ContentWrapper>
        <Navbar />
        <main className="p-8 space-y-6">
          <Outlet />
        </main>
      </ContentWrapper>
    </div>
  );
}

export default PrivateRouter;
