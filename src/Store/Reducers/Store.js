import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";

const user = localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth"))
            : null;

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []; 

const initialState = {
    carts : {cart:cartItems},
    auth: {user:user},
}

export const store = configureStore({
    reducer: {
        Products : productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
    },
    preloadedState:initialState,
})

export default store;