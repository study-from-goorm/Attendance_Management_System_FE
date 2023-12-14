import { Collapse } from "antd";

// 신청 유의 사항 안내 Card 내용
const items = [
  {
    key: "1",
    label: "1️⃣ 조퇴/외출 신청",
    children: (
      <p>
        • 출석 인정 사항에 미해당하는 일반 조퇴/외출 시 사전에 통합신청센터에서
        신청합니다. (사전에 미신청 시 결석 처리)
        <br />
        • 조퇴 및 외출은 1일 1회만 가능합니다.
        <br />
        • 조퇴/외출 신청 후에는 아래와 같이 해주시면 됩니다.
        <br />
        <br />
        (1) 외출 : HRD-Net 앱으로 외출 출발/도착 시 QR 체크를 총 2회 실시합니다.
        <br />
        (2) 조퇴 : 실제 퇴장하는 시간에 맞춰 QR 체크아웃을 진행합니다.
        <br />
        <br />
        ⭐️ 조퇴/외출은 따로 신청 결과를 알려드리지 않고 순차적으로 반영됩니다.
        걱정하지 마세요~!
        <br />
        <br />
        ⚠️ 신청 시 주의사항
        <br />
        • 하루에 지각, 외출, 조퇴가 4시간 이상(점심시간 제외)일 경우 , 해당 일은
        결석 처리됩니다. (단, 출석인정 증빙서류 제출 시 출석인정 처리 됩니다.)
        <br />• 총 교육기간 중 지각, 외출, 조퇴가 3회 누적될 경우 1일 결석
        처리됩니다.
      </p>
    ),
  },
  {
    key: "2",
    label: "2️⃣ 출석 인정 신청 (공결, 휴가)",
    children: <p>`아아`</p>,
  },
  {
    key: "3",
    label: "3️⃣ 출석 정정 신청",
    children: <p>`아아`</p>,
  },
  {
    key: "4",
    label: "4️⃣ 각종 확인서/출석부 발급 신청",
    children: <p>`아아`</p>,
  },
];

const PlayerApplyNotice = () => {
  return <Collapse accordion items={items} defaultActiveKey="1" />;
};

export default PlayerApplyNotice;
