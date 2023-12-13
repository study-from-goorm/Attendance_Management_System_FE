import { Outlet, useLoaderData } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import Search from './CourseSearch';
import Table from './CoursesTable';
import { fetchCourses } from '../../../api/reactQuery';

function Courses() {
  const courses = useLoaderData();
  return (
    <>
      <Outlet />
      <PageTitle title="과정 정보" />
      <Search />
      <Table />
    </>
  );
}

export default Courses;

export async function loader() {
  const courseData = await fetchCourses();

  return courseData;
}
