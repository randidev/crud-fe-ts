import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProductList } from "../type/product";

interface IInitialState {
  data: IProductList;
  lastUpdated: Date;
}

const initialState: IInitialState = {
  data: [],
  lastUpdated: new Date(),
};

export const Product = createSlice({
  name: "product",
  initialState,
  reducers: {
    replace: (state, action: PayloadAction<IProductList>) => {
      state.data = action.payload;
      state.lastUpdated = new Date();
    },
  },
});

// Action creators are generated for each case reducer function
export const { replace } = Product.actions;

export default Product.reducer;
