import { Card, Button, Select } from 'antd';
import { axiosPrivate } from '../../../api/axiosInstance';
import PageTitle from '../../../components/PageTitle';
import { useState, Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayersByCourse } from '../../../api/reactQuery';
import LoadingIndicator from '../../../components/UI/LoadingIndicator';

function PlayersInfo() {
  const [selectedCourse, setSelectedCourse] = useState();
  const [searchedCourse, setSearchedCourse] = useState();
  const { courses } = useLoaderData();

  const {
    data: players,
    isLoading,
    isFetching,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['players', { course: searchedCourse }],
    queryFn: ({ signal, queryKey }) =>
      fetchPlayersByCourse({ signal, ...queryKey[1] }),
    enabled: searchedCourse !== undefined,
  });

  const handleSelectCourse = async () => {
    setSearchedCourse(selectedCourse);
  };

  const handleChange = (value) => {
    setSelectedCourse(value);
  };

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <p className="text-red-600 text-center font-semibold">{error.message}</p>
    );
  }

  if (players) {
    content = <p>데이터 들어왔음1</p>;
  }

  console.log('isPending', isPending);
  console.log('isLoading', isLoading);
  console.log('isFetching', isFetching);

  return (
    <>
      <PageTitle title="플레이어 정보" />
      <Card className="flex">
        <Suspense
          fallback={
            <Select
              placeholder="로딩중 입니다...🙂"
              style={{ width: 240 }}
              disabled
            ></Select>
          }
        >
          <Await
            resolve={courses}
            errorElement={
              <p className="inline-block text-secondary-color">
                과정정보를 불러오지 못하였습니다.😭
              </p>
            }
          >
            {(loadedCourses) => {
              return (
                <Select
                  style={{ width: 240 }}
                  options={loadedCourses}
                  allowClear
                  placeholder="과정을 선택해 주세요."
                  onChange={handleChange}
                />
              );
            }}
          </Await>
        </Suspense>
        <Button type="primary" className="ml-4" onClick={handleSelectCourse}>
          검색
        </Button>
      </Card>
      <Card className={searchedCourse ? '' : 'hidden'}>{content}</Card>
    </>
  );
}

export default PlayersInfo;

async function loadCourses() {
  try {
    const response = await axiosPrivate.get('/admin/courses');
    const courseOptions = response.data.map((course) => ({
      value: course.courseId.toString(),
      label: course.courseName,
    }));

    return courseOptions;
  } catch (err) {
    console.error('과정정보를 불러오지 못하였습니다.');
  }
}

export async function loader() {
  return defer({
    courses: loadCourses(),
  });
}
