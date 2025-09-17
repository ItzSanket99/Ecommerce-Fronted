import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineLogin } from "react-icons/ai";
import InputFeild from '../Shared/InputFeild';

const LogIn = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({
        mode:"onTouched",
    });

    const loginHandler = async (data) => {
        console.log('login clicked');
        
    }

  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center' >
        <form 
            onSubmit={handleSubmit(loginHandler)}
            className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'
        >
            <div className='flex flex-col items-center justify-center space-y-4' >
                <AiOutlineLogin  className='text-slate-800 text-5xl'/>
                <h1 className='text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold' >Login Here</h1>
            </div>
            <hr className='mt-2 mb-5 text-black' />
            <div className='flex flex-col gap-3' >
                <InputFeild
                    label="UserName"
                    required
                    id="username"
                    type="text"
                    register={register}
                    message="*UserName is Required"
                    placeHolder="Enter your username"
                    errors={errors}
                />
                <InputFeild
                    label="Password"
                    required
                    id="password"
                    type="password"
                    register={register}
                    message="*password is Required"
                    placeHolder="Enter your username"
                    errors={errors}
                />
            </div>
            <button
                disabled={loader}
                className='mt-4 bg-button-gradient flex items-center justify-center gap-2 font-semibold text-white w-full py-2 hover:text-slate-500 transition-colors duration-100 rounded-sm my-3'
                type='submit'
            >
                {loader ? (
                    <>loading...</>
                ): (
                    <>Login</>
                )}
                
            </button>
            <p className='text-center text-sm text-slate-700 mt-6' >
                Don't have an account?
                <Link className='font-semibold underline hover:text-black' to="/register">
                    <span >
                        SignUp
                    </span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default LogIn