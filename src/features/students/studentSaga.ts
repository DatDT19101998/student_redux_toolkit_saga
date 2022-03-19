import { call, put, takeLatest, debounce } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import {
  fetchStudentList,
  fetchStudentListFailure,
  fetchStudentListSuccess,
  setFilterDebound,
  setFilter,
} from './studentSlice';

function* fetchStudentListSaga(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);

    yield put(fetchStudentListSuccess(response));
  } catch (error) {
    yield put(fetchStudentListFailure());
  }
}

function* handleSearchDebouce(action: PayloadAction<ListParams>) {
  yield put(setFilter(action.payload));
}

export default function* studentSaga() {
  yield takeLatest(fetchStudentList.type, fetchStudentListSaga);

  yield debounce(500, setFilterDebound.type, handleSearchDebouce);
}
