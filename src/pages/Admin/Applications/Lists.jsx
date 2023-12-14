import { useQuery } from "@tanstack/react-query";
import { fetchApplications } from "../../../api/requestApi";
import { Link } from "react-router-dom";
import { Card, Table, Tag } from "antd";
import { statusToColor } from "../../../utils";
import LoadingIndicator from "../../../components/UI/LoadingIndicator";

function ApplicationLists() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["admin-applications"],
    queryFn: fetchApplications,
    select: (applications) => {
      return applications.map((application) => ({
        ...application,
        key: application.applicationId,
      }));
    },
  });

  const columns = [
    {
      title: "신청번호",
      dataIndex: "applicationId",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.applicationId - b.applicationId,
      sortDirections: ["descend", "ascend"],
      align: "center",
    },
    {
      title: "신청날짜",
      dataIndex: "applicationDate",
      align: "center",
    },
    {
      title: "이름",
      dataIndex: "playerName",
      align: "center",
    },
    {
      title: "과정",
      dataIndex: "courseName",
      align: "center",
    },
    {
      title: "신청타입",
      dataIndex: "applicationType",
      align: "center",
    },
    {
      title: "신청상태",
      dataIndex: "applicationStatus",
      render: (status) => <Tag color={statusToColor(status)}>{status}</Tag>,
      align: "center",
    },
    {
      render: (record) => (
        <Link to={`${record.key}`} className="text-xs hover:text-primary-color">
          상세보기
        </Link>
      ),
      align: "center",
    },
  ];

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (applications)
    content = <Table columns={columns} dataSource={applications} />;
  return <Card>{content}</Card>;
}

export default ApplicationLists;
