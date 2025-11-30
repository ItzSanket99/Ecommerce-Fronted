/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { data } from "react-router-dom";
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
        if (addressId) {
            const { data } = await api.put(`addresses/${addressId}`,sendData);
        } else { 
            const { data } = await api.post("/addresses",sendData);
        }
        toast.success("Address saved sucessfully");
        dispatch({type:"IS_SUCCESS"});
        dispatch(getUserAddresses());
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({type:"IS_ERROR", payload:null});
    } finally {
        setOpen(false);
    }
 }

 export const getUserAddresses = () => async (dispatch) => {
    try {
        dispatch({
            type:"IS_FETCHING",
        })
        const { data } = await api.get("/users/addresses");
        dispatch({
            type: "USER_ADDRESS",
            payload: data,
        })
        dispatch({
            type: "IS_SUCCESS"
        })
    } catch (error) {
        dispatch({
            type: "IS_ERROR",
            payload: "Failed to fetch users address"
        })
    }
 }

 export const selectUserCheckOutAddress = (address) => {
    localStorage.setItem("CHECKOUT_ADDRESS",JSON.stringify(address));
    return {
        type:"SELECT_CHECKOUT_ADDRESS",
        payload:address,
    }
 }

 export const deleteUserAddress = (toast,addressId,setOpenDeleteModal) => 
   async (dispatch,getState) => {
    try {
        dispatch({type:"BUTTON_LOADER"});
        await api.delete(`addresses/${addressId}`);
        dispatch({type:"IS_SUCCESS"});
        dispatch(getUserAddresses());
        toast.success("Address Deleted Successfully");
        dispatch({type:"REMOVE_CHECKOUT_ADDRESS"})
    } catch (error) {
        dispatch({
            type:"IS_ERROR",
            payload:"Some Error Occured"
        });
    }finally{
        setOpenDeleteModal(false);
    }
 }

 export const addPaymentMethod = (method) => {
    return {
        type:"ADD_PAYMENT_METHOD",
        payload: method,
    }
 }

export const createUserCart = (sendCartItems) => async (dispatch,getState) => {
    try {
        dispatch({ type : "IS_FETCHING"});
        await api.post("/cart/create",sendCartItems);
        await dispatch(getUserCart());
        
    } catch (error) {
        dispatch({type: "IS_ERROR", payload: "Failed to create cart items"});
    }
}
export const getUserCart = () => async (dispatch,getState) => {
    try {
        dispatch({ type : "IS_FETCHING"});
        const { data } = await api.get("/carts/users/cart");
        dispatch({
            type: "GET_USER_CART_PRODUCTS",
            payload: data.products,
            totalPrice:data.totalPrice,
            cartId: data.cartId,
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart));
        dispatch({type: "IS_SUCCESS"})
    } catch (error) {
        dispatch({type: "IS_ERROR", payload: "Failed to Fetch cart items"});
    }
}

export const createStripePaymentSecret = 
(sentData) => 
    async (dispatch, getState) => {
        try {
            dispatch({type: "IS_FETCHING"});
            const { data } = await api.post("/order/stripe-client-secret",sentData);
            dispatch({type:"CLIENT_SECRET", payload: data});
            localStorage.setItem("client-secret", JSON.stringify(data));
            dispatch({type:"IS_SUCCESS"});
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to create client secret");
        } 
       
}
export const stripePaymentConfirmation = 
(sentData, setErrorMessage, setLoading, toast) => 
    async (dispatch, getState) => {
        try {
            const response  = await api.post("/order/users/payments/online",sentData);
    
            if(response.data){
                localStorage.removeItem("CHECKOUT_ADDRESS");
                localStorage.removeItem("cartItems");
                localStorage.removeItem("client-secret");
                dispatch({type:"REMOVE_CLIENT_SECRET_ADDRESS"});
                dispatch({type:"CLEAR_CART"});
                toast.success("Order Accepted");
            }else{
                toast.error("Payment Failed. Please try agian.");
            }
            
        } catch (error) {
          toast.error("Payment Failed. Please try agian.");
        }     
}
export const analyticsAction = () => async (dispatch, getState) => {
        try {
            dispatch({type : "IS_FETCHING"});
            const {data} = await api.get("/admin/app/analytics");
            dispatch({
                type : "FETCH_ANALYTICS",
                payload : data
            });
            dispatch({type: "IS_SUCCESS"});
        } catch (error) {
            dispatch({
                type:"IS_ERROR",
                payload:error?.response?.data?.message || "failed to fetch analytics data"
            })
        }     
}

export const getOrderForDashboard = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" })
        const { data } = await api.get(`/admin/orders?${queryString}`);
        dispatch({
            type:"GET_ADMIN_ORDERS",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElement:data.totalElement,
            totalPages:data.totalPages,
            lastPage:data.lastPage
        })
        dispatch({ type: "IS_SUCCESS" })
    } catch (error) {
        console.log(error);
        dispatch({ 
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch Orders data",
        })
        
    }
}