import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";


export const store = configureStore({
    reducer: {
        Products : productReducer,
    },
    preloadedState:{
    },
})

export default store;