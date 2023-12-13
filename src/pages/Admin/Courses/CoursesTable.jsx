import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCourse, fetchCourses } from '../../../api/reactQuery';
import { Card, Table, Space, Button } from 'antd';
import LoadingIndicator from '../../../components/UI/LoadingIndicator';
import { Link } from 'react-router-dom';
import { queryClient } from '../../../api/reactQuery';

function CoursesTable() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    select: (courses) => {
      return courses.map((course) => ({
        ...course,
        key: course.courseId,
      }));
    },
  });

  const { mutate } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const handleDeleteCourse = (courseId, courseName) => {
    if (confirm(`${courseName}를 제거하시겠습니까?`)) {
      mutate({ id: courseId });
    }
    return false;
  };

  const columns = [
    {
      title: '과정',
      dataIndex: 'courseName',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.courseName.localeCompare(b.courseName),

      sortDirections: ['descend', 'ascend'],
    },
    {
      render: (record) => (
        <Space size="middle">
          <Link
            to={`/admin/courses/${record.key}/edit`}
            className="text-xs hover:text-primary-color"
          >
            수정하기
          </Link>
          <Button
            type="text"
            onClick={() => handleDeleteCourse(record.key, record.courseName)}
            className="text-xs"
          >
            삭제하기
          </Button>
        </Space>
      ),
    },
  ];

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (courses) {
    content = <Table columns={columns} dataSource={courses} />;
  }

  return <Card>{content}</Card>;
}

export default CoursesTable;
