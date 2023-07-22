import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAUTL_BACKEND_API } from 'config';

export const fetchGetListPlans = createAsyncThunk('plans/fetchGetListPlans', async ({ shopId, token }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.BONUS_PLAN.GET_LIST}/${shopId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchCreatePlan = createAsyncThunk('plans/fetchCreatePlan', async ({ shopId, token, data }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.BONUS_PLAN.CREATE}/${shopId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchAccrueCashack = createAsyncThunk('plans/fetchAccrueCashack', async ({ client, token, data }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.BONUS_PLAN.ACCRUE_ONE}/${client}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJSON = response.json();
  return resJSON;
});
