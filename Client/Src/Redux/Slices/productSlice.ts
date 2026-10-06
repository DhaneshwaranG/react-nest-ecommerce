import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
    selectedProductId: number | null;
}

const initialState: ProductState = {
    selectedProductId: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {}
});

export default productSlice.reducer;
