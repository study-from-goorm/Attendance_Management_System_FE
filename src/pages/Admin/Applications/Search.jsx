import { Card } from "antd";

function ApplicationsSearch() {
  return (
    <Card
      bodyStyle={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>검색</div>
      <div className="flex-1 text-right"></div>
    </Card>
  );
}

export default ApplicationsSearch;
