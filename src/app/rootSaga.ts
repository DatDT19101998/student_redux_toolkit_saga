import counterSaga from 'features/counter/countSaga';
import { all } from '@redux-saga/core/effects';

export default function* rootSaga() {
  yield all([counterSaga()]);
}
