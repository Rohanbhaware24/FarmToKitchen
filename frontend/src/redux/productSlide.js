import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Item already in Cart");
      } else {
        toast("Item added successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      toast("One item deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        let qty = state.cartItem[index].qty;
        qty++; // Correctly increment the quantity
        state.cartItem[index].qty = qty;

        const price = state.cartItem[index].price;
        const total = price * qty; // Recalculate total price
        state.cartItem[index].total = total;
      }
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        let qty = state.cartItem[index].qty;
        if (qty > 1) {
          qty--; // Correctly decrement the quantity
          state.cartItem[index].qty = qty;

          const price = state.cartItem[index].price;
          const total = price * qty; // Recalculate total price
          state.cartItem[index].total = total;
        }
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
