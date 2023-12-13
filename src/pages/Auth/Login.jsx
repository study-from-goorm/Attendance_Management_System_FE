import AuthForm from "../../components/AuthForm";
import { json, redirect } from "react-router-dom";
// import { loginByRole } from "../../auth/loginByRole";
import { axiosPublic } from "../../api/axiosInstance";
import store from "../../store";
import { setUser } from "../../store/userSlice";
import { setToken } from "../../store/authSlice";
import { setCookiePlayerId, setCookieToken } from "../../auth/cookie";

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
    username: data.get("email"),
    password: data.get("password"),
  };

  try {
    const response = await axiosPublic.post(
      `/login/${mode}`,
      JSON.stringify(authData)
    );

    const token = response?.data?.accessToken;
    const role = mode; // TODO: get from data

    if (mode === "player") {
      const playerId = 1;
      setCookiePlayerId(playerId);

      store.dispatch(setUser({ role, username: authData.email }));
      store.dispatch(setToken(token));

      setCookieToken(token);

      return redirect(`/player`);
    } else {
      store.dispatch(setUser({ role, username: authData.email }));
      store.dispatch(setToken(token));

      setCookieToken(token);

      return redirect(`/admin`);
    }
  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      return "네트워크 오류가 발생하였습니다.";
    } else if (err.code === "ERR_BAD_REQUEST") {
      return "정확한 아이디 혹은 비밀번호를 입력하세요.";
    } else {
      return err.message;
    }
  }
}
