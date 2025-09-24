/* eslint-disable react-hooks/exhaustive-deps */
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentMethod, createUserCart } from '../../Store/Actions';

const PaymentMethod = () => {

    const {PaymentMethod} = useSelector((state) => state.payment);
    const {cart, cartId} = useSelector((state) => state.carts);
    const {isLoading, errorMessage} = useSelector((state) => state.errors);

    const dispatch = useDispatch();
    const paymentMethodHandler = (method) => {
        dispatch(addPaymentMethod(method));
    }

    useEffect(() => {
        if (cart.length > 0 && !cartId && !errorMessage)  {
            const sendCartItems = cart.map((item) => {
                return{
                    productId: item.productId,
                    quantity: item.quantity
                };
            });
            dispatch(createUserCart(sendCartItems));
        }
    },[dispatch,cartId])
  return (
    <div className='max-w-md mx-auto bg-white shadow-md rounded-lg mt-16 border px-4 py-2' >
        <h1 className='font-semibold text-2xl mb-4 '>
            Select Payment Method
        </h1>
        <FormControl>
                <RadioGroup
                    aria-label="Payment Method"
                    name="controlled-radio-buttons-group"
                    value={PaymentMethod}
                    onChange={(e) => paymentMethodHandler(e.target.value)}
                >
                <FormControlLabel 
                    value="Stripe" 
                    control={<Radio color='primary' />} 
                    label="Stripe" 
                    className='text-gray-700'
                />
                <FormControlLabel 
                    value="Paypal" 
                    control={<Radio color='primary' />} 
                    label="Paypal"
                    className='text-gray-700'
                />
            </RadioGroup>
        </FormControl>
    </div>
  )
}

export default PaymentMethod