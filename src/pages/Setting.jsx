import { Space, Card } from "antd";
import PageTitle from "../components/PageTitle";
import { IoSettingsOutline } from "react-icons/io5";

function Setting() {
  return (
    <>
      <Space>
        <IoSettingsOutline className="text-3xl" />
        <PageTitle title="설정" />
      </Space>
      <Card></Card>
    </>
  );
}

export default Setting;
