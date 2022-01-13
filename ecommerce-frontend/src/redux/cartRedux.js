import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products:null,
    },
    reducers:{
        addProduct:(state, action) => {
            state.products = action.payload
        },
        // local clear when logout
        clearProduct:(state) => {
            state.products = null;
        }
    }
});

export const {addProduct, clearProduct} = cartSlice.actions;
export default cartSlice.reducer;