import { QueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "./axiosInstance";

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
      `/admin/players/${id}`,
      playerData
    );
    return response.data;
  } catch (err) {
    console.error("플레이어 수정에 실패하였습니다.", err);
    throw err;
  }
}

// Course
export async function fetchCourses() {
  try {
    const response = await axiosPrivate.get("/admin/courses");
    return response.data;
  } catch (err) {
    console.error("과정정보를 불러오지 못하였습니다", err);
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
