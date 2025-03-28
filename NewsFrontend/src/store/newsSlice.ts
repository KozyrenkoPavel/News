import { createSlice } from '@reduxjs/toolkit';
import { TNew } from '../types/typesNews';

export type TInitialState = {
  news: TNew[];
};

const initialState: TInitialState = {
  news: [],
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setNewsList: (state, action) => {
      state.news = action.payload;
    },
  },
});

export const { setNewsList } = newsSlice.actions;

export default newsSlice.reducer;
