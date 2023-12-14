import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function CourseSearch() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/admin/courses/new');
  };

  return (
    <Card
      bodyStyle={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div>검색</div>
      <div className="flex-1 text-right">
        <Button type="primary" onClick={handleNavigate}>
          과정 등록하기
        </Button>
      </div>
    </Card>
  );
}

export default CourseSearch;
