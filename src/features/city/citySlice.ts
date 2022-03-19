import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

//interface
export interface CityState {
  loading: boolean;
  list: City[];
}

//initalize
const initialState: CityState = { loading: false, list: [] };

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },

    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },

    fetchCityListFailure(state) {
      state.loading = false;
    },
  },
});

//Actions
export const { fetchCityList, fetchCityListSuccess, fetchCityListFailure } = citySlice.actions;

// Selector
export const cityListSelector = (state: RootState) => state.city.list;

export const cityMapSelector = createDraftSafeSelector(cityListSelector, (cityList) => {
  return cityList.reduce((map: { [key: string]: City }, city: City) => {
    map[city.code] = city;

    return map;
  }, {});
});

//Reducer

export default citySlice.reducer;
