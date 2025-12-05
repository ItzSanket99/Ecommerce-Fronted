import React, { useState } from 'react'
import { FaBoxOpen, FaThList } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Shared/Loader';
import { DataGrid } from '@mui/x-data-grid';
import { adminCategoryTableColumn } from '../Helper/tableColumn';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useCategoryFilter from '../../../Hooks/useCategoryFilter';
import Modal from '../../Shared/Modal';
import AddCategory from './addCategory';
import DeleteModal from '../../Shared/DeleteModal';
import { deleteDashboardCategory } from '../../../Store/Actions';
import toast from 'react-hot-toast';

const Categories = () => {

  const { categories, pagination } = useSelector((state) => state.Products)
  const {isLoading, errorMessage} = useSelector((state) => state.errors);
  const [currentPage,setCurrentPage] = useState(pagination?.pageNumber + 1 || 1);
  const [openAddCateoryModal, setOpenAddCatgeoryModal] = useState(false);
  const [openUpdateCateoryModal, setOpenUpdateCatgeoryModal] = useState(false);
  const [selectedCategory,setSelectedCategory] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const emptyCategory = !categories && categories?.length === 0;
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  

  useCategoryFilter();

  const tableRecords = categories?.map((item) => {
    return {
      id: item?.categoryId,
      categoryName: item?.categoryName,
    }
  })

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateCatgeoryModal(true);
  }
  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  }

  const onDeleteHandler = () => {
    dispatch(deleteDashboardCategory(setLoader, selectedCategory?.id, toast, setOpenDeleteModal));
  }


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
              onClick={() => setOpenAddCatgeoryModal(true)}
              >
                <FaThList className='text-xl'/>
                  Add Category   
              </button>
            </div>
      
            {!emptyCategory && (
              <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase' >
                All Categories
              </h1>
            )}
            {isLoading ? (
              <>
                <Loader />
                Loading...
              </>
            ) : (
              <>
                {emptyCategory ? (
                  <div className='flex flex-col items-center justify-center text-gray-600 py-10'>
                    <FaBoxOpen className='mb-3' size={30}/>
                    No Category Exists
                  </div>
                ):(
                  <div className='max-w-fit mx-auto' >
                    <DataGrid
                      className='w-full'
                          rows={tableRecords}
                          columns={adminCategoryTableColumn(handleEdit, handleDelete)}
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

        <Modal 
        open={openAddCateoryModal || openUpdateCateoryModal}
        setOpen={openAddCateoryModal ? setOpenAddCatgeoryModal : setOpenUpdateCatgeoryModal}
        title={openAddCateoryModal ? "Add Category" : "Update Category"}
      >
        <AddCategory
          setOpen={openAddCateoryModal ? setOpenAddCatgeoryModal : setOpenUpdateCatgeoryModal}
          category={selectedCategory}
          update={openUpdateCateoryModal}
        />
      </Modal>

      <DeleteModal 
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title={"Delete Product"}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  )
}

export default Categories