import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models';
import { RootState } from '../../app/store';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CounterState {
  isLogged: boolean;
  logging: boolean;
  currentUser?: User;
  error: any;
}

const initialState: CounterState = {
  isLogged: false,
  logging: false,
  currentUser: undefined,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.currentUser = action.payload;
      state.isLogged = true;
    },
    loginFailure(state, action: PayloadAction<any>) {
      state.logging = false;
      state.error = action.payload;
    },

    logout(state) {
      state.isLogged = false;
      state.currentUser = undefined;
    },
  },
});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
