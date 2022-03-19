import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authSlice from 'features/auth/authSlice';
import citySlice from 'features/city/citySlice';
import dashboardSlice from 'features/dashboard/dashboardSlice';
import studentSlice from 'features/students/studentSlice';
import createSagaMidleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

const sagaMidleware = createSagaMidleware();

const rootReducer = combineReducers({
  auth: authSlice,
  router: connectRouter(history),
  dashboard: dashboardSlice,
  student: studentSlice,
  city: citySlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMidleware, routerMiddleware(history)),
});
sagaMidleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
