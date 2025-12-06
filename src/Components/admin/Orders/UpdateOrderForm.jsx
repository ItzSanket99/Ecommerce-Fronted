import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatusFromDashboard } from '../../../Store/Actions';
import toast from 'react-hot-toast';

const ORDER_STATUES = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Accepeted",
];



const UpdateOrderForm = ({setOpen, selectedId, selectedItem, loader, setLoader,queryString}) => {

    const [orderStatus, setOrderStatus] = useState(selectedItem?.status || "Accepted");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles.includes("ROLE_ADMIN");


    const updateOrderStatus = (e) => {
        e.preventDefault();
        if(!orderStatus){
            setError("order Status is required")
            return;
        }
        dispatch(updateOrderStatusFromDashboard(selectedId,orderStatus,toast,setLoader,queryString,isAdmin));
    }

  return (
    <div className='py-5 relative h-full' >
        <form className='space-y-4' action="" onSubmit={updateOrderStatus}>
            <FormControl fullWidth variant='outlined' error={!!error} >
                <InputLabel id = "order-status-label">Order Status</InputLabel>
                <Select
                    labelId='order-status-label'
                    label="Order Status"
                    value={orderStatus}
                    onChange={(e) => {
                        setOrderStatus(e.target.value)
                        setError("");
                    }}
                >
                    {ORDER_STATUES.map((status) => (
                        <MenuItem
                            key={status} value={status}
                        >
                            {status}
                        </MenuItem>
                    ))}
                </Select>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
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

export default UpdateOrderForm