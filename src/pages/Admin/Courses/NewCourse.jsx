import { useNavigate, useLoaderData } from 'react-router-dom';
import { Modal } from 'antd';
import PageTitle from '../../../components/PageTitle';
import { useMutation } from '@tanstack/react-query';
import CourseForm from './CourseForm';
import { createNewCourse, queryClient } from '../../../api/reactQuery';

function NewPlayer() {
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: createNewCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      navigate('/admin/courses');
    },
  });

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  const handleSubmit = (formData) => {
    console.log('formData', formData);
    mutate(formData);
  };
  return (
    <Modal open={true} onCancel={handleCancel} footer={null}>
      <PageTitle title="과정 등록" />
      <CourseForm onSubmit={handleSubmit} />
    </Modal>
  );
}

export default NewPlayer;
