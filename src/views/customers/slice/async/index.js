import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAUTL_BACKEND_API } from 'config';

export const fetchCompanyClients = createAsyncThunk('clients/fetchCompanyClients', async ({ id, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.COMPANY.GET_CLIENTS}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = respose.json();
  return data;
});

export const fetchInfClient = createAsyncThunk('clients/fetchInfClient', async ({ id, token }) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.CUSTOMERS.GET_INF_CUSTOMER}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = respose.json();
  return data;
});

export const fetchOrdersClient = createAsyncThunk('clients/fetchOrdersClient', async (id) => {
  const respose = await fetch(`${DEFAUTL_BACKEND_API.CUSTOMERS.GET_ORDERS_CUSTOMER}/${id}`, {
    method: 'GET',
    headers: {
      // Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = respose.json();
  return data;
});
