import { Skeleton } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

const PaymentForm = ({clientSecret, totalPrice}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const {error : sumbmitError} = await elements.submit();
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
                return_url:`${import.meta.env.VITE_FRONTEND_URL}order-confirm`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            return false;
        }
    }

    const loading = !clientSecret || !stripe || !elements;

    const PaymentElementOptions = {
        layout: "tabs",
    }

  return (
    <form action="" onSubmit={handleSubmit} className='max-w-lg mx-auto p-4 mb-12'>
        <h2 className='text-xl font-semibold mb-4' >Payment Information</h2>
        {loading ? (
            <Skeleton />
        ):(
            <>
            {clientSecret && <PaymentElement  options={PaymentElementOptions} />}
            {errorMessage && (
                <div className='text-red-500 mt-2' >{errorMessage}</div>
            )}

            <button 
                disabled= {!stripe || loading}
                className='text-white w-full px-5 py-[10px] bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse'
                
            >
                {!loading ? `Pay $${Number(totalPrice).toFixed(2)}`: "processing"}
            </button>
            </>
            
        )}
    </form>
  )
}

export default PaymentForm