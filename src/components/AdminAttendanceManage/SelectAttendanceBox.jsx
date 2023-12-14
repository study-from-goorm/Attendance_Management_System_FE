import React, {useEffect, useState} from "react";
import { Select } from 'antd';
import './selectColor.css';
const SelectAttendance = ({period, onChange, value}) => {



    const getClassName = (value) => {
        switch(value) {
            case '출석': return 'attendanceColor';
            case '결석': return 'absentColor';
            case '지각': return 'lateColor';
            case '외출': return 'leaveColor';
            case '조퇴': return 'earlyLeaveColor';
            case '공결': return 'excusedColor';
            default: return '';
        }
    };



    return (
        <Select
            name={`attendance-${period}`}
            onChange={onChange}
            className={`select-attendance ${getClassName (value)}`}
            value={value}
        >
            <Select.Option value="선택">선택</Select.Option>
            <Select.Option value="출석">출석</Select.Option>
            <Select.Option value="결석">결석</Select.Option>
            <Select.Option value="지각">지각</Select.Option>
            <Select.Option value="외출">외출</Select.Option>
            <Select.Option value="조퇴">조퇴</Select.Option>
            <Select.Option value="공결">공결</Select.Option>
        </Select>
    );
}

export default SelectAttendance;
