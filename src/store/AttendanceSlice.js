import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


const generatePeriods = () => Array(8).fill('선택');

const createDummyStudents = (count) => {
    return Array.from({length: count}, (_, index) => ({
        name: `학생${index + 1}`,
        periods: generatePeriods(),
    }));
};

const initialState = {
    currentDate: '2023-12-01',
    currentSession: '풀스택 1회차',
    changedData: [],
    sessionsByDate: {
        '2023-12-01': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-02': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-03': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-04': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-05': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-06': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-07': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(4),
            '풀스택 3회차': createDummyStudents(3),
            '풀스택 4회차': createDummyStudents(2),
            '풀스택 5회차': createDummyStudents(1),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-08': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(4),
            '풀스택 3회차': createDummyStudents(3),
            '풀스택 4회차': createDummyStudents(2),
            '풀스택 5회차': createDummyStudents(1),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-09': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(4),
            '풀스택 3회차': createDummyStudents(3),
            '풀스택 4회차': createDummyStudents(2),
            '풀스택 5회차': createDummyStudents(1),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-10': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        '2023-12-11': {
            '풀스택 1회차': createDummyStudents(5),
            '풀스택 2회차': createDummyStudents(5),
            '풀스택 3회차': createDummyStudents(5),
            '풀스택 4회차': createDummyStudents(5),
            '풀스택 5회차': createDummyStudents(5),
            '풀스택 6회차': createDummyStudents(5),
            '풀스택 8회차': createDummyStudents(5),
        },
        // 추가 날짜와 회차 데이터...
    },
};
export const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        updateDate: (state, action) => {
            state.currentDate = action.payload;
        },
        updateSession: (state, action) => {
            state.currentSession = action.payload;
        },
        updateAttendance: (state, action) => {
            const {currentDate, currentSession, studentIndex, periodIndex, value} = action.payload;
            const student = state.sessionsByDate[currentDate][currentSession][studentIndex];
            console.log("=>(AttendanceSlice.js:132) student", student);
            student.periods[periodIndex] = value;
        },
        updateAllAttendance: (state, action) => {
            const {currentDate, currentSession, value} = action.payload;
            const students = state.sessionsByDate[currentDate][currentSession];
            console.log("=>(AttendanceSlice.js:140) students", students);
            students.map((student) => {
                student.periods.fill(value);
            });
        },
        recordChangedAttendance: (state, action) => {
            if (!state.changedData) {
                state.changedData = [];
            }
            state.changedData.push(action.payload);
        },
        clearChangedData: (state) => {
            state.changedData = [];
        },
    },
});

export const {updateAllAttendance, updateDate, updateSession} = attendanceSlice.actions;

export const updateAttendance = (payload) => (dispatch) => {
    dispatch(attendanceSlice.actions.updateAttendance(payload));
    dispatch(attendanceSlice.actions.recordChangedAttendance(payload));
};

export default attendanceSlice.reducer;

export const getChangedData = (state) => state.attendance.changedData;
export const getCurrentDate = (state) => state.attendance.currentDate;
export const getCurrentSession = (state) => state.attendance.currentSession;
export const getData = (state) => state.attendance.sessionsByDate;
export const selectStudentsBySession = (state) => {
    const {currentDate, currentSession, sessionsByDate} = state.attendance;
    return sessionsByDate[currentDate]?.[currentSession];
};

// Redux Thunk를 사용하여 비동기 작업 수행
export const submitAttendanceChanges = createAsyncThunk(
    'attendance/submitChanges',
    async (_, {getState, dispatch}) => {
        const state = getState();
        const changedData = state.attendance.changedData;

        // API 요청을 통해 변경된 데이터 제출
        await axios.post('/api/attendance/update', {data: changedData});

        // 변경된 데이터를 초기화
        dispatch(clearChangedData());
    }
);