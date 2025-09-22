/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Skeleton from '../Shared/Skeleton';
import { FaAddressBook } from "react-icons/fa";
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import DeleteModal from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../Store/Actions';

const AddressInfo = ({ address }) => {
    
    const noAddressExist = !address || address.length === 0;
    const {isLoading, btnLoader} = useSelector((state) => state.errors);

    const [openAddressModal, SetOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");

    const [openDeleteModal,setOpenDeleteModal] = useState(false);

    const dispatch = useDispatch();

    const addNewAddressHandler = () => {
        setSelectedAddress("");
        SetOpenAddressModal(true);
    }

    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(toast,selectedAddress?.addressId,setOpenDeleteModal))
    }

  return (
    <div className='pt-4' >
        {noAddressExist ? (
            <div className='p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center'>
                <FaAddressBook size={50} className='text-gray-500 mb-4'/>
                <h1 className='text-slate-900 mb-2 font-semibold text-center text-2xl ' >
                    No Address Added Yet.
                </h1>
                <p className='text-slate-800 mb-6  text-center ' >
                    Please add address to complete your purchase
                </p>
                <button className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200'
                onClick={addNewAddressHandler}>
                    Add Address
                </button>
            </div>
        ) : (
            <div className='relative p-6 rounded-lg max-w-md mx-auto' >
                <h1 className='text-slate-800 font-bold text-center text-2xl ' >
                    Select Address
                </h1>

            {isLoading ? (
               <div className='px-8 py-4' >
                    <Skeleton />
               </div>
            ) : (
                <>
                    <div className='space-y-4 pt-6' >
                        <AddressList 
                            addresses={address}
                            setSelectedAddress = {setSelectedAddress}
                            setOpenAddressModal = {SetOpenAddressModal}
                            setOpenDeleteModal = {setOpenDeleteModal}
                        />
                    </div>

                    {address.length > 0 && (
                        <div className='mt-4' >
                            <button className='px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200'
                            onClick={addNewAddressHandler} >
                                Add More
                            </button>
                        </div>
                    )}
                </>
            )}
            </div>
        )}
        <AddressInfoModal
            open={openAddressModal}
            setOpen={SetOpenAddressModal}
        >
            <AddAddressForm 
                address = {selectedAddress}
                setOpen = {SetOpenAddressModal}
            />
        </AddressInfoModal>

        <DeleteModal 
            open = {openDeleteModal}
            loader = {btnLoader}
            setOpen={setOpenDeleteModal}
            title = "Delete Address"
            onDeleteHandler={deleteAddressHandler}
        />
    </div>
  ) 
}

export default AddressInfo