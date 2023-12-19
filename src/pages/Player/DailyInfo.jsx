import { Modal, Table, Typography } from "antd";
// import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import store from "../../store";
import { fetchPlayerDailyData, queryClient } from "../../api/requestApi";

export const loader = ({ request }) => {
  const playerId = store.getState().user.playerId;
  const year = new URL(request.url).searchParams.get("year");
  const month = new URL(request.url).searchParams.get("month");
  const day = new URL(request.url).searchParams.get("day");

  return queryClient.fetchQuery({
    queryKey: ["player_dailyData"],
    queryFn: () => fetchPlayerDailyData(playerId, year, month, day),
  });
};

const DailyInfo = () => {
  const navigate = useNavigate();
  const queryData = queryClient.getQueryData(["player_dailyData"]);

  // Table Columns (교시)
  const columns = [
    {
      title: "1교시",
      dataIndex: "sessionOne",
      key: "sessionOne",
    },
    {
      title: "2교시",
      dataIndex: "sessionTwo",
      key: "sessionTwo",
    },
    {
      title: "3교시",
      dataIndex: "sessionThree",
      key: "sessionThree",
    },
    {
      title: "4교시",
      dataIndex: "sessionFour",
      key: "sessionFour",
    },
    {
      title: "5교시",
      dataIndex: "sessionFive",
      key: "sessionFive",
    },
    {
      title: "6교시",
      dataIndex: "sessionSix",
      key: "sessionSix",
    },
    {
      title: "7교시",
      dataIndex: "sessionSeven",
      key: "sessionSeven",
    },
    {
      title: "8교시",
      dataIndex: "sessionEight",
      key: "sessionEight",
    },
  ];
  // { 0: 미입력, 1: 출석, 2: 외출 , 3: 조퇴 , 4: 지각 , 5: 공결/휴가 , 6: 결석}
  const mapFn = (val) => {
    switch (val) {
      case 0:
        return "미입력";
      case 1:
        return "출석";
      case 2:
        return "외출";
      case 3:
        return "조퇴";
      case 4:
        return "지각";
      case 5:
        return "공결/휴가";
      case 6:
        return "결석";
    }
  };
  // Function : Object 데이터 Mapping
  const mapData = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      newObj[key] = mapFn(obj[key]);
    });
    return newObj;
  };

  // renderingData = Table에 표시할 데이터
  // 데이터가 존재하는 경우에만 Mapping
  let renderingData = [];
  if (queryData.sessionList[0]) {
    const data = mapData(queryData.sessionList[0]);
    renderingData = [{ key: "1", ...data }];
  }

  // Modal창 닫을 때
  const handleCancel = () => {
    navigate(`/player/main`);
  };

  return (
    <Modal
      title="교시별 출석 현황"
      open={true}
      onCancel={handleCancel}
      footer={null}
      closable={true}
      centered={true}
      width={750}
    >
      {/* 선택한 날짜의 데이터가 없는 경우 */}
      {!queryData.sessionList[0] && (
        <Typography.Text>해당 일자의 데이터가 없습니다.</Typography.Text>
      )}
      {queryData.sessionList[0] && (
        <Table
          columns={columns}
          dataSource={renderingData}
          pagination={false}
        />
      )}
    </Modal>
  );
};

export default DailyInfo;
