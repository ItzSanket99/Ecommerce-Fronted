import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getOrderForDashboard } from '../Store/Actions';

const useOrderFilter = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

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
    dispatch(getOrderForDashboard(queryString));
  }, [queryString, dispatch]);
  
  // return it so you can reuse it anywhere (if needed)
  return queryString;
}

export default useOrderFilter;
