export const attendanceStatus = {
    0 : '선택',
    1 : '출석',
    2 : '지각',
    3 : '조퇴',
    4 : '외출',
    5 : '결석',
    6 : '공결',
};

export const sessionNumber = {
    1 : 'One',
    2 : 'Two',
    3 : 'Three',
    4 : 'Four',
    5 : 'Five',
    6 : 'Six',
    7 : 'Seven',
    8 : 'Eight'
};

export const getSession = (value) => {
    return sessionNumber[value];
};

export const getAttendanceValue = (value) => {
    return attendanceStatus[value] || '선택';
};

export const getAttendanceNumericValue = (textValue) => {
    const statusKeys = Object.keys (attendanceStatus);
    for (let key of statusKeys) {
        if (attendanceStatus[key] === textValue) {
            return key;
        }
    }
    return null; // 혹은 적절한 기본값
};