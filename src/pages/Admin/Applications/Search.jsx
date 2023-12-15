import { Card, Input } from "antd";
const { Search } = Input;

function ApplicationsSearch() {
  const onSearch = () => {
    console.log("검색되었습니다.");
  };

  return (
    <Card
      bodyStyle={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Search
        className="w-72"
        placeholder="신청인을 검색해 주세요."
        onSearch={onSearch}
        enterButton
      />
      <div className="flex-1 text-right"></div>
    </Card>
  );
}

export default ApplicationsSearch;
