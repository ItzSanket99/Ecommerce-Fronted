/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import api from "../../Api/Api.js"

export const fetchProducts = () => async (dispatch) => {
    try {
        const { data } = await api.get(`/public/products`);
        dispatch({
            type:"FETCH_PRODUCTS",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage
        })
    } catch (error) {
        console.log(error);
        
    }
}