import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/Error';
import LoginPage, { action as loginAction } from '../pages/Auth/Login';
import { action as logoutAction } from '../pages/Auth/Logout';
import PublicRouter from './PublicRouter';
import PrivateRouter from './PrivateRouter';
import RoleRouter from './RoleRouter';
import PlayerLayout from '../layouts/PlayerLayout';
import PlayerMainPage from '../pages/Player/Main';
import PlayerApplyPage from '../pages/Player/Apply';
import PlayerResultPage from '../pages/Player/Result';
import AdminLayout from '../layouts/AdminLayout';
import AdminMainPage from '../pages/Admin/Main';
import PlayersInfo from '../pages/Admin/Players/PlayersInfo';
import AttendanceInfo from '../pages/Admin/Attendance/AttendanceInfo';
import ApplyInfo from '../pages/Admin/Apply/ApplyInfo';
// errorElement={<ErrorPage />}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route element={<PublicRouter />}>
        <Route path="login" element={<LoginPage />} action={loginAction} />
      </Route>
      <Route element={<PrivateRouter />}>
        <Route
          path="player"
          element={
            <RoleRouter allowedRoles={['player', 'admin']}>
              <PlayerLayout />
            </RoleRouter>
          }
        >
          <Route index element={<Navigate to="main" />} />
          <Route path="main" element={<PlayerMainPage />} />
          <Route path="apply" element={<PlayerApplyPage />} />
          <Route path="apply/result" element={<PlayerResultPage />} />
        </Route>
        <Route
          path="admin"
          element={
            <RoleRouter allowedRoles={['admin']}>
              <AdminLayout />
            </RoleRouter>
          }
        >
          <Route index element={<Navigate to="main" />} />
          <Route path="main" element={<AdminMainPage />} />
          <Route path="players" element={<PlayersInfo />} />
          <Route path="attendances" element={<AttendanceInfo />} />
          <Route path="applys" element={<ApplyInfo />} />
        </Route>
        <Route path="logout" action={logoutAction} />
      </Route>
    </Route>,
  ),
);

export default router;
