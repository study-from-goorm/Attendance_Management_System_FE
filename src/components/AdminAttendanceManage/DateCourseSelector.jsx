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
                                handleSearch,
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
        <div className="sticky top-[50px] z-10 mb-4">
            <CustomDatePicker value={currentDate} onDateChange={handleDateChange}/>
            <Select
                onChange={handleSelectChange}
                value={currentCourse}
                className="mb-4"
            >
                {data.map((course) => (
                    <Select.Option key={course.courseId} value={course.courseId}>
                        {course.courseName}
                    </Select.Option>
                ))}
            </Select>
            <Button type="primary" onClick={handleSearch}>
                검색
            </Button>
            <Button type="primary" onClick={handleAllAttendance}>
                모두 출석
            </Button>
            <Button type="primary" onClick={handleSubmit}>
                변경 사항 제출
            </Button>
        </div>
    );
};

export default DateCourseSelector;