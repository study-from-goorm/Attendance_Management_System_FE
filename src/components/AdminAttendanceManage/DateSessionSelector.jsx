// DateSessionSelector.jsx
import React from 'react';
import CustomDatePicker from './CustomDatePicker';
import moment from "moment";

const DateSessionSelector = ({
                                 currentDate,
                                 currentSession,
                                 attendanceData,
                                 handleDateChange,
                                 handleSessionChange,
                                 handleAllAttendance
                             }) => {
    console.log("=>(DateSessionSelector.jsx:18) attendanceData", Object.keys(attendanceData[currentDate]));
    return (
        <div>
            <CustomDatePicker value={currentDate} onDateChange={handleDateChange}/>
            <select onChange={handleSessionChange} value={currentSession}
                    className="mb-4 border rounded px-2 py-1 text-sm text-black">
                {Object.keys(attendanceData[currentDate]).map((session, i) => (
                    <option key={i} value={session}>{session}</option>
                ))}

            </select>
            <button onClick={handleAllAttendance}>모두 출석</button>
        </div>
    );
};

export default DateSessionSelector;