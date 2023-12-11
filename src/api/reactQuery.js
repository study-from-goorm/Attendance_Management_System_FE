import { QueryClient } from '@tanstack/react-query';
import { axiosPrivate } from './axiosInstance';

export const queryClient = new QueryClient();

export async function fetchPlayersByCourse({ signal, course }) {
  try {
    const response = await axiosPrivate.get(`/admin/${course}/players`, {
      signal: signal,
    });

    return response.data;
  } catch (err) {
    throw (
      err.response?.data || {
        message: '플레이어 정보를 가져오는 데 실패했습니다.',
      }
    );
  }
}
