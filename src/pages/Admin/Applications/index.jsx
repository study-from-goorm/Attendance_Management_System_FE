import { Divider, Space } from "antd";
import { FaClipboardList } from "react-icons/fa6";
import PageTitle from "../../../components/PageTitle";
import Search from "./Search";
import Lists from "./Lists";
import { Outlet } from "react-router-dom";

function Applications() {
  return (
    <>
      <Outlet />
      <Space>
        <FaClipboardList className="text-3xl" />
        <PageTitle title="신청서 관리" />
      </Space>
      <Search />
      <Divider></Divider>
      <Lists />
    </>
  );
}

export default Applications;
