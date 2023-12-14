import {
  Card,
  Col,
  Divider,
  Flex,
  Progress,
  Select,
  Space,
  Statistic,
  Typography,
} from "antd";
import PlayerCalendar from "../../components/Calendar/PlayerCalendar";
import store from "../../store";
import { useState } from "react";
import dayjs from "dayjs";
import { fetchPlayerData, queryClient } from "../../api/requestApi";
import PageTitle from "../../components/PageTitle";
import { CalendarTwoTone, DashboardTwoTone } from "@ant-design/icons";
import { getCookiePlayerId } from "../../auth/cookie";
import { waitForRehydration } from "../../utils";

const today = dayjs();

export const loader = async () => {
  await waitForRehydration();
  const playerId = store.getState().user.playerId;

  return queryClient.fetchQuery({
    queryKey: ["player", playerId],
    queryFn: () => fetchPlayerData(playerId, today.year(), today.month()),
  });
};

const PlayerMainPage = () => {
  const [unitPeriod, setUnitPeriod] = useState(1); // 단위기간
  const { playerName, statusCount, totalDays } = queryClient.getQueryData();

  const attendRate = parseInt((statusCount.present / totalDays) * 100);

  return (
    <div>
      {/* Player's Dashboard */}
      <Flex vertical gap="middle">
        <Space>
          <DashboardTwoTone style={{ fontSize: "30px" }} />
          <PageTitle title={`${playerName}(과정명_회차)의 대시보드`} />
        </Space>

        <Flex
          wrap="wrap"
          gap="middle"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="center"
        >
          <Col className="gutter-row" flex={3} justify="center" align="center">
            <Card
              bordered={false}
              style={{ paddingTop: "23px", paddingBottom: "23px" }}
            >
              <Flex vertical gap="large">
                <Typography.Text mark>
                  {today.format("YYYY년 MM월 DD일")} 기준,
                </Typography.Text>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  현재 단위기간은 {unitPeriod} 입니다.
                </Typography.Title>

                <Flex gap="small" align="center" justify="center">
                  <Typography.Text type="secondary">
                    다른 단위기간 조회하기 👉
                  </Typography.Text>
                  <Select
                    defaultValue={unitPeriod}
                    style={{ width: 120 }}
                    onChange={(e) => setUnitPeriod(e)}
                    options={[
                      {
                        value: 1,
                        label: "1 단위기간",
                      },
                      {
                        value: 2,
                        label: "2 단위기간",
                      },
                      {
                        value: 3,
                        label: "3 단위기간",
                      },
                      {
                        value: 4,
                        label: "4 단위기간",
                      },
                      {
                        value: 5,
                        label: "5 단위기간",
                      },
                      {
                        value: 6,
                        label: "6 단위기간",
                      },
                    ]}
                  />
                </Flex>
              </Flex>
            </Card>
          </Col>

          <Col className="gutter-row" flex={3} align="flex-start">
            <Card
              bordered={false}
              title={`🌱 ${unitPeriod} 단위기간 출석 현황`}
            >
              <Flex gap="middle" align="center" justify="space-evenly">
                <Progress
                  title="단위기간 출석률"
                  type="circle"
                  percent={attendRate}
                  success={{
                    percent: parseInt((statusCount.present / totalDays) * 100),
                  }}
                />
                <Statistic
                  title="출석"
                  value={statusCount.present}
                  valueStyle={{ color: "#3f8600" }}
                  suffix="일"
                />
                <Statistic
                  title="결석"
                  value={statusCount.absent}
                  valueStyle={{ color: "#cf1322" }}
                  suffix="일"
                />
                <Statistic
                  title="외출/조퇴"
                  value={statusCount.partiallyPresent}
                  valueStyle={{ color: "#faac14" }}
                  suffix="일"
                />
                <Statistic
                  title="공결"
                  value={statusCount.officiallyExcused}
                  valueStyle={{ color: "#0968da" }}
                  suffix="일"
                />
                <Statistic
                  title="휴가"
                  value={statusCount.onVacation}
                  valueStyle={{ color: "#0968da" }}
                  suffix="일"
                />
              </Flex>
            </Card>
          </Col>
        </Flex>
      </Flex>

      <Divider></Divider>
      {/* Calendar */}
      <Flex vertical gap="middle">
        <Space>
          <CalendarTwoTone style={{ fontSize: "30px" }} />
          <PageTitle title={"월별 출석 현황"} />
        </Space>

        <Card>
          <PlayerCalendar />
        </Card>
      </Flex>
    </div>
  );
};

export default PlayerMainPage;
