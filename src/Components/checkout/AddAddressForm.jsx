import React from 'react'
import InputFeild from '../Shared/InputFeild'
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AddAddressForm = () => {
    const { btnLoader } = useSelector((state) => state.errors)
    const {
        register,
        handleSubmit,
        reset,
        formState : {errors}
    } = useForm({
        mode:"onTouched",
    });

    const onSaveAddressHandler = async (data) => {
        console.log(data);
    }

  return (
    <div className='' >
        <form 
            onSubmit={handleSubmit(onSaveAddressHandler)}
            className=''
        >
            <div className='flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4' >
                <FaAddressCard  className='mr-2 text-2xl'/>
                <h1 className='text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold' >Add Address</h1>
            </div>
            
            <div className='flex flex-col gap-4' >
                <InputFeild
                    label="Building Name"
                    required
                    id="Building"
                    type="text"
                    register={register}
                    message="*Building Name is Required"
                    placeHolder="Enter your Building Name"
                    errors={errors}
                />
                <InputFeild
                    label="City"
                    required
                    id="city"
                    type="text"
                    register={register}
                    message="*City is Required"
                    placeHolder="Enter your City"
                    errors={errors}
                />
                <InputFeild
                    label="State"
                    required
                    id="state"
                    type="text"
                    register={register}
                    message="*State is Required"
                    placeHolder="Enter your State"
                    errors={errors}
                />
                <InputFeild
                    label="Pincode"
                    required
                    id="pincode"
                    type="text"
                    register={register}
                    message="*Pincode is Required"
                    placeHolder="Enter your Pincode"
                    errors={errors}
                />
                <InputFeild
                    label="Street"
                    required
                    id="street"
                    type="text"
                    register={register}
                    message="*Street is Required"
                    placeHolder="Enter your Street"
                    errors={errors}
                />
                <InputFeild
                    label="Country"
                    required
                    id="country"
                    type="text"
                    register={register}
                    message="*Country is Required"
                    placeHolder="Enter your Country"
                    errors={errors}
                />
            </div>
            <button
                disabled={btnLoader}
                className='text-white bg-custom-blue px-4 py-2 rounded-md mt-4'
                type='submit'
            >
                {btnLoader ? (
                    <>loading...</>
                ): (
                    <>Save</>
                )}
                
            </button>
        
        </form>
    </div>
  )
}

export default AddAddressForm