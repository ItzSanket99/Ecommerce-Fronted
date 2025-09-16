import React, { useState } from 'react'
import { HiOutlineTrash } from "react-icons/hi";
import SetQuantity from './SetQuantity';
import { useDispatch } from 'react-redux';
import { decreseCartQuantity, increaseCartQuantity, removeCartItem } from '../../Store/Actions';
import toast from 'react-hot-toast';
import { formatPrice } from '../../Utils/formartPrice';
import truncateText from '../../Utils/truncateText';

const ItemContent = ({
        productId,
        productName,
        image,
        description,
        quantity,
        price,
        discount,
        specialPrice,
        cartId,
}) => {

    const dispatch = useDispatch();
    const handleQtyIncrease = (cartItems) => {
        dispatch(increaseCartQuantity(
            cartItems,
            toast,
            currentQuantity,
            setCurrentQuantity,
        ));
    }

    const handleQtyDecrease = (cartItems) => {
        if(currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreseCartQuantity(cartItems,newQuantity));
        }
    }

    const removeItemFromCart = (cartItems) => {
        dispatch(removeCartItem(cartItems,toast));
    }
    
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
  return (
    <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border-[1px] border-slate-200  rounded-md  lg:px-4  py-4 p-2">
        <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
            <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
                <h3 className='lg:text-[17px] text-sm font-semibold text-slate-600 ' >
                    {truncateText(productName)}
                </h3>
            </div>
            <div className='md:w-36 sm:w-24 w-12'>
                <img src={image } alt={productName} className='md:h-36 sm:h-24 h-12 w-full object-cover rounded-md' />
            
            <div className='flex items-center justify-start gap-5 mt-3' >
                <button 
                onClick={()=>removeItemFromCart({
                    image,
                    productName,
                    description,
                    price,
                    specialPrice,
                    productId,
                    quantity,
                })}
                className='flex items-center space-x-2 font-semibold px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition-colors duration-200'>
                    <HiOutlineTrash size={16} className='text-rose-600'/>
                    Remove
                </button>
                </div>
            </div>
        </div>

        <div className='justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold'>
            {formatPrice(Number(specialPrice))}
        </div>

        <div className='justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold'>
            <SetQuantity 
                quantity={currentQuantity}
                cartCounter={true}
                handleQtyIncrease={()=> handleQtyIncrease({
                    image,
                    productName,
                    description,
                    price,
                    specialPrice,
                    productId,
                    quantity,
                })}
                handleQtyDecrease={()=>handleQtyDecrease({
                    image,
                    productName,
                    description,
                    price,
                    specialPrice,
                    productId,
                    quantity,
                })}
            />
        </div>

        <div className='justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold'>
            {formatPrice(Number(currentQuantity) * Number(specialPrice))}
        </div>

    </div>
    )
}

export default ItemContent;

11.5
3.87