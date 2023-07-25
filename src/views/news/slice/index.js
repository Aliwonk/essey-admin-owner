const { createSlice } = require('@reduxjs/toolkit');
const { fetchListNews, fetchNews } = require('./async');

const initialState = {
  isError: null,
  isLoading: false,
  listNews: [],
  news: {},
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ONE NEWS

    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.news = aciton.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
      });

    // GET LIST NEWS

    builder
      .addCase(fetchListNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListNews.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.listNews = aciton.payload;
      })
      .addCase(fetchListNews.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const newsReducer = newsSlice.reducer;
export default newsReducer;
