/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import api from "../../Api/Api.js"

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" })
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type:"FETCH_PRODUCTS",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage
        })
        dispatch({ type: "IS_SUCCESS" })
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch Products",
        })
        
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "CATEGORY_LOADER" })
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type:"FETCH_CATEGORIES",
            payload:data.content
        })
        dispatch({ type: "CATEGORY_SUCCESS" })
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch Categories",
        })
        
    }
}

export const addToCart = (data, qty = 1,toast) => 
    (dispatch, getState) => {
        // find the product
        const { products } = getState().Products;
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );
        // check the stocks
        const isQuantityExist = getProduct.quantity >= qty;
        // if in Stock -> add
        if(isQuantityExist) {
            dispatch({
                type:"ADD_CART",
                payload:{
                    ...data,

                    quantity:qty,
                }
            }) 
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
        } else {

            // if not -> error 
            toast.error(`Out of stock`);
        }
}

export const increaseCartQuantity = 
    (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch,getState) => {
        // find the product
        const { products } = getState().Products;
        console.log(data);
        
        const getProduct = products.find(
            (item) => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;
        
        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);

            dispatch({
                type: "ADD_CART",
                payload: {...data, quantity:newQuantity},
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
        } else {
            toast.error("Quantity Reached To Limit");
        }
    };


export const decreseCartQuantity = 
    (data, newQuantity) => (dispatch,getState) => {
        dispatch({
            type: "ADD_CART",
            payload: {...data, quantity:newQuantity},
            
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
    };

export const removeCartItem = 
    (data, toast) => (dispatch,getState) => {
        dispatch({type:"REMOVE_CART", payload: data});
        toast.success(`${data.productName} Removed From Cart`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

export const autheticateSignInUser = 
(sendData, toast, reset, navigate, setLoader) => 
    async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signin",sendData);
            dispatch({
                type: "LOGIN_USER",
                payload: data,
            });
            localStorage.setItem("auth", JSON.stringify(data));
            reset()
            toast.success("Login Success");
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal Server Error");
        } finally{
            setLoader(false);
        }
}

export const registerNewUser = 
(sendData, toast, reset, navigate, setLoader) => 
    async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup",sendData);
            reset()
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login")
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally{
            setLoader(false);
        }
}

export const logoutUser = (navigate) => (dispatch) => {
    dispatch({
        type:"LOG_OUT",
    });
    localStorage.removeItem("auth");
    navigate("/login");
}

export const addUpdateUserAddress =
(sendData, toast, addressId, setOpen) => async (dispatch, getState) => {
    // const { user } = getState().auth;
    dispatch({type:"BUTTON_LOADER"});
    try {
        const { data } = await api.post("/addresses",sendData);
        toast.success("Address saved sucessfully");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({type:"IS_ERROR", payload:null});
    } finally {
        setOpen(false);
    }
 }