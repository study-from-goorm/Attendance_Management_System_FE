import { useNavigate, useLoaderData, useSearchParams } from 'react-router-dom';
import PlayerForm from './PlayerForm';
import { Modal } from 'antd';
import PageTitle from '../../../components/PageTitle';
import { useMutation } from '@tanstack/react-query';
import { createNewPlayer, queryClient } from '../../../api/reactQuery';

function NewPlayer() {
  const navigate = useNavigate();
  const courses = useLoaderData();
  const [searchParams] = useSearchParams();
  const searchedCourse = searchParams.get('course');
  const queryString = searchedCourse ? `?course=${searchedCourse}` : '';

  const { mutate } = useMutation({
    mutationFn: createNewPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      navigate(`/admin/players${queryString}`);
    },
  });

  const handleCancel = () => {
    navigate(`/admin/players${queryString}`);
  };

  const handleSubmit = (formData) => {
    console.log('newPlayer handlesubmit', formData);
    mutate(formData);
  };
  return (
    <Modal open={true} onCancel={handleCancel} footer={null}>
      <PageTitle title="플레이어 등록" />
      <PlayerForm
        courses={courses}
        onSubmit={handleSubmit}
        searchedCourse={searchedCourse}
      />
    </Modal>
  );
}

export default NewPlayer;
