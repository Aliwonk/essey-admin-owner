const { createAsyncThunk } = require('@reduxjs/toolkit');
const { DEFAUTL_BACKEND_API } = require('config');

export const fetchCompanyInf = createAsyncThunk('company/fetchCompanyInf', async (id) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.COMPANY.GET_INF}/${id}`);
  const data = respose.json();
  return data;
});

export const fetchCompanyUpdate = createAsyncThunk('company/fetchCompanyUpdate', async ({ shopId, token, data }) => {
  console.log(token);
  const respose = await fetch(`${DEFAUTL_BACKEND_API.COMPANY.UPDATE}/${shopId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  const resJson = respose.json();
  return resJson;
});

export const fetchChangeActiveCompany = createAsyncThunk('company/fetchChangeActiveCompany', async ({ shopId, active, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.COMPANY.UPDATE_ACTIVE}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shopId,
      active,
    }),
  });
  const data = respose.json();
  return data;
});

export const fetchChangeActivePlansCompany = createAsyncThunk('company/fetchChangeActivePlansCompany', async ({ shopId, active, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.COMPANY.UPDATE_ACTIVE_PLANS}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shopId,
      active,
    }),
  });
  const data = respose.json();
  return data;
});
