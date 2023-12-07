import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Auth/Login';
import { action as logoutAction } from '../pages/Auth/Logout';
import PrivateRouter from './PrivateRouter';
import PlayerLayout from '../layouts/PlayerLayout';
import PlayerMainPage from '../pages/Player/Main';
import PlayerApplyPage from '../pages/Player/Apply';
import PlayerResultPage from '../pages/Player/Result';
import AdminLayout from '../layouts/AdminLayout';
import AdminMainPage from '../pages/Admin/Main';
import PlayersInfo from '../pages/Admin/Players/PlayersInfo';
import AttendanceInfo from '../pages/Admin/Attendance/AttendanceInfo';
import ApplyInfo from '../pages/Admin/Apply/ApplyInfo';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  // private routes
  {
    element: <PrivateRouter />,
    children: [
      {
        path: 'logout',
        action: logoutAction,
      },
      {
        path: 'player',
        element: <PlayerLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="main" />,
          },
          {
            path: 'main',
            element: <PlayerMainPage />,
          },
          {
            path: 'apply',
            element: <PlayerApplyPage />,
          },
          {
            path: 'apply/result',
            element: <PlayerResultPage />,
          },
        ],
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="main" />,
          },
          {
            path: 'main',
            element: <AdminMainPage />,
          },
          {
            path: 'players',
            element: <PlayersInfo />,
          },
          {
            path: 'attendances',
            element: <AttendanceInfo />,
          },
          {
            path: 'applys',
            element: <ApplyInfo />,
          },
        ],
      },
    ],
  },
]);

export default router;
