import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <h1>Unauthorized</h1>
      <br />
      <p>해당 페이지에 대한 접근 권한이 없습니다.</p>
      <button onClick={goBack}>Go back</button>
    </div>
  );
};

export default Unauthorized;
