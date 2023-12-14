import React, {useCallback, useEffect, useState} from 'react';
import SelectAttendance from './SelectAttendanceBox.jsx';
import DateCourseSelector from "./DateCourseSelector.jsx";
import {axiosPrivate} from "../../api/axiosInstance.js";
import {Button, Table} from 'antd'
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchAttendanceData} from "../../api/reactQuery.js";


const AttendanceTable = () => {
    const [ currentDate, setCurrentDate ] = useState (new Date ().toISOString ().slice (0, 10));
    const [ currentCourse, setCurrentCourse ] = useState ({ courseId : 2, courseName : '풀스택 2회차' });
    const queryClient = useQueryClient ();
    const [ changedData, setChangedData ] = useState ({});
    const [ dataSource, setDataSource ] = useState ([])

    // 데이터 패칭
    const { data : attendanceData, isLoading, isError } = useQuery ({
        queryKey : [ 'attendanceData', currentDate, currentCourse.courseId ],
        queryFn : () => fetchAttendanceData ({ course : currentCourse.courseId, date : currentDate }),
        staleTime : 300000, // 5 minutes
        refetchOnWindowFocus : true
    });


    // 날짜 변경 핸들러
    const handleDateChange = useCallback ((date, dateString) => {
        setCurrentDate (dateString);
    }, []);

    // 회차 변경 핸들러
    const handleCourseChange = useCallback ((course) => {
        setCurrentCourse (course);
        console.log ("=>(AttendanceManagement.jsx:34) CurrentCourse", currentCourse);
    }, []);
    //검색 버튼 클릭 시
    const handleSearch = useCallback (async () => {
        try {
            await queryClient.prefetchQuery ([ 'attendanceData', currentDate, currentCourse.courseId ], () => fetchAttendanceData ({
                course : currentCourse.courseId,
                date : currentDate
            }));
        } catch (error) {
            console.error ('Error fetching data:', error);
        }
    }, [ currentDate, currentCourse.courseId, queryClient ]);

    //출결 체크박스 선택
    const handleChange = useCallback ((value, studentIndex, periodIndex) => {
        console.log ("=>(AttendanceManagement.jsx:52) value", value);
        console.log ("=>(AttendanceManagement.jsx:53) periodIndex", periodIndex);
        console.log ("=>(AttendanceManagement.jsx:53) studentIndex", studentIndex);

        // 날짜와 코스 ID에 해당하는 키 생성
        const changeKey = `${currentDate}-${currentCourse.courseId}`;
        const updatedChangedData = changedData[changeKey] ? [ ...changedData[changeKey] ] : [];

        // 변경된 학생 데이터를 배열에 추가 또는 업데이트
        const existingIndex = updatedChangedData.findIndex (data => data.studentIndex === studentIndex);

        if (existingIndex > -1) {
            updatedChangedData[existingIndex][`session${periodIndex + 1}`] = value;
        }
        else {
            updatedChangedData.push ({
                studentIndex,
                courseId : currentCourse.courseId,
                date : currentDate,
                [`session${periodIndex + 1}`] : value,
            });
        }

        setChangedData (prevData => ({ ...prevData, [changeKey] : updatedChangedData }));

    }, []);

    //모두 출석 처리
    const handleAllAttendance = useCallback (() => {
        // 날짜와 코스 ID에 해당하는 키 생성
        const changeKey = `${currentDate}-${currentCourse.courseId}`;
        const updatedChangedData = changedData[changeKey] ? [ ...changedData[changeKey] ] : [];

        attendanceData.forEach ((student, studentIndex) => {
            // 각 학생의 출석 데이터 복사
            let studentData = updatedChangedData.find (data => data.playerName === student.playerName) || { ...student };

            // 모든 세션을 '1' (출석)으로 설정
            for (let i = 1; i <= 8; i++) {
                studentData[`session${i}`] = 1;
            }

            // 변경된 학생 데이터를 배열에 추가 또는 업데이트
            const existingIndex = updatedChangedData.findIndex (data => data.playerName === student.playerName);
            if (existingIndex > -1) {
                updatedChangedData[existingIndex] = studentData;
            } else {
                updatedChangedData.push (studentData);
            }
        });

        setChangedData (prevData => ({ ...prevData, [changeKey] : updatedChangedData }));
    }, [ attendanceData, currentDate, currentCourse.courseId, changedData ]);

    //변경 사항 제출
    const handleSubmit = async () => {
        try {
            await axiosPrivate.post ('/api/updateAttendance', changedData);
            alert ('변경 사항이 성공적으로 제출되었습니다.');
            setChangedData ({});
        } catch (error) {
            console.error ('Error submitting data:', error);
        }
    };

    //저장 버튼 클릭 시
    const handleSave = useCallback (async (studentIndex) => {
        const studentChangedData = changedData.filter (data => data.studentIndex === studentIndex);

        if (studentChangedData.length === 0) {
            alert ('변경된 데이터가 없습니다.');
            return;
        }

        try {
            await axiosPrivate.post ('/api/updateAttendance', studentChangedData);
            alert ('변경 사항이 성공적으로 저장되었습니다.');
        } catch (error) {
            console.error ('Error submitting data:', error);
        }
    }, [ changedData ]);


    // Ant Design의 Table 컴포넌트에 사용될 columns 정의
    const columns = [
        { title : '이름', dataIndex : 'name', key : 'name' },
        ...Array.from ({ length : 8 }, (_, i) => ({
            title : `${i + 1}교시`,
            dataIndex : `periods`,
            key : `period${i}`,
            render : (text, record, index) => (
                <SelectAttendance
                    period={i}
                    onChange={(value) => handleChange (value, record.key, i)}
                    value={record.periods[i]}
                />
            ),
        })),
        {
            title : '저장',
            key : 'save',
            render : (_, record, index) => (
                <Button
                    onClick={() => handleSave (record.key)}
                    type="primary"
                >
                    저장
                </Button>
            ),
        },
    ];


    const attendanceStatus = {
        0 : '선택',
        1 : '출석',
        2 : '지각',
        3 : '조퇴',
        4 : '외출',
        5 : '결석',
        6 : '공결',
    };

    const getAttendanceValue = (value) => {
        return attendanceStatus[value] || '선택';
    };
    const getAttendanceNumericValue = (textValue) => {
        const statusKeys = Object.keys (attendanceStatus);
        for (let key of statusKeys) {
            if (attendanceStatus[key] === textValue) {
                return key;
            }
        }
        return null; // 혹은 적절한 기본값
    };
    // 데이터 변환 함수
    const transformDataForTable = useCallback ((data) => {
        return data.map ((player, index) => {
            const sessionData = Object.keys (player.sessionList).map ((key) => getAttendanceValue (player.sessionList[key]));
            return {
                key : index,
                name : player.playerName,
                periods : sessionData,
            };
        });
    }, []); // Add necessary dependencies


    useEffect (() => {
        if (attendanceData && attendanceData.length > 0) {
            console.log ("=>(AttendanceManagement.jsx:199) attendanceData", attendanceData);
            const transformedData = transformDataForTable (attendanceData[0].playerSessions);
            setDataSource (transformedData);
            console.log ("=>(AttendanceManagement.jsx:201) dataSource", dataSource);
        }
    }, [ attendanceData, transformDataForTable ]);

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <DateCourseSelector
                currentDate={currentDate}
                currentCourse={currentCourse}
                handleSearch={handleSearch} // 검색 버튼 클릭 시 검색 함수 호출
                handleDateChange={handleDateChange}
                handleCourseChange={handleCourseChange}
            />
            <Table columns={columns} dataSource={dataSource} sticky={true}/>
        </div>
    );
};

export default AttendanceTable;