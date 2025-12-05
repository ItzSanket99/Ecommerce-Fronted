import React, { useState } from 'react'
import { MdPersonAdd } from 'react-icons/md'
import { useSelector } from 'react-redux';
import Loader from '../../Shared/Loader';
import { FaBoxOpen } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import { adminSellerTableColumn } from '../Helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useSellerFilter from '../../../Hooks/useSellerFilter';

const Sellers = () => {

  const [openAddSellerModal, setOpenAddSellerModal] = useState(false);
  const { sellers, pagination } = useSelector((state) => state.seller);
  const {isLoading} = useSelector((state) => state.errors);
  const [currentPage, setCurrentPage] = useState(pagination?.pageNumber + 1 || 1);

  const emptyUser = !sellers && sellers?.length === 0;
   const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  useSellerFilter();

  const tableRecords = sellers?.map((item) => {
    return {
      id: item?.userId,
      userName: item?.userName,
      email: item?.email,
    }
  })

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page",page.toString());
    navigate(`${pathname}?${params}`)
  }

  return (
    <div>
      <div>
        <div className='pt-6 pb-10 flex justify-end' >
          <button className='bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300' 
          onClick={() => setOpenAddSellerModal(true)}
          >
            <MdPersonAdd className='text-xl'/>
              Add Seller   
          </button>
        </div>
  
        {!emptyUser && (
          <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase' >
            All Sellers
          </h1>
        )}
        {isLoading ? (
          <>
            <Loader />
            Loading...
          </>
        ) : (
          <>
            {emptyUser ? (
              <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
                <FaBoxOpen className='mb-3' size={30}/>
                No Category Exists
              </div>
            ):(
              <div className='max-w-fit mx-auto' >
                <DataGrid
                  className='w-full'
                      rows={tableRecords}
                      columns={adminSellerTableColumn()}
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
    </div>
  )
}

export default Sellers