import { Link, json, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setCookieToken } from '../auth/cookie';
import { setToken } from '../store/authSlice';

function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let isPlayer = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData(e.target);
    const authData = Object.fromEntries(fd.entries());
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authData),
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }

    const resData = await response.json();
    if (response.status === 200 && resData) {
      setCookieToken(resData.refreshToken);
      dispatch(setToken(resData.accessToken));

      return navigate('/player');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 w-full max-w-md p-6 text-black rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">로그인</h2>
        <div className="flex justify-center mb-6">
          {/* toggle effect */}
          <Link
            to={`?mode=player`}
            className={`px-4 py-2 ${
              isPlayer ? 'bg-gray-800 text-white' : 'bg-gray-200'
            }`}
          >
            Player
          </Link>
          <Link
            to={`?mode=admin`}
            className={`px-4 py-2 ${
              isPlayer ? 'bg-gray-200' : 'bg-gray-800 text-white'
            }`}
          >
            Admin
          </Link>
        </div>
        <form onSubmit={handleSubmit} method="post" className="space-y-4">
          <div>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
              name="email"
              type="text"
            />
          </div>
          <div>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              name="password"
            />
          </div>
          <div className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
