import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {  dashboardSellerAction } from "../Store/Actions";

const useSellerFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);
        
        const queryString = params.toString();
        dispatch(dashboardSellerAction(queryString));

    },[searchParams, dispatch])
}

export default useSellerFilter;