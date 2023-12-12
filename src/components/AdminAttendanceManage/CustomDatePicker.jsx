import React from 'react';
import {DatePicker} from 'antd';
import 'antd/dist/antd'; // Ant Design 스타일을 포함
import moment from 'moment';


const CustomDatePicker = ({value, onDateChange}) => {
    return (
        <DatePicker onChange={onDateChange}/>
    );
};

export default CustomDatePicker;