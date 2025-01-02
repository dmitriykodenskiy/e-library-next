import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

const authorsDataSlice = createSlice({
  name: 'authorsData',
  initialState: {},
  reducers: {
    setAuthorsData(state, action) {
      return action.payload ? action.payload : state;
    },
  },
});

export const initializeAuthorsData = (data: Record<string, unknown>) => {
  return async (dispatch: Dispatch) => {
    dispatch(setAuthorsData(data));
  };
};
export const { setAuthorsData } = authorsDataSlice.actions;
export default authorsDataSlice.reducer;
