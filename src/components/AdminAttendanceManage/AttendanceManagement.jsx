import React, {useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SelectAttendance from './SelectAttendanceBox.jsx';
import DateSessionSelector from "./DateSessionSelector.jsx";
import {
    getCurrentDate,
    getCurrentSession,
    selectStudentsBySession,
    getData,
    updateAttendance,
    updateDate,
    updateSession,
    updateAllAttendance, submitAttendanceChanges, getChangedData,
} from "../../store/AttendanceSlice.js";


const AttendanceTable = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(getCurrentDate);
    console.log("=>(AttendanceManagement.jsx:20) currentDate", currentDate);
    const currentSession = useSelector(getCurrentSession);
    const dates = useSelector(getData);
    const attendanceData = useSelector(selectStudentsBySession);
    const changedData = useSelector(getChangedData);
    console.log("=>(AttendanceManagement.jsx:12) changedData", changedData);

    const [prevDate, setPrevDate] = useState(currentDate);

    //날짜 변경하기
    const handleDateChange = useCallback((date, dateString) => {
        if (!dates[dateString]) {
            alert("해당 날짜에 데이터가 없습니다.")
            dispatch(updateDate(prevDate));
            return;
        }
        setPrevDate(currentDate);
        dispatch(updateDate(dateString));
    }, [dispatch, dates, currentDate, prevDate]);

    //회차 변경하기
    const handleSessionChange = useCallback((e) => {
        dispatch(updateSession(e.target.value));
    }, [dispatch]);

    //출결 체크박스 선택
    const handleChange = useCallback((e, studentIndex, periodIndex) => {
        dispatch(updateAttendance({
            currentDate: currentDate,
            currentSession: currentSession,
            studentIndex,
            periodIndex,
            value: e.target.value
        }));
    }, [dispatch, currentDate, currentSession]);

    //모두 출석 처리
    const handleAllAttendance = useCallback(() => {
        dispatch(updateAllAttendance({
            currentDate: currentDate,
            currentSession: currentSession,
            value: "출석"
        }));
    }, [dispatch, currentDate, currentSession]);

    //변경 사항 제출
    const handleSubmit = () => {
        dispatch(submitAttendanceChanges(changedData));
    };


    //데이터가 없을 때
    if (!attendanceData || attendanceData.length === 0) {
        return <div>Loading...</div>; // 또는 적절한 메시지 표시
    }
    return (
        <div>
            <DateSessionSelector
                currentDate={currentDate}
                currentSession={currentSession}
                dates={dates}
                handleDateChange={handleDateChange}
                handleSessionChange={handleSessionChange}
                handleAllAttendance={handleAllAttendance}
            />
            <table>
                <thead>
                <tr>
                    <th>이름</th>
                    {Array.from({length: 8}, (_, i) => <th key={i}>{`${i + 1}교시`}</th>)}
                </tr>
                </thead>
                <tbody>
                {attendanceData && attendanceData.map((student, studentIndex) => (
                    <tr key={studentIndex}>
                        <td>{student.name}</td>
                        {student.periods.map((status, periodIndex) => (
                            <td key={periodIndex}>
                                <SelectAttendance
                                    period={periodIndex}
                                    onChange={(e) => handleChange(e, studentIndex, periodIndex)}
                                    value={status}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleSubmit}>변경 사항 제출</button>
        </div>
    );
};

export default AttendanceTable;