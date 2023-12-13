import { FrownTwoTone, MehTwoTone, SmileTwoTone } from "@ant-design/icons";
import { Space, Typography } from "antd";
import dayjs from "dayjs";
import { queryClient } from "../../api/requestApi";

export const CellRender = (value) => {
  const getAttendanceData = (value) => {
    const { attendanceDetails } = queryClient.getQueryData();

    let calendarData;

    for (let i in attendanceDetails) {
      let eachDate = attendanceDetails[i].attendanceDate;

      if (eachDate === value.format("YYYY-MM-DD")) {
        calendarData = [
          {
            attendanceStatus: attendanceDetails[i].attendanceStatus,
          },
        ];
      }
    }

    return calendarData || [];
  };

  const StatusRender = ({ attendanceStatus }) => {
    switch (attendanceStatus) {
      case "present":
        return (
          <Space>
            <SmileTwoTone twoToneColor="#65bf21" />
            <Typography.Text>출석</Typography.Text>
          </Space>
        );
      case "onVacation":
        return (
          <Space>
            <SmileTwoTone twoToneColor="#0968da" />
            <Typography.Text>휴가</Typography.Text>
          </Space>
        );
      case "absent":
        return (
          <Space>
            <FrownTwoTone twoToneColor="#cf1321" />
            <Typography.Text>결석</Typography.Text>
          </Space>
        );
      case "officiallyExcused":
        return (
          <Space>
            <SmileTwoTone twoToneColor="#0968da" />
            <Typography.Text>공결</Typography.Text>
          </Space>
        );
      case "partiallyPresent":
        return (
          <Space>
            <MehTwoTone twoToneColor="#faac14" />
            <Typography.Text>조퇴/외출</Typography.Text>
          </Space>
        );
      case "notEntered":
        return;
    }
  };

  const listData = getAttendanceData(value);
  return (
    <ul className="attendance-status">
      {listData.map((item) => (
        <li key={dayjs(item.attendanceDate)}>
          <StatusRender attendanceStatus={item.attendanceStatus} />
        </li>
      ))}
    </ul>
  );
};
