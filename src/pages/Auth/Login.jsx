import AuthForm from "../../components/AuthForm";
import { json, redirect } from "react-router-dom";
import store from "../../store";
import { setUser } from "../../store/userSlice";
import { setToken } from "../../store/authSlice";
import { setCookieToken } from "../../auth/cookie";
import { login } from "../../api/requestApi";

function LoginPage() {
  return <AuthForm />;
}

export default LoginPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "player";

  if (mode !== "player" && mode !== "admin") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const responseData = await login(mode, authData);
  if (responseData instanceof Error) {
    if (responseData.code === "ERR_NETWORK") {
      return "네트워크 오류가 발생하였습니다.";
    } else if (responseData.code === "ERR_BAD_REQUEST") {
      return "정확한 아이디 혹은 비밀번호를 입력하세요.";
    } else {
      return responseData.message;
    }
  } else {
    const accessToken = responseData.accessToken;
    const role = responseData.role;
    store.dispatch(setUser({ role, username: authData.username }));
    store.dispatch(setToken(accessToken));

    setCookieToken(accessToken);
    return redirect(`/${mode}`);
  }
}
