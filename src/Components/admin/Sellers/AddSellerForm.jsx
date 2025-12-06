import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import InputFeild from '../../Shared/InputFeild';
import { Button } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { registerNewSeller } from '../../../Store/Actions';

const AddSellerForm = ({setOpen}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode:"onTouched"
    });

    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const saveProductHandler = (data) => {
        dispatch(dispatch(registerNewSeller(data,toast,reset,setLoader,setOpen)));
    }


  return (
    <div className='py-5 relative h-full'>
        <form action="" className='space-y-4 ' onSubmit={handleSubmit(saveProductHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="UserName"
                    required
                    id="username"
                    type="text"
                    message="This feild is required*"
                    placeHolder="Username"
                    register={register}
                    errors={errors}
                />
            </div>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="Email"
                    required
                    id="email"
                    type="email"
                    message="This feild is required*"
                    placeHolder="Email"
                    register={register}
                    errors={errors}
                />
            </div>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="This feild is required*"
                    placeHolder="Password"
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

export default AddSellerForm