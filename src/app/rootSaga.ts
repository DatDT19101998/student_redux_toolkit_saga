import counterSaga from 'features/counter/countSaga';
import { all } from '@redux-saga/core/effects';

function* helloSaga() {
  console.log('Hello Saga');
}

export default function* rootSaga() {
  yield all([helloSaga(), counterSaga()]);
}
