import counterSaga from 'features/counter/countSaga';
import { all } from '@redux-saga/core/effects';
import authSaga from 'features/auth/authSaga';

export default function* rootSaga() {
  yield all([counterSaga(), authSaga()]);
}
