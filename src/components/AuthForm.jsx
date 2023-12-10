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
      <div className="bg-secondary-color w-full max-w-md p-6 text-white rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-4">출석관리 시스템</h2>
        <div className="flex justify-center mb-6 gap-x-2">
          {/* toggle effect */}
          <Link
            to={`?mode=player`}
            className={`px-4 py-2 rounded-lg ${
              isPlayer ? 'bg-primary-color' : 'bg-neutral-color opacity-80'
            }`}
          >
            플레이어
          </Link>
          <Link
            to={`?mode=admin`}
            className={`px-4 py-2 rounded-lg ${
              isPlayer ? 'bg-neutral-color opacity-80' : 'bg-primary-color'
            }`}
          >
            관리자
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
            <button className="bg-primary-color py-2 px-4 rounded-lg opacity-80 hover:opacity-100">
              로그인
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AuthForm;
