import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import createSagaMidleware from 'redux-saga';
import rootSaga from './rootSaga';
import authSlice from 'features/auth/authSlice';
import dashboardSlice from 'features/dashboard/dashboardSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'utils';

const sagaMidleware = createSagaMidleware();

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authSlice,
  router: connectRouter(history),
  dashboard: dashboardSlice,
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
