import AuthForm from '../../components/AuthForm';
import { json, redirect } from 'react-router-dom';
import { axiosPublic } from '../../api/axiosInstance';
import store from '../../store';
import { setUser } from '../../store/userSlice';
import { setToken } from '../../store/authSlice';
import { setCookieToken } from '../../auth/cookie';

function LoginPage() {
  return <AuthForm />;
}

export default LoginPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'player';

  if (mode !== 'player' && mode !== 'admin') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    const response = await axiosPublic.post('/login', JSON.stringify(authData));

    const token = response?.data?.token;
    const role = 'admin'; // TODO: get from data

    store.dispatch(setUser({ role, username: authData.email }));
    store.dispatch(setToken(token));

    setCookieToken(token);

    return redirect(`/${mode}`);
  } catch (err) {
    if (err.code === 'ERR_NETWORK') {
      return '네트워크 오류가 발생하였습니다.';
    } else if (err.code === 'ERR_BAD_REQUEST') {
      return '정확한 아이디 혹은 비밀번호를 입력하세요.';
    } else {
      return err.message;
    }
  }
}
