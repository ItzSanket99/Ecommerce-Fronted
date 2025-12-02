import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputFeild from '../../Shared/InputFeild';
import { Button } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateDashboardProduct } from '../../../Store/Actions';
import toast from 'react-hot-toast';


const AddProductForm = ({setOpen, product, update=false}) => {

    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: {errors},
    } = useForm({
        mode:"onTouched"
    });

    useEffect(() => {
        if(update && product){
            setValue("productName",product?.productName);
            setValue("price",product?.price);
            setValue("quantity",product?.quantity);
            setValue("discount",product?.discount);
            setValue("specialPrice",product?.specialPrice)
            setValue("description",product?.description)
        }
    },[update,product]);

    const saveProductHandler = (data) => {
        if(!update){
            // create new product logic
        }else{
            const sentData = {
                ...data,
                id: product.id,
            };
            dispatch(updateDashboardProduct(sentData, toast, reset, setLoader, setOpen))
        }
    }

  return (
    <div className='py-5 relative h-full'>
        <form action="" className='space-y-4 ' onSubmit={handleSubmit(saveProductHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="Product Name"
                    required
                    id="productName"
                    type="text"
                    message="This feild is required*"
                    placeHolder="Product Name"
                    register={register}
                    errors={errors}
                />
            </div>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="Price"
                    required
                    id="price"
                    type="number"
                    message="This feild is required*"
                    placeHolder="Product Price"
                    register={register}
                    errors={errors}
                />

                <InputFeild 
                    label="Quantity"
                    required
                    id="quantity"
                    type="number"
                    message="This feild is required*"
                    placeHolder="Product Quantity"
                    register={register}
                    errors={errors}
                />
            </div>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputFeild 
                    label="Discount"
                    required
                    id="discount"
                    type="number"
                    message="This feild is required*"
                    placeHolder="Product Discount"
                    register={register}
                    errors={errors}
                />
                <InputFeild 
                    label="Special Price"
                    required
                    id="specialPrice"
                    type="number"
                    message="This feild is required*"
                    placeHolder="Product Special Price"
                    register={register}
                    errors={errors}
                />
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <label htmlFor='desc' className='font-semibold text-sm text-slate-800'>
                    Description
                </label>
                <textarea 
                    rows={5}
                    placeholder="Add Product Description.. "
                    className={`px-4 py-2 w-full border outline-none bg-transparent text-slate-800 rounded-md 
                    ${errors["description"]?.message ? "border-red-500" : "border-slate-700"}`}
                    {...register("description",{
                        required: {value:true, message:"Description is required*"},
                        
                    })}            
                />

                {errors["description"]?.message && (
            <p className='text-sm font-semibold text-rose-600 mt-0' >
                {errors["description"]?.message}
            </p>
        )}
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
                        "Update"
                    )}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default AddProductForm