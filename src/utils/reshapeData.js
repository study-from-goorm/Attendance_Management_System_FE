import { getAttendanceNumericValue } from './attendanceUtils';

export const reshapeData = (data, currentDate, courseName) => {
    const reshapedPlayerData = data.map ((row) => {
        return {
            playerName: row.name,
            playerId: row.id,
            sessionList: {
                sessionOne: getAttendanceNumericValue(row.periods[0]),
                sessionTwo: getAttendanceNumericValue(row.periods[1]),
                sessionThree: getAttendanceNumericValue(row.periods[2]),
                sessionFour: getAttendanceNumericValue(row.periods[3]),
                sessionFive: getAttendanceNumericValue(row.periods[4]),
                sessionSix: getAttendanceNumericValue(row.periods[5]),
                sessionSeven: getAttendanceNumericValue(row.periods[6]),
                sessionEight: getAttendanceNumericValue(row.periods[7]),
            }
        };
    });

    const reshapedData = {
        date: currentDate,
        courseName: courseName,
        players: reshapedPlayerData
    };

    return reshapedData;
};