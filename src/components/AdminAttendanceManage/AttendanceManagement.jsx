import React, {useCallback, useEffect, useState} from 'react';
import DateCourseSelector from "./DateCourseSelector.jsx";
import {axiosPrivate} from "../../api/axiosInstance.js";
import {Table, Spin} from 'antd'
import {useQuery} from "@tanstack/react-query";
import {fetchAttendanceData} from "../../api/requestApi.js";
import {transformDataForTable} from "../../utils/transformDataForTable.js";
import {getTableColumns} from "../../utils/getTableColumns.jsx";
import {reshapeData} from "../../utils/reshapeData.js";
import {LoadingOutlined} from "@ant-design/icons";

const AttendanceTable = () => {
        const [ prevDateCourse, setPrevDateCourse ] = useState ({
            date : null,
            course : { courseId : null, courseName : null }
        });
        const [ currentDate, setCurrentDate ] = useState ('2023-10-13');
        const [ currentCourse, setCurrentCourse ] = useState ({ courseId : 3, courseName : '풀스택 3회차' });
        const [ changedData, setChangedData ] = useState ({});
        const [ dataSource, setDataSource ] = useState ([])

        // 데이터 패칭
        const { data : attendanceData, isLoading, isError } = useQuery ({
            queryKey : [ 'attendanceData', currentDate, currentCourse.courseId ],
            queryFn : () => fetchAttendanceData ({ course : currentCourse.courseId, date : currentDate }),
            staleTime : 300000, // 5 minutes
            refetchOnWindowFocus : true
        });


        // 데이터가 없으면 이전 데이터로 복구
        useEffect (() => {
            if (!attendanceData && prevDateCourse.date && prevDateCourse.course) {
                alert ('데이터가 없습니다.')
                setCurrentDate (prevDateCourse.date);
                setCurrentCourse (prevDateCourse.course);
            }
        }, [ attendanceData, prevDateCourse ]);


        useEffect (() => {
            console.log ("=>(AttendanceManagement.jsx:115) dataSource", dataSource);
        }, [ dataSource ]);

        useEffect (() => {
            console.log ("=>(AttendanceManagement.jsx:115) changedData", changedData);
        }, [ changedData ]);

        // 날짜 변경 핸들러
        const handleDateChange = useCallback ((date, dateString) => {
            setPrevDateCourse ({ date : currentDate, course : currentCourse });
            setCurrentDate (dateString);
        }, [ currentDate, currentCourse ]);

        // 회차 변경 핸들러
        const handleCourseChange = useCallback ((course) => {
            setPrevDateCourse ({ date : currentDate, course : currentCourse });
            setCurrentCourse (course);
        }, [ currentDate, currentCourse ]);

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

        const handleChange = useCallback ((value, studentIndex, periodIndex) => {
            updateDataSource (studentIndex, periodIndex, value);
        }, [ updateDataSource ]);

        //모두 출석 버튼 클릭 시
        const handleAllAttendance = useCallback (() => {
            const updatedDataSource = dataSource.map ((row) => {
                return {
                    ...row,
                    periods : row.periods.map (() => {
                        return '출석';
                    })
                };
            });
            setDataSource (updatedDataSource);
        }, [ dataSource ]);

        const reshapeDataCallback = useCallback ((data) => {
            const reshapedData = reshapeData (data, currentDate, currentCourse.courseName);
            setChangedData (reshapedData);
        }, [ currentDate, currentCourse.courseName ]);

        //변경 사항 제출
        const handleSubmit = async () => {
            try {
                await reshapeDataCallback (dataSource);
                await axiosPrivate.post (`/admin/attendances/${currentCourse.courseId}/${currentDate}`, changedData);
                alert ('변경 사항이 성공적으로 제출되었습니다.');
                setChangedData ({});
            } catch (error) {
                console.error ('Error submitting data:', error);
            }
        };

        //저장 버튼 클릭 시
        const handleSave = useCallback(async (studentIndex) => {

            const savedData = dataSource[studentIndex];
            console.log("=>(AttendanceManagement.jsx:119) dataSource", dataSource);
            console.log("=>(AttendanceManagement.jsx:119) savedData", savedData);

            // savedData가 undefined인 경우 함수를 종료
            if (!savedData) {
                alert('저장할 데이터가 없습니다.');
                return;
            }

            try {
                await reshapeDataCallback([savedData]);
                await axiosPrivate.post(`/admin/attendances/${currentCourse.courseId}/${currentDate}`, changedData);
                alert('변경 사항이 성공적으로 제출되었습니다.');
                setChangedData({});
            } catch (error) {
                alert('변경 사항 제출에 실패했습니다.');
                console.error('Error submitting data:', error);
            }
        }, [ changedData, dataSource, reshapeDataCallback, currentCourse.courseId, currentDate ]);


        const columns = getTableColumns (handleChange, handleSave, currentCourse.courseName);


        useEffect (() => {
            // attendanceData가 변경될 때 dataSource 업데이트
            if (attendanceData) {
                const transformedData = transformDataForTable (attendanceData.playerSessions);
                setDataSource (transformedData);
            }
        }, [ attendanceData, transformDataForTable ]);

        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500">
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize : 24,
                                    }}
                                    spin
                                />
                            }
                        />;
                    </div>
                </div>
            )
        }

        if (isError) {

            return <div>Error...</div>;
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
                <Table columns={columns} dataSource={dataSource} sticky={true} responsive={true}
                       pagination={{
                           defaultPageSize : 20,
                           showSizeChanger : true,
                           pageSizeOptions : [ '10', '20', '30', '50', '60', '70', '100' ],
                       }}
                />
            </div>
        );
    }
;

export default AttendanceTable;