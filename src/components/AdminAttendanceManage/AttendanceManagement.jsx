import React, {useCallback, useEffect, useState} from 'react';
import SelectAttendance from './SelectAttendanceBox.jsx';
import DateSessionSelector from "./DateSessionSelector.jsx";
import {axiosPrivate} from "../../api/axiosInstance.js";
import {Button, Table} from 'antd'
import {fetchData, fetchDateAndSession} from "../../services/useFetch.js";


const AttendanceTable = () => {
    const [attendanceData, setAttendanceData] = useState({}); // 초기 상태를 빈 객체로 설정
    const [dateSession, setDateSession] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().slice(0, 10));
    const [currentSession, setCurrentSession] = useState('풀스택 2회차');
    const [changedData, setChangedData] = useState([]);


    useEffect(() => {
        fetchData(currentDate, currentSession).then(data => {
            setAttendanceData(data);
            console.log("=>(AttendanceManagement.jsx:28) attendanceData", attendanceData);
        });
    }, [currentDate, currentSession]);
    useEffect(() => {
        fetchDateAndSession().then(data => {
            setDateSession(data);
            console.log("=>(AttendanceManagement.jsx:28) dateSession", dateSession);
        });
    }, []);
    useEffect(() => {
        console.log("Updated attendanceData:", attendanceData);
    }, [attendanceData]);

    useEffect(() => {
        console.log("Updated dateSession:", dateSession);
    }, [dateSession]);




    //날짜 변경 시 이전 날짜 저장
    const handleDateChange = useCallback((date, dateString) => {
        setCurrentDate(dateString);
        fetchData(dateString, currentSession);
    }, [currentSession]);

    //회차 변경하기
    const handleSessionChange = useCallback((value) => {
        setCurrentSession(value);
        fetchData(currentDate, value);
    }, [currentDate]);

    //출결 체크박스 선택
    const handleChange = useCallback((value, studentIndex, periodIndex) => {
        // 여기에서 attendanceData를 업데이트하는 로직 구현
        const updatedData = {...attendanceData}; // 현재 상태의 얕은 복사본
        const sessionData = updatedData[currentDate][currentSession];

        if (sessionData) {
            sessionData[studentIndex].periods[periodIndex] = value;
            setAttendanceData(updatedData); // 업데이트된 상태 설정

            const changeKey = `${currentDate}-${currentSession}-${studentIndex}-${periodIndex}`;
            setChangedData({
                ...changedData,
                [changeKey]: {currentDate, currentSession, studentIndex, periodIndex, value}
            });
            console.log("=>(AttendanceManagement.jsx:55) ", changedData);
        }
    }, [attendanceData, currentDate, currentSession, changedData]);

    //모두 출석 처리
    const handleAllAttendance = useCallback(() => {
        const updatedData = {...attendanceData};
        const sessionData = updatedData;
        let updatedChangedData = {...changedData};


        if (sessionData) {
            sessionData.forEach((student, studentIndex) => {
                student.periods.forEach((_, periodIndex) => {
                    const changeKey = `${currentDate}-${currentSession}-${studentIndex}-${periodIndex}`;
                    if (student.periods[periodIndex] !== '출석') {
                        updatedChangedData[changeKey] = {
                            currentDate,
                            currentSession,
                            studentIndex,
                            periodIndex,
                            value: '출석'
                        };
                    }
                    student.periods[periodIndex] = '출석';
                });
            });

            setAttendanceData(updatedData); // 업데이트된 상태 설정
            console.log("=>(AttendanceManagement.jsx:78) updatedData", updatedData);
            console.log("=>(AttendanceManagement.jsx:58) updatedChangedData", updatedChangedData);
            setChangedData(updatedChangedData); // 변경된 데이터 추가
        }
    }, [attendanceData, currentDate, currentSession, changedData]);


    //변경 사항 제출
    const handleSubmit = async () => {
        try {
            console.log("=>(AttendanceManagement.jsx:83) changedData", changedData);
            await axiosPrivate.post('/api/updateAttendance', changedData);
            alert('변경 사항이 성공적으로 제출되었습니다.');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    //저장 버튼 클릭 시
    const handleSave = useCallback(async (studentIndex) => {
        const studentChangedData = changedData.filter(data => data.studentIndex === studentIndex);

        if (studentChangedData.length === 0) {
            alert('변경된 데이터가 없습니다.');
            return;
        }

        try {
            await axiosPrivate.post('/api/updateAttendance', studentChangedData);
            alert('변경 사항이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }, [changedData]);

    // Ant Design의 Table 컴포넌트에 사용될 columns 정의
    const columns = [
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
        },
        ...Array.from({length: 8}, (_, i) => ({
            title: `${i + 1}교시`,
            dataIndex: `periods`,
            key: `period${i}`,
            render: (periods, record, index) => (
                <SelectAttendance
                    period={i}
                    onChange={(value) => handleChange(value, record.key, i)}
                    value={periods[i]}
                />
            ),
        })),
        {
            title: '저장',
            key: 'save',
            render: (_, record, index) => (
                <Button
                    onClick={() => handleSave(record.key)}
                    type="primary"
                >
                    저장
                </Button>
            ),
        },
    ];

    // Ant Design의 Table 컴포넌트에 사용될 dataSource 정의
    if (!attendanceData || attendanceData.length === 0) {
        return <div>Loading...</div>;
    }
    const transformedData = () => {
        return attendanceData.map((student, index) => ({
            key: index,
            name: student.name,
            periods: student.periods,
        }));
    };

    // const sessionAttendanceData = attendanceData[currentDate]?.[currentSession];


    return (
        <div>
            <DateSessionSelector
                currentDate={currentDate}
                currentSession={currentSession}
                dateSession={dateSession}
                handleDateChange={handleDateChange}
                handleSessionChange={handleSessionChange}
                handleAllAttendance={handleAllAttendance}
                handleSubmit={handleSubmit}
            />
            {/*<Table columns={columns} dataSource={transformedData()} sticky={true}/>*/}
        </div>
    );
};

export default AttendanceTable;