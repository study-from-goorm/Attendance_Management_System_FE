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

        useEffect(() => {
            console.log("=>(AttendanceManagement.jsx:115) dataSource", dataSource);
        }, [dataSource]);

        useEffect(() => {
            console.log("=>(AttendanceManagement.jsx:115) changedData", changedData);
        }, [changedData]);

        // 날짜 변경 핸들러
        const handleDateChange = useCallback ((date, dateString) => {
            setCurrentDate (dateString);
        }, []);

        // 회차 변경 핸들러
        const handleCourseChange = useCallback ((course) => {
            setCurrentCourse (course);
        }, []);

        const updateDataSource = useCallback ((studentIndex, periodIndex, value) => {
            const updatedDataSource = dataSource.map ((row, index) => {
                if (index === studentIndex) {
                    return {
                        ...row,
                        periods : row.periods.map ((periodValue, idx) =>
                            idx === periodIndex ? value : periodValue
                        )
                    };
                }
                return row;
            });
            setDataSource (updatedDataSource);
        }, [ dataSource ]);

        const handleChange = useCallback ((value, studentIndex, periodIndex, playerName) => {
            updateDataSource (studentIndex, periodIndex, value);
        }, [ updateDataSource ]);

        //모두 출석 버튼 클릭 시
        const handleAllAttendance = useCallback(() => {
            const updatedDataSource = dataSource.map((row) => {
                return {
                    ...row,
                    periods: row.periods.map((periodValue) => {
                        return '출석';
                    })
                };
            });
            setDataSource(updatedDataSource);
        }, [ dataSource ]);

        const reshapeData = useCallback ((data) => {
            const reshapedPlayerData = data.map ((row) => {
                return {
                    playerName: row.name,
                    sessionList: {
                        sessionOne: getAttendanceNumericValue(row.periods[0]),
                        sessionTwo: getAttendanceNumericValue(row.periods[1]),
                        sessionThree: getAttendanceNumericValue(row.periods[2]),
                        sessionFour: getAttendanceNumericValue(row.periods[3]),
                        sessionFive: getAttendanceNumericValue(row.periods[4]),
                        sessionSix: getAttendanceNumericValue(row.periods[5]),
                        sessionSeven: getAttendanceNumericValue(row.periods[6]),
                        sessionEight: getAttendanceNumericValue(row.periods[7]),
                    }
                };
            });

            const reshapedData = {
                date: currentDate,
                courseName: currentCourse.courseName,
                players: reshapedPlayerData
            };

            setChangedData(reshapedData);
        }, [ currentDate, currentCourse.courseName ]);

        //변경 사항 제출
        const handleSubmit = async () => {
            try {
                await reshapeData (dataSource);
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
            {title : '번호', dataIndex : 'key', key : 'key'},
            { title : '이름', dataIndex : 'name', key : 'name' },
            ...Array.from ({ length : 8 }, (_, i) => ({
                title : `${i + 1}교시`,
                dataIndex : `periods`,
                key : `period${i}`,
                render : (text, record, index) => (
                    <SelectAttendance
                        period={i}
                        onChange={(value) => handleChange (value, record.key, i, record.name)} // Pass the player name here
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
        const sessionNumber = {
            1 : 'One',
            2 : 'Two',
            3 : 'Three',
            4 : 'Four',
            5 : 'Five',
            6 : 'Six',
            7 : 'Seven',
            8 : 'Eight'
        };

        const getSession = (value) => {
            return sessionNumber[value];
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
            // attendanceData가 변경될 때 dataSource 업데이트
            if (attendanceData && attendanceData.length > 0) {
                const transformedData = transformDataForTable (attendanceData[0].playerSessions);
                setDataSource (transformedData);
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
                    handleDateChange={handleDateChange}
                    handleCourseChange={handleCourseChange}
                    handleAllAttendance={handleAllAttendance}
                    handleSubmit={handleSubmit}
                />
                <Table columns={columns} dataSource={dataSource} sticky={true}
                       pagination={{
                           defaultPageSize: 20, // 한 페이지에 기본적으로 표시할 행의 수
                           showSizeChanger: true, // 사용자가 페이지당 행의 수를 변경할 수 있도록 함
                           pageSizeOptions: ['10', '20', '30', '50', '60', '70', '100'], // 선택 가능한 페이지당 행의 수 옵션
                       }}
                />
            </div>
        );
    }
;

export default AttendanceTable;