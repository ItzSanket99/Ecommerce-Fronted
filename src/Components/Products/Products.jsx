
import ProductCard from '../../Components/Shared/ProductCard';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import useProductFilter from '../../Hooks/useProductFilter';
import { fetchCategories } from '../../Store/Actions';
import { useEffect } from 'react';

import Loader from '../../Components/Shared/Loader';
import Paginations from '../../Components/Shared/Paginations';


const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );

    // const isLoading = false;
    // const errorMessage = "";


    const { products, categories, pagination } = useSelector(
        (state) => state.Products 
    )

    const dispatch = useDispatch();

    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories())
    },[dispatch])

    console.log();
    

  return (
    <div className=' lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto' >
        <Filter categories = {categories ? categories : []} />
        {isLoading ? (
                <Loader text = "Product Loading..."/>
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
                    <div className=' flex justify-center items-center pt-10'>
                        <Paginations 
                            numberOfPage = {pagination?.totalPages}
                            totalProducts = {pagination?.totalElements}
                        />
                    </div>
                </div>
            )}
    </div>
  )
}

export default Products