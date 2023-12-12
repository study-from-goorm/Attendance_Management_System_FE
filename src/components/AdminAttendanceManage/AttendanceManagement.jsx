import React, {useCallback, useEffect, useState} from 'react';
import SelectAttendance from './SelectAttendanceBox.jsx';
import DateSessionSelector from "./DateSessionSelector.jsx";
import {axiosPrivate} from "../../api/axiosInstance.js";
import { Table } from 'antd'


const AttendanceTable = () => {
    const [dates, setDates] = useState({});
    const [attendanceData, setAttendanceData] = useState({}); // 초기 상태를 빈 객체로 설정
    const [currentDate, setCurrentDate] = useState('2023-12-01');
    const [currentSession, setCurrentSession] = useState('풀스택 1회차');
    const [changedData, setChangedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/api/dummyData');
                setAttendanceData(response.data); // 혹은 response.data를 적절히 변환하여 사용
                setDates(Object.keys(response.data));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //날짜 변경 시 이전 날짜 저장
    const handleDateChange = useCallback((date, dateString) => {
        if (!attendanceData[dateString]) {
            alert("해당 날짜에 데이터가 없습니다.");
            return;
        }
        setCurrentDate(dateString);
    }, [attendanceData]);

    //회차 변경하기
    const handleSessionChange = useCallback((e) => {
        setCurrentSession(e.target.value);
    }, []);

    //출결 체크박스 선택
    const handleChange = useCallback((e, studentIndex, periodIndex) => {
        // 여기에서 attendanceData를 업데이트하는 로직 구현
        const updatedData = {...attendanceData}; // 현재 상태의 얕은 복사본
        const sessionData = updatedData[currentDate][currentSession];

        if (sessionData) {
            sessionData[studentIndex].periods[periodIndex] = e.target.value;
            setAttendanceData(updatedData); // 업데이트된 상태 설정
            setChangedData([...changedData, {studentIndex, periodIndex, value: e.target.value}]);
        }
    }, [attendanceData, currentDate, currentSession, changedData]);

    //모두 출석 처리
    const handleAllAttendance = useCallback(() => {
        const updatedData = {...attendanceData};
        const sessionData = updatedData[currentDate][currentSession];
        let updatedChangedData = [...changedData];

        if (sessionData) {
            sessionData.forEach((student, studentIndex) => {
                student.periods.forEach((_, periodIndex) => {
                    if (student.periods[periodIndex] !== "출석") {
                        updatedChangedData.push({
                            studentIndex,
                            periodIndex,
                            value: "출석"
                        });
                    }
                    student.periods[periodIndex] = "출석";
                });
            });

            setAttendanceData(updatedData); // 업데이트된 상태 설정
            setChangedData(updatedChangedData); // 변경된 데이터 추가
        }
    }, [attendanceData, currentDate, currentSession, changedData]);


    //변경 사항 제출
    const handleSubmit = async () => {
        try {
            await axiosPrivate.post('/api/updateAttendance', changedData);
            alert('변경 사항이 성공적으로 제출되었습니다.');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    const sessionAttendanceData = attendanceData[currentDate]?.[currentSession];

    if (!sessionAttendanceData || sessionAttendanceData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <DateSessionSelector
                currentDate={currentDate}
                currentSession={currentSession}
                attendanceData={attendanceData}
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
                {sessionAttendanceData.map((student, studentIndex) => (
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