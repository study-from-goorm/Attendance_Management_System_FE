import React from 'react';
import {DatePicker} from 'antd';
import dayjs from "dayjs";


const CustomDatePicker = ({value, onDateChange}) => {
    return (
        <DatePicker defaultValue={dayjs(value)} onChange={onDateChange}/>
    );
};

export default CustomDatePicker;