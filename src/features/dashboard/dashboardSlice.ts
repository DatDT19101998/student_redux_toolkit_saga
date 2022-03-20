import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';
import { RootState } from '../../app/store';

export interface DashboardStatistics {
  maleCount?: number;
  femaleCount?: number;
  highMarkCount?: number;
  lowMarkCount?: number;
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}

export interface dashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: dashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetDataDashboard: (state) => {
      state.loading = true;
    },
    fetDataDashboardSuccess: (state) => {
      state.loading = false;
    },
    fetDataDashboardFailure: (state) => {
      state.loading = false;
    },

    //set state after call api
    setStatistics: (state, action: PayloadAction<DashboardStatistics>) => {
      state.statistics = action.payload;
    },
    setHighestStudentList: (state, action: PayloadAction<Student[]>) => {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList: (state, action: PayloadAction<Student[]>) => {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList: (state, action: PayloadAction<RankingByCity[]>) => {
      state.rankingByCityList = action.payload;
    },
  },
});

export const {
  fetDataDashboard,
  fetDataDashboardSuccess,
  fetDataDashboardFailure,
  setStatistics,
  setHighestStudentList,
  setLowestStudentList,
  setRankingByCityList,
} = dashboardSlice.actions;

export const dashboardSelector = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
