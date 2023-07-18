import { fetchCompanyClients, fetchInfClient, fetchOrdersClient } from './async';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isError: null,
  isLoading: false,
  clients: [],
  client: {},
  clientOrders: [],
};

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET INF CLIENT

    builder
      .addCase(fetchInfClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInfClient.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.client = aciton.payload;
      })
      .addCase(fetchInfClient.rejected, (state) => {
        state.isLoading = false;
      });

    // GET CLIENTS

    builder
      .addCase(fetchCompanyClients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanyClients.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.clients = aciton.payload;
      })
      .addCase(fetchCompanyClients.rejected, (state) => {
        state.isLoading = false;
      });

    // GET CLIENT ORDERS

    builder
      .addCase(fetchOrdersClient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersClient.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.clientOrders = aciton.payload;
      })
      .addCase(fetchOrdersClient.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const clientsReducer = clientSlice.reducer;
export default clientsReducer;
