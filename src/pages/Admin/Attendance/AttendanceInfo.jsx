import AttendanceManagement from "../../../components/AdminAttendanceManage/AttendanceManagement.jsx";
import PageTitle from "../../../components/PageTitle.jsx";
import React from "react";

function AttendanceInfo() {
  return(
    <>
        <PageTitle title="출결 관리" />
        <AttendanceManagement />
    </>
  )
}

export default AttendanceInfo;
