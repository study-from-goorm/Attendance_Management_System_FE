import { getCurrentUser } from "../store/userSlice";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

const Navbar = () => {
  const { username, role } = useSelector(getCurrentUser);
  let roleKor = "플레이어";
  if (role === "ROLE_ADMIN") roleKor = "관리자";

  return (
    <div className="navbar bg-white border-b-2 ">
      <div className="wrapper h-16 flex items-center justify-end">
        <div className="text-primary-color px-4 cursor-pointer">
          안녕하세요.
          <Tooltip title={username}>
            <span className="ml-2 font-semibold">{roleKor}</span>
          </Tooltip>
          님
        </div>
      </div>
    </div>
  );
};

export default Navbar;
