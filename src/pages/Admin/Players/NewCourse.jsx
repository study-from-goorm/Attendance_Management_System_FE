import Modal from '../../../components/UI/Modal';
import { Link, useNavigate } from 'react-router-dom';

function NewCourse() {
  const navigate = useNavigate();
  return <Modal onClose={() => navigate('../')}></Modal>;
}

export default NewCourse;
