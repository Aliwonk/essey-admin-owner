import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAUTL_BACKEND_API } from 'config';

export const fetchCreateNews = createAsyncThunk('products/fetchCreateNews', async ({ shopId, token, data }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.NEWS.CREATE}/${shopId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchListNews = createAsyncThunk('orders/fetchListNews', async ({ id, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.NEWS.GET_LIST}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = respose.json();
  return data;
});

export const fetchNews = createAsyncThunk('orders/fetchNews', async ({ id, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.NEWS.GET_ONE}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = respose.json();
  return data;
});
