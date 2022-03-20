import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface studentSliceParams {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: studentSliceParams = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: { _page: 1, _limit: 15, _totalRows: 15 },
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailure(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterDebound(state, action: PayloadAction<ListParams>) {},
  },
});

export const {
  fetchStudentList,
  fetchStudentListSuccess,
  fetchStudentListFailure,
  setFilter,
  setFilterDebound,
} = studentSlice.actions;

export const studentSelector = (state: RootState) => state.student;

export default studentSlice.reducer;
