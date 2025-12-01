import React, { useState } from 'react'
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux';
import Loader from "../../Shared/Loader.jsx"
import { FaBoxOpen } from "react-icons/fa";
import { adminProductTableColumn } from '../Helper/tableColumn.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { useDashboardProductFilter } from '../../../Hooks/useProductFilter.js';

const AdminProducts = () => {

  const {products, pagination} = useSelector((state) => state.Products);

  const {isLoading, errorMessage} = useSelector((state) => state.errors);
  const emptyProducts = !products || products?.length === 0;

  useDashboardProductFilter();

  const tableRecords = products?.map((item) =>{
    return {
      id: item.productId,
      productName:item.productName,
      description:item.description,
      quantity:item.quantity,
      price:item.price,
      discount:item.discount,
      specialPrice:item.specialPrice,
      image:item.image,
    }
  })

  const handleEdit = () => {

  }
  const handleDelete = () => {

  }
  const handleImageUpload = () => {

  }
  const handleProductView = () => {

  }
  const handlePaginationChange = () => {

  }
  const [currentPage, setCurrentPage] = useState(pagination?.pageNumber + 1 || 1);

  return (
    <div>
      <div className='pt-6 pb-10 flex justify-end' >
        <button className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300'>
          <MdAddShoppingCart className='text-xl'/>
            Add Products   
        </button>
      </div>

      {!emptyProducts && (
        <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase' >
          All Products
        </h1>
      )}
      {isLoading ? (
        <>
          <Loader />
          Loading...
        </>
      ) : (
        <>
          {emptyProducts ? (
            <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
              <FaBoxOpen className='mb-3' size={30}/>
              No Product Exists
            </div>
          ):(
            <div className='max-w-full' >
              <DataGrid
                className='w-full'
                    rows={tableRecords}
                    columns={adminProductTableColumn(handleEdit,handleDelete,handleImageUpload,handleProductView)}
                    paginationMode='server'
                    rowCount={pagination?.totalElements || 0}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: pagination?.pageSize || 10,
                          page: currentPage - 1,
                        },
                      },
                    }}
                    onPaginationModelChange={handlePaginationChange}
                    disableRowSelectionOnClick
                    disableColumnResize
                    pageSizeOptions={[pagination?.pageSize || 10]}
                    pagination
                    paginationOptions={{
                      showFirstButton: true,
                      showLastButton: true,
                      hideNextButton: currentPage === pagination?.totalPages,
                    }}
                  />
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminProducts