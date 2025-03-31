import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TNews } from "../types/typesNews";
import { getNews } from "../api/newsApi";
import { RootState } from ".";

export type TInitialState = {
  news: TNews[];
  isOpenAddNews: boolean;
  isOpenChangeNews: boolean;
};

const initialState: TInitialState = {
  news: [],
  isOpenAddNews: false,
  isOpenChangeNews: false,
};

export const selectNewsList = (state: RootState) => state.storeNews.news;
export const selectIsOpenAddNews = (state: RootState) =>
  state.storeNews.isOpenAddNews;
export const selectIsOpenChangeNews = (state: RootState) =>
  state.storeNews.isOpenChangeNews;

export const fetchGetNews = createAsyncThunk(
  "newsList/fetchGetNews",
  async () => {
    const response = await getNews();

    return response;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    setIsOpenAddNews: (state, action) => {
      state.isOpenAddNews = action.payload;
    },
    setIsOpenChangeNews: (state, action) => {
      state.isOpenChangeNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});

export const { setIsOpenAddNews, setIsOpenChangeNews } = newsSlice.actions;

export default newsSlice.reducer;
