import React from "react";

const SelectAttendance = ({ period, onChange, value }) => (
    <select
        name={`attendance-${period}`}
        onChange={onChange}
        className="border rounded px-2 py-1 text-sm text-black"
        value={value}
    >
        <option value="선택">선택</option>
        <option value="출석">출석</option>
        <option value="외출">외출</option>
        <option value="조퇴">조퇴</option>
        <option value="결석">결석</option>
    </select>
);

export default SelectAttendance;