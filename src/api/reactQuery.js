import { QueryClient } from '@tanstack/react-query';
import { axiosPrivate } from './axiosInstance';

export const queryClient = new QueryClient();

// Player
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

export async function fetchPlayer({ signal, id }) {
  try {
    const response = await axiosPrivate.get(`/player/info/${id}`, {
      signal: signal,
    });
    return response.data;
  } catch (err) {
    console.error('플레이어 조회에 실패하였습니다.', err);
    throw err;
  }
}

export async function createNewPlayer(playerData) {
  try {
    const response = await axiosPrivate.post('/admin/players', playerData);
    return response.data;
  } catch (err) {
    console.error('플레이어 생성에 실패하였습니다.', err);
    throw err;
  }
}

export async function updatePlayer({ id, playerData }) {
  try {
    const response = await axiosPrivate.patch(
      `/admin/player/${id}`,
      playerData,
    );
    return response.data;
  } catch (err) {
    console.error('플레이어 수정에 실패하였습니다.', err);
    throw err;
  }
}

export async function deletePlayer({ id }) {
  try {
    const response = await axiosPrivate.delete(`/admin/player/${id}`);
    return response.data;
  } catch (err) {
    console.error('플레이어 삭제에 실패하였습니다.', err);
    throw err;
  }
}

// Course
export async function fetchCourses() {
  try {
    const response = await axiosPrivate.get('/admin/courses');
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to fetch courses');
  }
}

export async function fetchCourse({ signal, id }) {
  try {
    const response = await axiosPrivate.get(`/admin/course/${id}`, {
      signal: signal,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to fetch course');
  }
}

export async function createNewCourse(courseData) {
  try {
    const response = await axiosPrivate.post('/admin/courses', courseData);
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to create courses');
  }
}

export async function updateCourse({ id, courseData }) {
  try {
    const response = await axiosPrivate.patch(
      `/admin/course/${id}`,
      courseData,
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to update course');
  }
}

export async function deleteCourse({ id }) {
  try {
    const response = await axiosPrivate.delete(`/admin/course/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message || 'Failed to delete course');
  }
}
