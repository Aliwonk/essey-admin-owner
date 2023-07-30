import { fetchChangeActiveCompany, fetchChangeActivePlansCompany, fetchCompanyInf, fetchCompanyUpdate } from './async';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isError: null,
  isLoading: {
    update: false,
    get: true,
    update_active: false,
    update_active_plans: false,
  },
  company: {},
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET INFORMATION COMPANY

    builder
      .addCase(fetchCompanyInf.pending, (state) => {
        state.isLoading.get = true;
      })
      .addCase(fetchCompanyInf.fulfilled, (state, aciton) => {
        state.isLoading.get = false;
        state.company = aciton.payload;
      })
      .addCase(fetchCompanyInf.rejected, (state) => {
        state.isLoading.get = false;
      });

    // UPDATE COMPANY

    builder
      .addCase(fetchCompanyUpdate.pending, (state) => {
        state.isLoading.update = true;
      })
      .addCase(fetchCompanyUpdate.fulfilled, (state, aciton) => {
        state.isLoading.update = false;
      })
      .addCase(fetchCompanyUpdate.rejected, (state) => {
        state.isLoading.update = false;
      });

    // UPDATE ACTIVE

    builder
      .addCase(fetchChangeActiveCompany.pending, (state) => {
        state.isLoading.update_active = true;
      })
      .addCase(fetchChangeActiveCompany.fulfilled, (state, aciton) => {
        state.isLoading.update_active = false;
        // state.company = aciton.payload;
      })
      .addCase(fetchChangeActiveCompany.rejected, (state) => {
        state.isLoading.update_active = false;
      });

    // UPDATE ACTIVE PLANS

    builder
      .addCase(fetchChangeActivePlansCompany.pending, (state) => {
        state.isLoading.update_active_plans = true;
      })
      .addCase(fetchChangeActivePlansCompany.fulfilled, (state, aciton) => {
        state.isLoading.update_active_plans = false
      })
      .addCase(fetchChangeActivePlansCompany.rejected, (state) => {
        state.isLoading.update_active_plans = false;
      });
  },
});

const companyReducer = companySlice.reducer;
export default companyReducer;
