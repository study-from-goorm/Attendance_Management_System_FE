import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/Error";
import LoginPage, { action as loginAction } from "../pages/Auth/Login";
import { action as logoutAction } from "../pages/Auth/Logout";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import RoleRouter from "./RoleRouter";
import PlayerLayout from "../layouts/PlayerLayout";
import PlayerMainPage, { loader as playerLoader } from "../pages/Player/Main";
import PlayerApplyPage from "../pages/Player/Apply";
import PlayerResultPage, {
  loader as applyResultLoader,
} from "../pages/Player/Result";
import AdminLayout from "../layouts/AdminLayout";
import AdminMainPage from "../pages/Admin/Main";
import PlayersInfo, {
  loader as playersInfoLoader,
} from "../pages/Admin/Players/PlayersInfo";
import AttendanceInfo from "../pages/Admin/Attendance/AttendanceInfo";
import NewPlayer from "../pages/Admin/Players/NewPlayer";
import EditPlayer, {
  loader as editPlayerLoader,
  action as editPlayerAction,
} from "../pages/Admin/Players/EditPlayer";
import Courses, { loader as coursesLoader } from "../pages/Admin/Courses";
import NewCourse from "../pages/Admin/Courses/NewCourse";
import EditCourse, {
  loader as editCourseLoader,
  action as editCourseAction,
} from "../pages/Admin/Courses/EditCourse";
import Applications from "../pages/Admin/Applications/index";
import Application, {
  loader as applicationLoader,
  action as applicationAction,
} from "../pages/Admin/Applications/Application";
import Setting from "../pages/Setting";

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
            <RoleRouter allowedRoles={["ROLE_PLAYER"]}>
              <PlayerLayout />
            </RoleRouter>
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<Navigate to="main" />} />
          <Route
            path="main"
            loader={playerLoader}
            element={<PlayerMainPage />}
          />
          <Route path="apply" element={<PlayerApplyPage />} />
          <Route
            path="apply/result"
            // loader={applyResultLoader}
            element={<PlayerResultPage />}
          />
        </Route>
        <Route
          path="admin"
          element={
            <RoleRouter allowedRoles={["ROLE_ADMIN"]}>
              <AdminLayout />
            </RoleRouter>
          }
          errorElement={<ErrorPage />}
        >
          <Route index element={<Navigate to="main" />} />
          <Route path="main" element={<AdminMainPage />} />
          <Route
            path="players"
            element={<PlayersInfo />}
            loader={playersInfoLoader}
          >
            <Route
              path="new"
              element={<NewPlayer />}
              loader={playersInfoLoader}
            />
            <Route
              path=":id/edit"
              element={<EditPlayer />}
              loader={editPlayerLoader}
              action={editPlayerAction}
            />
          </Route>
          <Route path="courses" element={<Courses />} loader={coursesLoader}>
            <Route
              path="new"
              element={<NewCourse />}
              loader={playersInfoLoader}
            />
            <Route
              path=":id/edit"
              element={<EditCourse />}
              loader={editCourseLoader}
              action={editCourseAction}
            />
          </Route>
          <Route path="attendances" element={<AttendanceInfo />} />
          <Route path="applications" element={<Applications />}>
            <Route
              path=":applicationId"
              element={<Application />}
              loader={applicationLoader}
              action={applicationAction}
            />
          </Route>
        </Route>
        <Route path="setting" element={<Setting />} />
        <Route path="logout" action={logoutAction} />
      </Route>
    </Route>
  )
);

export default router;
