import React from "react";
import { Select } from 'antd';

const SelectAttendance = ({period, onChange, value}) => {
    return (
        <Select
            name={`attendance-${period}`}
            onChange={onChange}
            className="select-attendance"
            value={value}
        >
            <Select.Option value="선택">선택</Select.Option>
            <Select.Option value="출석">출석</Select.Option>
            <Select.Option value="결석">결석</Select.Option>
            <Select.Option value="외출">외출</Select.Option>
            <Select.Option value="조퇴">조퇴</Select.Option>
            <Select.Option value="공결">공결</Select.Option>
        </Select>
    );
}

export default SelectAttendance;
