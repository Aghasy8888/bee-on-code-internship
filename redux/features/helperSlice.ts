// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { FEMALE } from '@/constants';

interface IHelperState {
  gender: string;
}

// Initial state
const initialState: IHelperState = {
  gender: FEMALE,
};

const helperSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    setGender(state, { payload }) {
      state.gender = payload;
    },
  },
});

export const { setGender } = helperSlice.actions;

export const selectGender = (state: RootState) =>
  state.helperSlice.gender;

export default helperSlice.reducer;
