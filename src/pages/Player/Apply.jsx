import { Card, Col, Flex } from "antd";
import PageTitle from "../../components/PageTitle";
import PlayerApplyForm from "../../components/PlayerApplyForm";
import PlayerApplyNotice from "../../components/PlayerApplyNotice";

function PlayerApplyPage() {
  return (
    <div>
      <Flex vertical gap="large">
        <PageTitle title="출석 통합 신청" />
        <Flex gap="middle" wrap="wrap">
          <Col flex="1 1 400px">
            <Card title="❗️ 신청 유의 사항">
              <PlayerApplyNotice />
            </Card>
          </Col>
          <Col flex="1 1 auto">
            <Card title="👉 출결 신청하기">
              <PlayerApplyForm />
            </Card>
          </Col>
        </Flex>
      </Flex>
    </div>
  );
}

export default PlayerApplyPage;

export const action = async ({ params, request }) => {
  let formData = await request.formData();
  console.log(formData);
};
