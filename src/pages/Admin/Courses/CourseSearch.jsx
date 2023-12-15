import { Card, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
function CourseSearch() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/admin/courses/new");
  };

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
        placeholder="과정명을 검색해 주세요."
        onSearch={onSearch}
        enterButton
      />
      <div className="flex-1 text-right">
        <Button type="primary" onClick={handleNavigate}>
          과정 등록하기
        </Button>
      </div>
    </Card>
  );
}

export default CourseSearch;
