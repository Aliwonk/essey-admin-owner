import { fetchGetOrder, fetchOrdersCompany, fetchUpdateOrder } from './async';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isError: null,
  isLoading: false,
  isUpdate: false,
  orders: [],
  order: {},
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // UPDATE ORDER

    builder
      .addCase(fetchUpdateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateOrder.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.isUpdate = true;
        // state.order = aciton.payload;
      })
      .addCase(fetchUpdateOrder.rejected, (state) => {
        state.isLoading = false;
        state.isUpdate = false;
      });

    // GET ONE ORDER

    builder
      .addCase(fetchGetOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetOrder.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.order = aciton.payload;
      })
      .addCase(fetchGetOrder.rejected, (state) => {
        state.isLoading = false;
      });

    // GET ORDERS COMPANY

    builder
      .addCase(fetchOrdersCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersCompany.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.orders = aciton.payload;
      })
      .addCase(fetchOrdersCompany.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
