import React, {useEffect} from 'react';
import CustomDatePicker from './CustomDatePicker';
import {Button, Select} from 'antd';
import {useQuery} from '@tanstack/react-query';
import {fetchCourses} from "../../api/reactQuery.js";

const DateCourseSelector = ({
                                currentDate,
                                currentCourse,
                                handleDateChange,
                                handleCourseChange,
                                handleAllAttendance,
                                handleSubmit,
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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error while fetching courses</div>;


    return (
        <div className="sticky top-12 bg-ivory p-4 rounded-lg shadow-md z-10">
            {/* 날짜 및 코스 선택 그룹 */}
            <div className="flex justify-between mb-4">
                <CustomDatePicker value={currentDate} onDateChange={handleDateChange} className="mr-2" />
                <Select
                    onChange={handleSelectChange}
                    defaultValue={currentCourse.courseName}
                    className="flex-1"
                >
                    {data.map((course) => (
                        <Select.Option key={course.courseId} value={course.courseId}>
                            {course.courseName}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex justify-between">
                <Button type="primary" onClick={handleAllAttendance} className="mr-2">
                    모두 출석
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                    변경 사항 제출
                </Button>
            </div>
        </div>

    );
};

export default DateCourseSelector;