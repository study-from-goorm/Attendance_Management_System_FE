import { QueryClient } from "@tanstack/react-query";
import { axiosPrivate, axiosPublic } from "./axiosInstance";

export const queryClient = new QueryClient();

//login

export async function login(mode, loginData) {
  try {
    const response = await axiosPublic.post(`/login/${mode}`, loginData);
    return response.data;
  } catch (err) {
    return err;
  }
}

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
        message: "플레이어 정보를 가져오는 데 실패했습니다.",
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
    console.error("플레이어 조회에 실패하였습니다.", err);
    throw err;
  }
}

// Player Personal Info
export async function fetchPlayerData(playerId, year, month) {
  try {
    const response = await axiosPrivate.get(
      `/player/${playerId}/${year}/${month}`
    );
    return response.data;
  } catch (err) {
    console.error("플레이어 정보를 불러올 수 없습니다", err);
    throw err;
  }
}

export async function createNewPlayer(playerData) {
  try {
    const response = await axiosPrivate.post("/admin/players", playerData);
    return response.data;
  } catch (err) {
    console.error("플레이어 생성에 실패하였습니다.", err);
    throw err;
  }
}

export async function updatePlayer({ id, playerData }) {
  try {
    const response = await axiosPrivate.patch(
      `/admin/player/${id}`,
      playerData
    );
    return response.data;
  } catch (err) {
    console.error("플레이어 수정에 실패하였습니다.", err);
    throw err;
  }
}

export async function deletePlayer({ id }) {
  try {
    const response = await axiosPrivate.delete(`/admin/player/${id}`);
    return response.data;
  } catch (err) {
    console.error("플레이어 삭제에 실패하였습니다.", err);
    throw err;
  }
}

// Course
export async function fetchCourses() {
  try {
    const response = await axiosPrivate.get("/admin/courses");
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch courses");
  }
}

export async function fetchCourse({ signal, id }) {
  try {
    const response = await axiosPrivate.get(`/admin/course/${id}`, {
      signal: signal,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch course");
  }
}

export async function createNewCourse(courseData) {
  try {
    const response = await axiosPrivate.post("/admin/courses", courseData);
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to create courses");
  }
}

export async function updateCourse({ id, courseData }) {
  try {
    const response = await axiosPrivate.patch(
      `/admin/course/${id}`,
      courseData
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to update course");
  }
}

export async function deleteCourse({ id }) {
  try {
    const response = await axiosPrivate.delete(`/admin/course/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to delete course");
  }
}

// Admin > Applications
export async function fetchApplications() {
  try {
    const response = await axiosPrivate.get("/admin/applications");
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch applications");
  }
}

export async function fetchApplication({ signal, id }) {
  try {
    const response = await axiosPrivate.get(`/admin/applications/${id}`, {
      signal,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message || "Failed to fetch application");
  }
}

export async function updateApplication({ id, applicationData }) {
  try {
    const response = await axiosPrivate.patch(
      `/admin/applications/${id}`,
      applicationData
    );
    return response.data;
  } catch (err) {
    throw new Error(err.message || "플레이어 정보를 불러올 수 없습니다");
  }
}

// [POST] New Player Application
export async function newPlayerApplication({ playerId, data }) {
  try {
    const response = await axiosPrivate.post(
      `/player/applications/${playerId}`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("err", err);
    throw new Error(
      err.message || "신청 중 문제가 발생했습니다. 다시 시도해주세요."
    );
  }
}

// [GET] Player Application Result
export async function fetchApplicationResult(playerId) {
  try {
    const response = await axiosPrivate.get(`/player/${playerId}/applications`);
    return response.data;
  } catch (err) {
    console.log("err,", err);
    throw new Error(
      err.response.headers.validation || "신청 결과를 불러오는 데 실패했습니다."
    );
  }
}

export async function fetchAttendanceData({ course, date }) {
  try {
    const response = await axiosPrivate.get(
      `/admin/attendances/${course}/${date}`
    );
    return response.data;
  } catch (err) {
    console.error("출석정보를 불러오지 못하였습니다", err);
    throw err;
  }
}
