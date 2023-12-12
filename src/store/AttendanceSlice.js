import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {axiosPrivate} from '../api/axiosInstance';


// Redux Thunk를 사용하여 비동기 작업 수행
export const fetchAllAttendance = createAsyncThunk(
    'attendance/fetchAll',
    async () => {
        try {
            const response = await axiosPrivate.get('/api/dummyData');
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // 에러를 다시 던져서 처리할 수 있도록 합니다.
        }
    }
);


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
    changedData: {},
    sessionsByDate: {}
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
            student.periods[periodIndex] = value;

            const changeKey = `${currentDate}-${currentSession}-${studentIndex}-${periodIndex}`;
            state.changedData[changeKey] = {currentDate, currentSession, studentIndex, periodIndex, value};
        },

        updateAllAttendance: (state, action) => {
            const { currentDate, currentSession, value } = action.payload;
            const students = state.sessionsByDate[currentDate][currentSession];

            students.forEach((student, studentIndex) => {
                student.periods.forEach((_, periodIndex) => {
                    const changeKey = `${currentDate}-${currentSession}-${studentIndex}-${periodIndex}`;

                    // 변경 사항만 업데이트
                    if (student.periods[periodIndex] !== value) {
                        student.periods[periodIndex] = value;
                        state.changedData[changeKey] = { currentDate, currentSession, studentIndex, periodIndex, value };
                    }
                });
            });
        },

        clearChangedData: (state) => {
            state.changedData = [];
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchAllAttendance.fulfilled, (state, action) => {
            // 데이터 로딩 성공 시 상태 업데이트
            state.sessionsByDate = action.payload;
        });
        builder.addCase(submitAttendanceChanges.fulfilled, (state) => {
            // 변경 사항 제출 성공 시 상태 업데이트
            state.changedData = [];
        });
    }
});

export const {updateAttendance,updateAllAttendance, updateDate, updateSession} = attendanceSlice.actions;


export default attendanceSlice.reducer;

export const getChangedData = (state) => state.attendance.changedData;
export const getCurrentDate = (state) => state.attendance.currentDate;
export const getCurrentSession = (state) => state.attendance.currentSession;
export const getData = (state) => state.attendance.sessionsByDate;
export const selectStudentsBySession = (state) => {
    const {currentDate, currentSession, sessionsByDate} = state.attendance;
    return sessionsByDate[currentDate]?.[currentSession];
};


export const submitAttendanceChanges = createAsyncThunk(
    'attendance/submitChanges',
    async (_, { getState, dispatch }) => {
        const state = getState();
        const changedData = Object.values(state.attendance.changedData);
        console.log("=>(AttendanceSlice.js:109) changedData", changedData);

        try {
            const response = await axiosPrivate.post('/api/updateAttendance', changedData);
            console.log('Server response:', response.data);

            dispatch(attendanceSlice.actions.clearChangedData());
        } catch (error) {
            console.error('Error submitting data:', error);
            // 에러 처리 로직
        }
    }
);