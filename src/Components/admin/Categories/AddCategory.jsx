import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addNewCategoryFromDashboard, updateDashboardCategory } from '../../../Store/Actions';
import toast from 'react-hot-toast';
import InputFeild from '../../Shared/InputFeild';

const AddCategory = ({setOpen,category,update=false}) => {

    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: {errors},
        } = useForm({
            mode:"onTouched"
        });

    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    
    const saveProductHandler = (data) => {
        if(!update){
            dispatch(addNewCategoryFromDashboard(data,toast,reset,setLoader,setOpen));
        }else{
            const sendData = {
                ...data,
                id: category.id,
            }
            dispatch(updateDashboardCategory(sendData,toast,reset,setLoader,setOpen))
        }
       
    }

    useEffect(() => {
        if(update && category){
            setValue("categoryName",category?.categoryName);
        }
    },[update,category])

  return (
    <div className='py-5 relative h-full'>
        <form action="" className='space-y-4 ' onSubmit={handleSubmit(saveProductHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="Category Name"
                    required
                    id="categoryName"
                    type="text"
                    message="This feild is required*"
                    placeHolder="Category Name"
                    register={register}
                    errors={errors}
                />
            </div>
            
            <div className='flex w-full justify-between items-center absolute bottom-16' >
                <Button 
                    disabled={loader}
                    onClick={() => setOpen(false)}
                    variant='outlined'
                    className='text-white py-[10px] px-4 text-sm font-medium '
                >
                    Cancel
                </Button>
                <Button   
                    disabled={loader}
                    type='submit'
                    variant='contained'
                    color='primary'
                    className='bg-custom-blue text-white py-[10px] px-4 text-sm font-medium'
                    
                >
                    {loader ? (
                        <div className='flex gap-2 items-center' >
                            <FaSpinner /> Loading.. 
                        </div>
                    ) : (
                        "Save"
                    )}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default AddCategory