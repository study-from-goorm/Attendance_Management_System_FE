import { Modal } from 'antd';
import {
  fetchCourse,
  queryClient,
  updateCourse,
} from '../../../api/reactQuery';
import {
  useLoaderData,
  useNavigate,
  useSubmit,
  redirect,
} from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import CourseForm from './CourseForm';

function EditCourse() {
  const navigate = useNavigate();
  const course = useLoaderData();
  const submit = useSubmit();

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  const handleSubmit = (formData) => {
    submit(formData, { method: 'PATCH' });
  };
  return (
    <Modal open={true} onCancel={handleCancel} footer={null}>
      <PageTitle title="과정 수정" />
      <CourseForm onSubmit={handleSubmit} inputData={course} />
    </Modal>
  );
}

export default EditCourse;

export async function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['courses', { courseId: params.id }],
    queryFn: ({ signal }) => fetchCourse({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData);

  await updateCourse({ id: params.id, courseData: updatedData });
  await queryClient.invalidateQueries(['courses']);
  return redirect('/admin/courses');
}
