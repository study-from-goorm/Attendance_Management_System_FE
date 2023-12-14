import { Alert, Card, Col, Flex } from "antd";
import PageTitle from "../../components/PageTitle";
import PlayerApplyForm from "../../components/PlayerApplyForm";
import PlayerApplyNotice from "../../components/PlayerApplyNotice";
import { useMutation } from "@tanstack/react-query";
import { newPlayerApplication } from "../../api/requestApi";
import { useSelector } from "react-redux";
import { useState } from "react";

function PlayerApplyPage() {
  const playerId = useSelector((state) => state.user.playerId);
  const [applied, setApplied] = useState(false);

  const { mutate } = useMutation({
    mutationFn: newPlayerApplication,
    onSuccess: () => {
      setApplied(true);
      setTimeout(() => {
        setApplied(false);
      }, 3000);
    },
  });

  const handleSubmit = (data) => {
    mutate(playerId, data);
  };

  return (
    <div>
      {applied && (
        <Alert
          type="success"
          message="출결 신청이 정상적으로 접수되었습니다."
          banner
        />
      )}
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
              <PlayerApplyForm onSubmit={handleSubmit} />
            </Card>
          </Col>
        </Flex>
      </Flex>
    </div>
  );
}

export default PlayerApplyPage;
