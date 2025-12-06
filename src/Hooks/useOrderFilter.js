import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getOrderForDashboard } from '../Store/Actions';

const useOrderFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
  // compute query string OUTSIDE useEffect
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    const currentPage = searchParams.get("page")
      ? Number(searchParams.get("page"))
      : 1;

    params.set("pageNumber", currentPage - 1);

    return params.toString();
  }, [searchParams]);

  // fetch orders whenever queryString changes
  useEffect(() => {
    dispatch(getOrderForDashboard(queryString, isAdmin));
  }, [queryString, dispatch]);
  
  // return it so you can reuse it anywhere (if needed)
  return queryString;
}

export default useOrderFilter;
