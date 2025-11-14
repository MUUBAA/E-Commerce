import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../thunk/product";

export interface Product {
    id: number;
    itemName: string;
    itemDescription: string;
    itemPrice: number;
    categoryId: number;
    categoryName: string;
    stockQuantity: number;
    itemUrl: string;
    createdAt: string;
    createdBy: string | null;
    updatedAt: string | null;
    updatedBy: string | null;
    isDeleted: boolean;
    deletedAt: string | null;
    deletedBy: string | null;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    totalItems: number;
    error: string | null;
    success: boolean;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    totalItems: 0,
    error: null,
    success: false,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductsState: (state) => {
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.success = true;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            })
    },
});

export const { clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;