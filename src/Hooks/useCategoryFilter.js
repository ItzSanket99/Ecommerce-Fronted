import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { dashboardCategoryAction } from "../Store/Actions";

const useCategoryFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1);
        
        const queryString = params.toString();
        dispatch(dashboardCategoryAction(queryString));

    },[searchParams, dispatch])
}

export default useCategoryFilter;