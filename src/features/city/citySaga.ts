import { put, takeLatest, call } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import {
  fetchCityList,
  fetchCityListFailure,
  fetchCityListSuccess,
} from './citySlice';

function* fetchCityListSaga() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);

    yield put(fetchCityListSuccess(response));
  } catch (error) {
    yield put(fetchCityListFailure());
  }
}

export default function* citySaga() {
  yield takeLatest(fetchCityList.type, fetchCityListSaga);
}
