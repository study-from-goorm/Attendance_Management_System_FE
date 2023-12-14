import { getAttendanceValue } from './attendanceUtils';

export const transformDataForTable = (data) => {
    return data.map ((player, index) => {
        const sessionData = Object.keys (player.sessionList).map ((key) => getAttendanceValue (player.sessionList[key]));
        return {
            key : index,
            id : player.playerId,
            name : player.playerName,
            periods : sessionData,
        };
    });
};