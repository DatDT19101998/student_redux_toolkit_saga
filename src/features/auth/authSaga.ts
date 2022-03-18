import { take, fork, call, delay, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { AUTHEN_KEY } from '../../constants';
import { login, LoginPayload, loginSuccess, logout, loginFailure } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    console.log('handleLogin', payload);

    //call api
    yield delay(1000);

    localStorage.setItem(AUTHEN_KEY, 'fake token');

    yield put(
      loginSuccess({
        id: 1,
        name: 'DatDT',
      })
    );

    //redirect admin
    yield put(push('/admin/dashboard'));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

function* handleLogout() {
  yield delay(1000);

  console.log('handleLogout');
  localStorage.removeItem(AUTHEN_KEY);

  //redirect login
  yield put(push('/login'));
}

function* watchAuthFlow() {
  while (true) {
    const isLogged = localStorage.getItem(AUTHEN_KEY);

    if (!isLogged) {
      console.log(' watch  isLogged');
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchAuthFlow);
}
