import { redirect } from "react-router-dom";
import { removeCookiePlayerId, removeCookieToken } from "../../auth/cookie";
import store from "../../store";
import { deleteToken } from "../../store/authSlice";
import { removeUser } from "../../store/userSlice";
import { removePersonalData } from "../../store/personalDataSlice";

export function action() {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expiration');
  // logout시에도 백엔드랑 응답해야하나?
  // 토큰 만료시간
  store.dispatch(removeUser());
  store.dispatch(deleteToken());
  store.dispatch(removePersonalData());
  removeCookieToken();
  removeCookiePlayerId();
  return redirect("/login");
}
