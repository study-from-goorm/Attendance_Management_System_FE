import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookieToken = (refreshToken) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("refreshToken", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  return cookies.get("refreshToken");
};

export const removeCookieToken = () => {
  return cookies.remove("refreshToken", { sameSite: "strict", path: "/" });
};

// Player Data Fetch시 사용하기 위한 playerId 쿠키

export const setCookiePlayerId = (playerId) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set("playerId", playerId, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const getCookiePlayerId = () => {
  return cookies.get("playerId");
};

export const removeCookiePlayerId = () => {
  return cookies.remove("playerId", { sameSite: "strict", path: "/" });
};
