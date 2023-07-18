import { createAsyncThunk } from '@reduxjs/toolkit';
import { DEFAUTL_BACKEND_API } from 'config';

export const fetchCreateProduct = createAsyncThunk('products/fetchCreateProduct', async ({ shopId, token, data }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.PRODUCT.CREATE}/${shopId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchGetListProducts = createAsyncThunk('products/fetchGetListProducts', async ({ shopId, token }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.PRODUCT.GET_LIST}/${shopId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchGetProduct = createAsyncThunk('products/fetchGetProduct', async ({ productId, token }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.PRODUCT.GET_ONE}/${productId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchUpdateProduct = createAsyncThunk('products/fetchUpdateProduct', async ({ productId, token, data }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.PRODUCT.UPDATE}/${productId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const resJSON = response.json();
  return resJSON;
});

export const fetchDeleteProduct = createAsyncThunk('products/fetchDeleteProduct', async ({ productId, token }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.PRODUCT.DELETE}/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resJSON = response.json();
  return resJSON;
});
