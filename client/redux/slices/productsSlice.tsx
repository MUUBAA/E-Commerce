import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById } from "../thunk/product";

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
    pageSize?: number;
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null; // Added selectedProduct property
    loading: boolean;
    totalItems: number;
    error: string | null;
    success: boolean;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null, // Initialize selectedProduct as null
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
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload; // Added reducer to set selectedProduct
        },
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
            });
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                // API response may contain the product under `data` or `Data`, or be the product directly.
                state.selectedProduct = (action.payload && (action.payload.data ?? action.payload.Data)) || action.payload || null;
                state.success = true;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = (action as any).payload?.message || action.error.message || 'Failed to fetch product';
            });
    },
});

export const { clearProductsState, setSelectedProduct } = productsSlice.actions; // Exported setSelectedProduct action
export default productsSlice.reducer;