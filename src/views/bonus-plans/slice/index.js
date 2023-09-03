import { fetchAccrueCashack, fetchCreatePlan, fetchGetListPlans, fetchUpdatePlan, fetchWriteOffCashack } from './async';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isError: null,
  isLoading: {
    writeOff: false,
    accrue: false,
    plans: false,
    plan_update: false,
  },
  isCreated: false,
  isUpdate: false,
  isAccrue: null,
  isWriteOff: null,
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
        state.isLoading.plans = true;
      })
      .addCase(fetchGetListPlans.fulfilled, (state, aciton) => {
        state.isLoading.plans = false;
        state.plans = aciton.payload;
      })
      .addCase(fetchGetListPlans.rejected, (state) => {
        state.isLoading.plans = false;
      });

    // CREATE PLAN

    builder
      .addCase(fetchCreatePlan.pending, (state) => {
        state.isLoading.plans = true;
      })
      .addCase(fetchCreatePlan.fulfilled, (state, aciton) => {
        state.isLoading.plans = false;
      })
      .addCase(fetchCreatePlan.rejected, (state) => {
        state.isLoading.plans = false;
      });

    // UPDATE PLAN

    builder
      .addCase(fetchUpdatePlan.pending, (state) => {
        state.isLoading.plan_update = true;
      })
      .addCase(fetchUpdatePlan.fulfilled, (state, aciton) => {
        state.isLoading.plan_update = false;
      })
      .addCase(fetchUpdatePlan.rejected, (state) => {
        state.isLoading.plan_update = false;
      });

    // ACCRUE CASHBACK ONE CLIENT

    builder
      .addCase(fetchAccrueCashack.pending, (state) => {
        state.isLoading.accrue = true;
      })
      .addCase(fetchAccrueCashack.fulfilled, (state, aciton) => {
        state.isLoading.accrue = false;

        if (aciton.payload.statusCode === 200) {
          state.isAccrue = true;
        }
      })
      .addCase(fetchAccrueCashack.rejected, (state) => {
        state.isLoading.accrue = false;
        state.isAccrue = false;
      });

    // WRITE-OFF CASHBACK ONE CLIENT

    builder
      .addCase(fetchWriteOffCashack.pending, (state) => {
        state.isLoading.writeOff = true;
      })
      .addCase(fetchWriteOffCashack.fulfilled, (state, aciton) => {
        state.isLoading.writeOff = false;

        if (aciton.payload.statusCode === 200) {
          state.isWriteOff = true;
        }
      })
      .addCase(fetchWriteOffCashack.rejected, (state) => {
        state.isLoading.writeOff = false;
        state.isWriteOff = false;
      });
  },
});

const plansReducer = plansSlice.reducer;
export default plansReducer;
