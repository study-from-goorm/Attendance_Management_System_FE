import { getAttendanceNumericValue } from './attendanceUtils';

export const reshapeData = (data, currentDate, courseName) => {

    if (Array.isArray(data) === false) {
        return {
            date: currentDate,
            courseName: courseName,
            players: [
                {
                    playerName: data.name,
                    playerId: data.id,
                    sessionList: {
                        sessionOne: getAttendanceNumericValue(data.periods[0]),
                        sessionTwo: getAttendanceNumericValue(data.periods[1]),
                        sessionThree: getAttendanceNumericValue(data.periods[2]),
                        sessionFour: getAttendanceNumericValue(data.periods[3]),
                        sessionFive: getAttendanceNumericValue(data.periods[4]),
                        sessionSix: getAttendanceNumericValue(data.periods[5]),
                        sessionSeven: getAttendanceNumericValue(data.periods[6]),
                        sessionEight: getAttendanceNumericValue(data.periods[7]),
                    }
                }
            ]
        };
    }
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