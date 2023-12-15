import { Flex, Table, Tag } from "antd";
import PageTitle from "../../components/PageTitle";
import { statusToColor, waitForRehydration } from "../../utils";
import store from "../../store";
import { fetchApplicationResult, queryClient } from "../../api/requestApi";
import dayjs from "dayjs";

// Before Rendering 플레이어 출결 신청 결과 조회

export const loader = async () => {
  await waitForRehydration();
  const playerId = store.getState().user.playerId;

  return queryClient.fetchQuery({
    queryKey: ["player_applicationData"],
    queryFn: () => fetchApplicationResult(playerId),
  });
};

function PlayerResultPage() {
  const queryData = queryClient.getQueryData(["player_applicationData"]);

  const columns = [
    {
      title: "신청 구분",
      dataIndex: "applicationType",
      render: (type) => <Tag>{type}</Tag>,
    },
    {
      title: "출결 신청 적용일",
      dataIndex: "applicationTargetDate",
      sorter: (a, b) => dayjs(a) - dayjs(b),
      sortDirections: ["descend"],
    },

    {
      title: "신청 사유",
      dataIndex: "applicationReason",
    },
    {
      title: "신청일",
      dataIndex: "applicationDate",
      sorter: (a, b) => dayjs(a) - dayjs(b),
      sortDirections: ["descend"],
    },
    {
      title: "상태",
      dataIndex: "applicationStatus",
      render: (status) => <Tag color={statusToColor(status)}>{status}</Tag>,
    },
  ];

  const data = queryData.map((item, idx) => {
    return {
      key: idx,
      applicationDate: item.applicationDate,
      applicationTargetDate: item.applicationTargetDate,
      applicationType: item.applicationType,
      applicationReason: item.applicationReason,
      applicationStatus: item.applicationStatus,
    };
  });
  // 임시 mock data
  // const data = [
  //   {
  //     key: "1",
  //     applicationTargetDate: "2023-12-08",
  //     applicationType: "조퇴",
  //     applicationReason: "병원 예약이 있습니다.",
  //     applicationStatus: "승인",
  //   },
  //   {
  //     key: "2",
  //     applicationTargetDate: "2023-12-11",
  //     applicationType: "공결",
  //     applicationReason: "국민취업지원제도 대면 상담",
  //     applicationStatus: "거절",
  //   },
  //   {
  //     key: "3",
  //     applicationTargetDate: "2023-12-14",
  //     applicationType: "외출",
  //     applicationReason: "개인 사정으로 인한 외출",
  //     applicationStatus: "대기",
  //   },
  //   {
  //     key: "4",
  //     applicationTargetDate: "2023-12-20",
  //     applicationType: "휴가",
  //     applicationReason: "개인 사유로 인한 휴가",
  //     applicationStatus: "대기",
  //   },
  // ];

  return (
    <Flex vertical gap="large">
      <PageTitle title="출결 신청 결과" />
      <Table columns={columns} dataSource={data} />
    </Flex>
  );
}

export default PlayerResultPage;
