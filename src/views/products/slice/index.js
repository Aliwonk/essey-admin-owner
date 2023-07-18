import { fetchCreateProduct, fetchDeleteProduct, fetchGetListProducts, fetchGetProduct, fetchUpdateProduct } from './async';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  isError: null,
  isLoading: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  isUpdate: false,
  isCreated: false,
  isDelete: false,
  products: [],
  product: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE NEW PRODUCT

    builder
      .addCase(fetchCreateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateProduct.fulfilled, (state, aciton) => {
        state.isCreated = true;
        state.isLoading = false;
      })
      .addCase(fetchCreateProduct.rejected, (state) => {
        state.isLoading = false;
      });

    // GET LIST PRODUCTS

    builder
      .addCase(fetchGetListProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetListProducts.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.products = aciton.payload;
      })
      .addCase(fetchGetListProducts.rejected, (state) => {
        state.isLoading = false;
      });

    // GET ONE

    builder
      .addCase(fetchGetProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetProduct.fulfilled, (state, aciton) => {
        state.isLoading = false;
        state.product = aciton.payload;
      })
      .addCase(fetchGetProduct.rejected, (state) => {
        state.isLoading = false;
      });

    // UPDATE

    builder
      .addCase(fetchUpdateProduct.pending, (state) => {
        state.isLoadingUpdate = true;
      })
      .addCase(fetchUpdateProduct.fulfilled, (state, aciton) => {
        state.isLoadingUpdate = false;
        state.isUpdate = true;
      })
      .addCase(fetchUpdateProduct.rejected, (state) => {
        state.isLoadingUpdate = false;
      });

    // DELETE

    builder
      .addCase(fetchDeleteProduct.pending, (state) => {
        state.isLoadingDelete = true;
      })
      .addCase(fetchDeleteProduct.fulfilled, (state, aciton) => {
        state.isLoadingDelete = false;
        state.isDelete = true;
      })
      .addCase(fetchDeleteProduct.rejected, (state) => {
        state.isLoadingDelete = false;
      });
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
