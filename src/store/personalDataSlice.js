import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playerName: null,
  courseName: null,
  totalDays: null,
  statusCount: {
    partiallyPresent: 0,
    present: 0,
    absent: 0,
    onVacation: 0,
    officiallyExcused: 0,
    notEntered: 0,
  },
};

const personalDataSlice = createSlice({
  name: "personalData",
  initialState,
  reducers: {
    setPersonalData: (state, { payload }) => {
      state.playerName = payload.playerName;
      state.courseName = payload.courseName || "과정명_회차";
      state.totalDays = payload.totalDays;
      state.statusCount = payload.statusCount;
    },
    removePersonalData: (state) => {
      state.selectedPeriod = initialState.selectedPeriod;
      state.playerName = initialState.playerName;
      state.courseName = initialState.courseName;
      state.attendanceData = initialState.attendanceData;
    },
    setSelectedPeriod: (state, { payload }) => {},
  },
});

export const { setPersonalData, removePersonalData } =
  personalDataSlice.actions;
export const getPersonalData = (state) => state.personalData;
export default personalDataSlice.reducer;
