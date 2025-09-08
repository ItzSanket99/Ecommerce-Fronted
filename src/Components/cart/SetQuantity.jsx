import React from 'react'

const SetQuantity = ({
    quantity,
    cartCounter,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
  return (
    <div className='flex gap-8 items-center' >
        {cartCounter ? null : <div className='font-semibold'>QUANTITY</div> }
        <div className='flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm' >
            <button
            disabled={quantity <= 1}
            className='border-[1.2px] border-slate-800 px-3 py-0.5 rounded'>
                -
            </button>
            <div className='text-red-500' >{quantity}</div>
            <button
            disabled={quantity <= 1}
            className=' border-[1.2px] border-slate-800 px-3 py-0.5 rounded'>
                +
            </button>
        </div>
    </div>
  )
}

export default SetQuantity;