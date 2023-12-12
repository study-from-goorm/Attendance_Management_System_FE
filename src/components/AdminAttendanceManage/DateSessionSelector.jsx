// DateSessionSelector.jsx
import React from 'react';
import CustomDatePicker from './CustomDatePicker';
import moment from "moment";

const DateSessionSelector = ({ currentDate, currentSession, dates, handleDateChange, handleSessionChange, handleAllAttendance }) => {
    return (
        <div>
            <CustomDatePicker value={moment(currentDate)} onDateChange={handleDateChange}/>
            <select onChange={handleSessionChange} value={currentSession}
                    className="mb-4 border rounded px-2 py-1 text-sm text-black">
                {currentDate && Object.keys(dates[currentDate]).map((sessionKey, index) => (
                    <option key={index} value={sessionKey}>{sessionKey}</option>
                ))}
            </select>
            <button onClick={handleAllAttendance}>모두 출석</button>
        </div>
    );
};

export default DateSessionSelector;