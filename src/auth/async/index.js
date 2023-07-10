import { DEFAUTL_BACKEND_API } from 'config';

const { createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProfileOwner = createAsyncThunk('auth/fetchProfileOwner', async (token) => {
  const response = await fetch(DEFAUTL_BACKEND_API.OWNER_PROFILE, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const resJSON = await response.json();
  return resJSON;
});

export const fetchLoginOwner = createAsyncThunk('auth/fetchLoginOwner', async (data) => {
  const response = await fetch(DEFAUTL_BACKEND_API.OWNER_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJSON = await response.json();
  return resJSON;
});

export const fetchRegisterOwner = createAsyncThunk('auth/fetchRegisterOwner', async (data) => {
  const response = await fetch(DEFAUTL_BACKEND_API.OWNER_REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const resJSON = await response.json();
  return resJSON;
});

export const fetchConfirmEmail = createAsyncThunk('auth/fetchConfirmEmail', async (token) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.EMAIL_CONFIRM}/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resJSON = await response.json();
  return resJSON;
});

export const fetchResetPass = createAsyncThunk('auth/fetchResetPass', async (email) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.RESET_PASSWORD}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email),
  });

  const resJSON = await response.json();
  return resJSON;
});

export const fetchCreateNewPass = createAsyncThunk('auth/fetchCreateNewPass', async ({ token, password }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.CREATE_NEW_PASSWORD}/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const resJSON = await response.json();
  return resJSON;
});

export const fetchCompanyRegister = createAsyncThunk('auth/fetchCompanyRegister', async ({ data, token }) => {
  const response = await fetch(`${DEFAUTL_BACKEND_API.CREATE_COMPANY}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  const resJSON = await response.json();
  return resJSON;
});
