import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCookieToken } from './cookie';
import { deleteToken, setToken } from '../store/authSlice';
export function CheckToken() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState('Loaded');
  const { authenticated, expireTime } = useSelector((state) => state.auth);
  const refreshToken = getCookieToken();

  useEffect(() => {
    const checkAuthToken = async () => {
      if (refreshToken === undefined) {
        dispatch(deleteToken());
        setIsAuth('Failed');
      } else {
        // refresh token 가지고 새로 요청해줘야함
        // if not -> DELETE_TOKEN, setIsAuth('Failed'), removeCookie Token
        const token = 'updated_hard_coding_access_token';
        dispatch(setToken(token));
        setIsAuth('Success');
      }
    };
    checkAuthToken();
  }, [dispatch, refreshToken, authenticated, expireTime]);

  return {
    isAuth,
  };
}
