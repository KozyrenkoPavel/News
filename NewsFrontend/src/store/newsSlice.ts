import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TNews } from '../types/typesNews';
import { getNews } from '../api/newsApi';
import { RootState } from '.';

export type TInitialState = {
  news: TNews[];
  styleAddedNewsDisplay: { display: string };
};

const initialState: TInitialState = {
  news: [],
  styleAddedNewsDisplay: { display: 'none' },
};

export const selectNewsList = (state: RootState) => state.storeNews.news;
export const selectStyleAddedNewsDisplay = (state: RootState) =>
  state.storeNews.styleAddedNewsDisplay;

export const fetchGetNews = createAsyncThunk(
  'newsList/fetchGetNews',
  async () => {
    const response = await getNews();

    return response;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setStyleAddedNewsDisplay: (state, action) => {
      state.styleAddedNewsDisplay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});

export const { setStyleAddedNewsDisplay } = newsSlice.actions;

export default newsSlice.reducer;
