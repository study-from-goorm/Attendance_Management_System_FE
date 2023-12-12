import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import attendanceReducer from './AttendanceSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducers = combineReducers({
  user: userReducer,
  auth: authReducer,
  attendance: attendanceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  withelist: ['user', 'auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
