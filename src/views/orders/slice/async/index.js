const { createAsyncThunk } = require('@reduxjs/toolkit');
const { DEFAUTL_BACKEND_API } = require('config');

export const fetchOrdersCompany = createAsyncThunk('orders/fetchCompanyInf', async (id) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.ORDERS.GET_LIST}/${id}`);
  const data = respose.json();
  return data;
});

export const fetchGetOrder = createAsyncThunk('orders/fetchGetOrder', async ({ id, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.ORDERS.GET_ONE}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = respose.json();
  return data;
});

export const fetchUpdateOrder = createAsyncThunk('orders/fetchUpdateOrder', async ({ id, status, token, comment }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.ORDERS.UPDATE}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idOrder: id,
      status,
      comment,
    }),
  });
  const data = respose.json();
  return data;
});
