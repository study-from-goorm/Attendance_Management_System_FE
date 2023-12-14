import React from 'react';
import CustomDatePicker from './CustomDatePicker';
import {Button, Select, Spin} from 'antd';
import {useQuery} from '@tanstack/react-query';
import {fetchCourses} from '../../api/requestApi.js';
import {LoadingOutlined} from "@ant-design/icons";

const DateCourseSelector = ({
                                currentDate,
                                currentCourse,
                                handleDateChange,
                                handleCourseChange,
                                handleAllAttendance,
                                handleSubmit,
                                handleReset,
                                handleSearch
                            }) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
    });

    // 코스 변경 시
    const handleSelectChange = (courseId) => {
        const course = data.find(c => c.courseId === courseId);
        handleCourseChange(course);
    };

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
    if (error) return <div>Error : 회차 정보를 불러오지 못했습니다</div>;



    return (
        <div className="bg-background-color sticky top-12 p-4 rounded-lg shadow-md z-10 flex flex-col lg:flex-row justify-between items-center">
            {/* 왼쪽 요소: 날짜 선택기와 코스 선택 */}
            <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
                <CustomDatePicker value={currentDate} onDateChange={handleDateChange} className="mr-2" />
                <Select
                    onChange={handleSelectChange}
                    defaultValue={currentCourse.courseName ? currentCourse.courseName : "과정을 선택하세요"}
                    className="flex-1"
                >
                    {data.map((course) => (
                        <Select.Option key={course.courseId} value={course.courseId}>
                            {course.courseName}
                        </Select.Option>
                    ))}
                </Select>
                <Button type="primary" onClick={handleSearch} className="mr-2">
                    검색
                </Button>
            </div>

            {/* 오른쪽 요소: 버튼 그룹 */}
            <div>
                <Button type="primary" onClick={handleReset} className="mr-2">
                    초기화
                </Button>
                <Button type="primary" onClick={handleAllAttendance} className="mr-2">
                    모두 출석
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                    변경 사항 저장
                </Button>
            </div>
        </div>
    );
};

export default DateCourseSelector;