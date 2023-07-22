import { fetchAccrueCashack, fetchCreatePlan, fetchGetListPlans } from './async';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isError: null,
  isLoading: false,
  isCreated: false,
  isAccrue: false,
  plans: [],
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET LIST PLANS

    builder
      .addCase(fetchGetListPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetListPlans.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.plans = aciton.payload;
      })
      .addCase(fetchGetListPlans.rejected, (state) => {
        state.isLoading = false;
      });

    // GET LIST PLANS

    builder
      .addCase(fetchCreatePlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreatePlan.fulfilled, (state, aciton) => {
        state.isLoading = false;
      })
      .addCase(fetchCreatePlan.rejected, (state) => {
        state.isLoading = false;
      });

    // ACCRUE CASHBACK ONE CLIENT

    builder
      .addCase(fetchAccrueCashack.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccrueCashack.fulfilled, (state, aciton) => {
        state.isLoading = false;

        if (aciton.payload.statusCode === 200) {
          state.isAccrue = true;
        }
      })
      .addCase(fetchAccrueCashack.rejected, (state) => {
        state.isLoading = false;
        state.isAccrue = false;
      });
  },
});

const plansReducer = plansSlice.reducer;
export default plansReducer;
