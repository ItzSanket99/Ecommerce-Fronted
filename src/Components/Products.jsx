import React, { useEffect } from 'react'
import ProductCard from './ProductCard';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Store/Actions';

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    // const isLoading = false;
    // const errorMessage = "";


    const { products } = useSelector(
        (state) => state.Products 
    )

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    },[dispatch])

    console.log();
    

  return (
    <div className=' lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto' >
        {isLoading ? (
                <p>loading...</p>
            ) : errorMessage ? (
                <div className=' flex justify-center items-center p-[200px]' >
                    <FaTriangleExclamation className=' text-slate-800 text-3xl mr-2' />
                    <span className=' text-slate-800 text-lg font-medium' >{errorMessage}</span>
                </div>
            ) : (
                <div className=' min-h-[700px]' >
                    <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6' >
                        {
                            products && products.map((item, i) => <ProductCard key={i} {...item} />)
                        }
                    </div>
                </div>
            )}
    </div>
  )
}

export default Products