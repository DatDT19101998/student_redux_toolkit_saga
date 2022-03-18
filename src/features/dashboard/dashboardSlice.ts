import { createSlice } from '@reduxjs/toolkit';
import { Student } from 'models';
import { RootState } from '../../app/store';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: string;
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
  statistics: { maleCount: 0, femaleCount: 0, highMarkCount: 0, lowMarkCount: 0 },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetDataDashboard: (state, action) => {},
    fetDataDashboardSuccess: (state, action) => {},
    fetDataDashboardFailure: (state, action) => {},
  },
});

export const {} = dashboardSlice.actions;

export const dashboardSelector = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
