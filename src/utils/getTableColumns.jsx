import React from 'react';
import { Button } from 'antd';
import SelectAttendance from '../components/AdminAttendanceManage/SelectAttendanceBox.jsx';

export const getTableColumns = (handleChange, handleSave) => [
    {title : '번호', dataIndex : 'key', key : 'key'},
    { title : '이름', dataIndex : 'name', key : 'name' },
    ...Array.from ({ length : 8 }, (_, i) => ({
        title : `${i + 1}교시`,
        dataIndex : `periods`,
        key : `period${i}`,
        render : (text, record, index) => (
            <SelectAttendance
                period={i}
                onChange={(value) => handleChange (value, record.key, i, record.name)}
                value={record.periods[i]}
            />
        ),
    })),
    {
        title : '저장',
        key : 'save',
        render : (_, record, index) => (
            <Button
                onClick={() => handleSave (record.key)}
                type="primary"
            >
                저장
            </Button>
        ),
    },
];