import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_USER, IS_DEMO } from 'config.js';
import { getCookie } from 'utils/getData';
import { fetchCompanyRegister, fetchConfirmEmail, fetchCreateNewPass, fetchLoginOwner, fetchProfileOwner, fetchRegisterOwner, fetchResetPass } from './async';

const initialState = {
  isLoading: {
    profile: false,
    login: false,
    register: false,
    confirmEmail: false,
    resetPassword: false,
    createNewPassword: false,
    createCompany: false,
  },
  isError: {
    register: null,
    confirmEmail: null,
    createNewPassword: null,
  },
  isProfile: false,
  isLogin: !(getCookie('token') === 'undefined' || !getCookie('token')),
  isConfirmEmail: false,
  isSendForgotPass: false,
  isCreateNewPass: false,
  isCreateCompany: false,
  currentUser: {},
  user: getCookie('token')
    ? {
        id: getCookie('idUser'),
        token: getCookie('token'),
        role: getCookie('role'),
      }
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser(state, action) {
      // eslint-disable-next-line radix
      const expiresToken = parseInt(action.payload.expiresInToken);
      document.cookie = `idUser=${action.payload.id}; max-age=${expiresToken}`;
      document.cookie = `token=${action.payload.token}; max-age=${expiresToken}`;
      document.cookie = `role=${action.payload.role}; max-age=${expiresToken}`;
    },
    exiteUser() {
      document.cookie = `idUser=; max-age=0`;
      document.cookie = `token=; max-age=0`;
      document.cookie = `role=; max-age=0`;
    },
  },
  extraReducers: (builder) => {
    // GET PROFILE

    builder
      .addCase(fetchProfileOwner.pending, (state) => {
        state.isLoading.profile = true;
      })
      .addCase(fetchProfileOwner.fulfilled, (state, action) => {
        state.isLoading.profile = false;
        state.currentUser = action.payload;
        state.isProfile = true;
      })
      .addCase(fetchProfileOwner.rejected, (state) => {
        state.isLoading.profile = false;
      });

    // LOGIN

    builder
      .addCase(fetchLoginOwner.pending, (state) => {
        state.isLoading.login = true;
      })
      .addCase(fetchLoginOwner.fulfilled, (state, action) => {
        state.isLoading.login = false;
        state.currentUser = action.payload;
        state.isLogin = true;
      })
      .addCase(fetchLoginOwner.rejected, (state) => {
        state.isLoading.login = false;
      });

    // REGISTRATION

    builder
      .addCase(fetchRegisterOwner.pending, (state) => {
        state.isLoading.register = true;
      })
      .addCase(fetchRegisterOwner.fulfilled, (state, action) => {
        state.isLoading.register = false;
        state.isConfirmEmail = true;
        state.isLogin = true;

        if (action.payload.statusCode === 400) {
          if (action.payload.message === 'Owner with this phone already exist') {
            state.isError.register = {
              message: 'Аккаунт с таким номером телефона существует',
            };
          } else if (action.payload.message === 'Owner with this email already exist') {
            state.isError.register = {
              message: 'Аккаунт с таким email существует',
            };
          }
          state.isConfirmEmail = false;
          state.isLoading.register = false;
        }
      })
      .addCase(fetchRegisterOwner.rejected, (state, action) => {
        state.isLoading.register = false;
        state.isConfirmEmail = false;
        state.isError.register = action.payload;
      });

    // EMAIL CONFIRMATION

    builder
      .addCase(fetchConfirmEmail.pending, (state) => {
        state.isLoading.confirmEmail = true;
      })
      .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
        state.isLoading.confirmEmail = false;
        state.isConfirmEmail = true;
        state.isLogin = true;
        state.currentUser = action.payload;

        if (action.payload.statusCode === 400) {
          state.isError.confirmEmail = {
            message: 'Ошибка потдверждения почты',
          };
          state.isConfirmEmail = false;
          state.isLogin = false;
        }
      })
      .addCase(fetchConfirmEmail.rejected, (state, action) => {
        state.isLoading.confirmEmail = false;
        state.isError.confirmEmail = action.payload;
      });

    // SEND LINK FORGOT PASSWORD

    builder
      .addCase(fetchResetPass.pending, (state) => {
        state.isLoading.resetPassword = true;
      })
      .addCase(fetchResetPass.fulfilled, (state, action) => {
        state.isLoading.resetPassword = false;
        if (action.payload.statusCode === 200) {
          state.isSendForgotPass = true;
        }
      })
      .addCase(fetchResetPass.rejected, (state, action) => {
        state.isLoading.resetPassword = false;
      });

    // CREATE NEW PASSWORD

    builder
      .addCase(fetchCreateNewPass.pending, (state) => {
        state.isLoading.createNewPassword = true;
      })
      .addCase(fetchCreateNewPass.fulfilled, (state, action) => {
        state.isLoading.createNewPassword = false;

        if (action.payload.statusCode === 200) {
          state.isCreateNewPass = true;
        }

        if (action.payload.statusCode === 404) {
          state.isError.createNewPassword = {
            message: 'Ошибка потдверждения почты',
          };
          state.isCreateNewPass = false;
        }
      })
      .addCase(fetchCreateNewPass.rejected, (state) => {
        state.isLoading.createNewPassword = false;
        state.isCreateNewPass = false;
      });

    // CREATE COMPANY

    builder
      .addCase(fetchCompanyRegister.pending, (state) => {
        state.isLoading.createCompany = true;
      })
      .addCase(fetchCompanyRegister.fulfilled, (state, action) => {
        state.isLoading.createCompany = false;

        if (action.payload.statusCode === 201) {
          state.isCreateCompany = true;
        }
      })
      .addCase(fetchCompanyRegister.rejected, (state) => {
        state.isLoading.createCompany = false;
        state.isCreateCompany = false;
      });
  },
});

export const { setCurrentUser, saveUser, exiteUser } = authSlice.actions;
const authReducer = authSlice.reducer;

export default authReducer;
