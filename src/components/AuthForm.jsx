import { Link, useSearchParams, Form, useActionData } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const errorMsg = useActionData();
  console.log('errorMsg', errorMsg);

  let isPlayer = true;
  if (searchParams.get('mode') === 'admin') {
    isPlayer = false;
  }

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
        <Form method="post" className="space-y-4">
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
          {errorMsg && (
            <h4 className=" text-red-400 text-center">{errorMsg}</h4>
          )}
          <div className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;
