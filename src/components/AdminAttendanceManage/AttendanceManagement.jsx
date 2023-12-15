import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
        const [ currentDate, setCurrentDate ] = useState ('2023-10-13');
        const [ currentCourse, setCurrentCourse ] = useState ({ courseId : null, courseName : null });
        const [ prevDateCourse, setPrevDateCourse ] = useState ({
            date : currentDate,
            course : { courseId : currentCourse.courseId, courseName : currentCourse.courseName }
        });
        const [ changedData, setChangedData ] = useState ({});
        const [ dataSource, setDataSource ] = useState ([])
        const [ isSearch, setIsSearch ] = useState (false)
        // 데이터 패칭
        const { data : attendanceData, isLoading, isError } = useQuery ({
            queryKey : [ 'attendanceData', currentDate, currentCourse.courseId ],
            queryFn : async () => {
                try {
                    const data = await fetchAttendanceData ({ course : currentCourse.courseId, date : currentDate })
                    console.log ("=>(AttendanceManagement.jsx:115) 데이터 부름!");
                    setIsSearch (false);
                    return data;
                } catch (error) {
                    alert ('데이터가 없습니다.')
                    const data = await fetchAttendanceData ({ course : prevDateCourse.course.courseId, date : prevDateCourse.date })
                    console.log("=>(AttendanceManagement.jsx:34) data", data);
                    setCurrentDate (prevDateCourse.date);
                    setCurrentCourse (prevDateCourse.course);
                    setIsSearch (false);
                    return data;
                }
            },
            refetchOnWindowFocus : true,
            enabled : !!currentCourse.courseId && !!currentDate && isSearch
        });

        useEffect (() => {
            console.log ("=>(AttendanceManagement.jsx:115) dataSource", dataSource);
        }, [ dataSource ]);

        useEffect(() => {
            console.log("=>(AttendanceManagement.jsx:56) 쿼리조건을 만족하시오?", !!currentCourse.courseId && !!currentDate && isSearch);
        }, [currentCourse, currentDate, isSearch]);
        // 검색
        const search = useCallback(() => {
            setIsSearch(true);
        }, [setIsSearch]);

        // useEffect (() => {
        //     console.log ("=>(AttendanceManagement.jsx:115) attendanceData", attendanceData);
        // }, [ attendanceData]);
        //
        // useEffect (() => {
        //     console.log ("=>(AttendanceManagement.jsx:115) currentCourse", currentCourse);
        // }, [ currentCourse]);
        //
        // useEffect (() => {
        //     console.log ("=>(AttendanceManagement.jsx:115) currentDate", currentDate);
        // }, [ currentDate ]);
        // useEffect (() => {
        //     console.log ("=>(AttendanceManagement.jsx:115) changedData", changedData);
        // }, [ changedData ]);



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
            if(value === '조퇴' || value === '공결'){
                const updatedDataSource = dataSource.map ((row, index) => {
                    if (index === studentIndex) {
                        return {
                            ...row,
                            periods : row.periods.map ((periodValue, idx) =>
                                idx >= periodIndex ? value : periodValue
                            )
                        };
                    }
                    return row;
                });
                setDataSource (updatedDataSource);
                return;
            }
            updateDataSource (studentIndex, periodIndex, value);
        }, [ updateDataSource, dataSource ]);

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

        const reshapeDataCallback = useCallback (async (data) => {
            const reshapedData = await reshapeData (data, currentDate, currentCourse.courseName);
            await setChangedData (reshapedData);
        }, [ currentDate, currentCourse.courseName ]);

        //변경 사항 제출
        const handleSubmit = async () => {
            try {
                await reshapeDataCallback(dataSource);
            } catch (error) {
                alert('변경 사항 저장에 실패했습니다.')
                console.error('Error submitting data:', error);
            }
        };

        useEffect(() => {
            console.log("=>(AttendanceManagement.jsx:137) changedData", changedData);
            const submitData = async () => {
                try {
                    await axiosPrivate.post(`/admin/attendances/${currentCourse.courseId}/${currentDate}`, changedData);
                    alert('변경 사항이 성공적으로 저장되었습니다.');
                    setChangedData({});
                } catch (error) {
                    alert('변경 사항 저장에 실패했습니다.')
                    console.error('Error submitting data:', error);
                }
            };

            if (Object.keys(changedData).length > 0) {
                submitData();
            }
        }, [changedData]);

        // 초기화 버튼 클릭 시
        const handleReset = useCallback (() => {
            setDataSource (dataSource.map ((row) => {
                return {
                    ...row,
                    periods : row.periods.map (() => {
                        return '선택';
                    })
                };
            }));
        }, [ dataSource ]);

        // 한 명 출석 버튼 클릭 시
        const handleOneAttendance = useCallback (async (studentIndex) => {

            const updatedDataSource = dataSource.map ((row, index) => {
                console.log ("=>(AttendanceManagement.jsx:115) row", row);
                if (index === studentIndex) {
                    return {
                        ...row,
                        periods : row.periods.map (() =>
                            '출석'
                        )
                    };
                }
                return row;
            });
            setDataSource (updatedDataSource);

        }, [ dataSource ]);


        const columns = useMemo (() => getTableColumns (handleChange, handleOneAttendance, currentCourse.courseName));


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

            return (
                <div>
                    <DateCourseSelector
                        currentDate={currentDate}
                        currentCourse={currentCourse}
                        handleDateChange={handleDateChange}
                        handleCourseChange={handleCourseChange}
                        handleReset={handleReset}
                        handleAllAttendance={handleAllAttendance}
                        handleSubmit={handleSubmit}
                        handleSearch={search}
                    />
                    <Table columns={columns} />
                </div>
            )
        }

        return (
            <div>
                <DateCourseSelector
                    currentDate={currentDate}
                    currentCourse={currentCourse}
                    handleDateChange={handleDateChange}
                    handleCourseChange={handleCourseChange}
                    handleReset={handleReset}
                    handleAllAttendance={handleAllAttendance}
                    handleSubmit={handleSubmit}
                    handleSearch={search}
                />
                <Table columns={columns} dataSource={dataSource} sticky={true} responsive={true}
                       pagination={{
                           defaultPageSize : 100,
                       }}
                />
            </div>
        );
    }
;

export default AttendanceTable;