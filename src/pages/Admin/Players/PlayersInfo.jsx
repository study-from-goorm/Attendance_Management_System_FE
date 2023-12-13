import { Card, Button, Select } from "antd";
import { axiosPrivate } from "../../../api/axiosInstance";
import PageTitle from "../../../components/PageTitle";
import { useState, useEffect } from "react";
import {
  useLoaderData,
  useSearchParams,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses, fetchPlayersByCourse } from "../../../api/requestApi";
import LoadingIndicator from "../../../components/UI/LoadingIndicator";
import PlayersInfoTable from "./PlayersInfoTable";

function PlayersInfo() {
  const [selectedCourse, setSelectedCourse] = useState();
  const [searchedCourse, setSearchedCourse] = useState();
  const courses = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentCourse = searchParams.get("course");
  const queryString = currentCourse ? `?course=${currentCourse}` : "";
  useEffect(() => {
    const courseQueryParam = searchParams.get("course");
    if (courseQueryParam) {
      setSearchedCourse(parseInt(courseQueryParam));
      setSelectedCourse(parseInt(courseQueryParam));
    }
  }, [searchParams]);

  const {
    data: players,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["players", { course: searchedCourse }],
    queryFn: ({ signal, queryKey }) =>
      fetchPlayersByCourse({ signal, ...queryKey[1] }),
    enabled: searchedCourse !== undefined,
    select: (players) => {
      const updated = players.map((player) => {
        const { playerId, ...otherPros } = player;
        return { key: playerId, ...otherPros };
      });

      return updated;
    },
  });

  const handleSelectCourse = () => {
    setSearchedCourse(selectedCourse);
    if (selectedCourse) {
      setSearchParams({ course: selectedCourse });
    } else {
      setSearchParams({});
    }
  };

  const handleChange = (value) => {
    setSelectedCourse(value);
  };

  const handleNavigate = () => {
    navigate(`/admin/players/new${queryString}`);
  };

  const handleDeletePlayer = () => {
    console.log("handleDeletePlayer!!");
  };

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <p className="text-red-600 text-center font-semibold">{error.message}</p>
    );
  }

  if (players) {
    content = (
      <PlayersInfoTable
        players={players}
        queryString={queryString}
        handleDeletePlayer={handleDeletePlayer}
      />
    );
  }

  return (
    <>
      <Outlet />
      <PageTitle title="플레이어 정보" />
      <Card
        bodyStyle={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="space-x-2">
          <Select
            style={{ width: 240 }}
            options={courses}
            allowClear
            placeholder="과정을 선택해 주세요."
            defaultValue={searchedCourse ? searchedCourse : null}
            value={selectedCourse}
            onChange={handleChange}
          />
          <Button type="primary" onClick={handleSelectCourse}>
            검색
          </Button>
        </div>
        <div className="flex-1 text-right">
          <Button type="primary" onClick={handleNavigate}>
            플레이어 등록하기
          </Button>
        </div>
      </Card>
      <Card className={searchedCourse ? "" : "hidden"}>{content}</Card>
    </>
  );
}

export default PlayersInfo;

export async function loader() {
  const courseData = await fetchCourses();
  const courseOptions = courseData.map((course) => ({
    value: course.courseId,
    label: course.courseName,
  }));

  return courseOptions;
}
