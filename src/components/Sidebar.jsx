import {
  FaClipboardCheck,
  FaClipboardList,
  FaChalkboardUser,
  FaRegUser,
  FaWandMagic,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import { IoMdCloudOutline, IoIosLogOut } from 'react-icons/io';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';
import { getCurrentUser } from '../store/userSlice';
import { useSelector } from 'react-redux';
import { NavLink, Form } from 'react-router-dom';

const iconClass =
  'flex items-center cursor-pointer hover:bg-gray-200 px-1 py-2 text-primary-color';
const sectionClass = 'title text-bold text-xs text-neutral-color mt-4 mb-1';

const Sidebar = () => {
  const { role } = useSelector(getCurrentUser);
  return (
    <div className="w-[240px] border-r-2 min-h-screen bg-white ">
      <NavLink
        to="/"
        className="h-16 flex items-center justify-center gap-x-2 px-2"
      >
        <IoMdCloudOutline className="text-xl" />
        <span className="text-xl font-semibold text-primary-color">
          구름 출결관리 시스템
        </span>
      </NavLink>
      <hr className="h-0 border bg-neutral-color" />
      <div className="pl-4">
        <ul className="space-y-1">
          {/* 어드민 */}
          {role === 'admin' && (
            <>
              <p className={sectionClass}>ADMIN</p>
              <li>
                <NavLink
                  to="/admin/main"
                  className={({ isActive }) =>
                    `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
                  }
                >
                  <IoHomeOutline className="text-xl" />
                  <span className="font-medium ml-2">대시보드</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/courses"
                  className={({ isActive }) =>
                    `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
                  }
                >
                  <SiGoogleclassroom className="text-xl" />
                  <span className="font-medium ml-2">과정 정보</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/players"
                  className={({ isActive }) =>
                    `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
                  }
                >
                  <FaRegUser className="text-xl" />
                  <span className="font-medium ml-2">플레이어 정보</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/attendances"
                  className={({ isActive }) =>
                    `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
                  }
                >
                  <FaClipboardList className="text-xl" />
                  <span className="font-medium ml-2">출결 관리</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/applys"
                  className={({ isActive }) =>
                    `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
                  }
                >
                  <FaClipboardCheck className="text-xl" />
                  <span className="font-medium ml-2">신청 관리</span>
                </NavLink>
              </li>
            </>
          )}
          {/* 플레이어 */}
          <p className={sectionClass}>PLAYER</p>
          <li>
            <NavLink
              to="/player/main"
              className={({ isActive }) =>
                `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
              }
            >
              <FaChalkboardUser className="text-xl" />
              <span className="font-medium ml-2">출결 정보</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/player/apply"
              className={({ isActive }) =>
                `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
              }
              end
            >
              <FaWandMagic className="text-xl" />
              <span className="font-medium ml-2">신청 관리</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/player/apply/result"
              className={({ isActive }) =>
                `${iconClass} ${isActive ? 'bg-gray-200' : ''}`
              }
            >
              <FaWandMagicSparkles className="text-xl" />
              <span className="font-medium ml-2">신청 결과</span>
            </NavLink>
          </li>
          {/* 공통 */}
          <p className={sectionClass}>USERS</p>
          <li>
            <Form action="/logout" method="post" className={iconClass}>
              <IoIosLogOut className="text-xl" />
              <button className="font-medium ml-2">로그아웃</button>
            </Form>
          </li>
          <li className={iconClass}>
            <IoSettingsOutline className="text-xl" />
            <span className="font-medium ml-2">설정</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
