import { Button, Calendar, Col, Flex, Row, Typography } from "antd";
import locale from "antd/es/calendar/locale/ko_KR";
import { CellRender } from "./CellData";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const PlayerCalendar = () => {
  const validRange = [dayjs("2023-11-13"), dayjs("2023-12-12")];
  return (
    <div>
      <Calendar
        mode="month"
        locale={locale}
        validRange={validRange}
        cellRender={CellRender}
        headerRender={({ value, onChange }) => {
          const month = value.month();

          return (
            <Flex style={{ padding: 8 }} justify="center" align="center">
              <Row gutter={8}>
                <Col>
                  <Button
                    type="text"
                    name="previous-month"
                    onClick={() => {
                      const newValue = value.clone().month(month - 1);
                      onChange(newValue);
                    }}
                  >
                    <CaretLeftOutlined />
                  </Button>
                </Col>
                <Col>
                  <Typography.Title
                    level={4}
                    style={{ margin: 0, paddingTop: "5px" }}
                  >
                    {value.month() + 1}월
                  </Typography.Title>
                </Col>

                <Col>
                  <Button
                    type="text"
                    name="next-month"
                    onClick={() => {
                      const newValue = value.clone().month(month + 1);
                      onChange(newValue);
                    }}
                  >
                    <CaretRightOutlined />
                  </Button>
                </Col>
              </Row>
            </Flex>
          );
        }}
      />
    </div>
  );
};

export default PlayerCalendar;
