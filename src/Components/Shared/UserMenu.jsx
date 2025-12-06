import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';
import { IoExitOutline } from "react-icons/io5";
import BackDrop from './BackDrop';
import { logoutUser } from '../../Store/Actions';

const UserMenu = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOutHandler = () => {
    dispatch(logoutUser(navigate));
  }

  const {user} = useSelector((state) => state.auth)

  const isAdmin = user && user?.roles.includes("ROLE_ADMIN");
  const isSeller = user && user?.roles.includes("ROLE_SELLER");

  return (
    <div className=' relative z-30' >
      <div
        className='sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'
        onClick={handleClick}
      >
        <Avatar alt='menu' src=''/>  
      </div>
      <Menu
        sx={{width:"400px" }}
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Link to="/profile">
            <MenuItem className='flex gap-2 items-center' onClick={handleClose}>
                <BiUser className='text-xl' />  
                <span className='font-bold text-[16px]' >
                    {user?.username}
                </span>
            </MenuItem>
        </Link>
        <Link to="/profile/orders">
            <MenuItem className='flex gap-2 items-center' onClick={handleClose}>
                <FaShoppingCart className='text-xl' />  
                <span className='font-semibold' >
                    Order
                </span>
            </MenuItem>
        </Link>
        {(isAdmin || isSeller) && <Link to={isAdmin ? "/admin" : "/admin/orders"}>
            <MenuItem className='flex gap-2 items-center' onClick={handleClose}>
                <FaUserShield className='text-xl' />  
                <span className='font-semibold' >
                    {isAdmin ? "Admin Panel" : "Seller Panel"}
                </span>
            </MenuItem>
        </Link>}
        <MenuItem className='flex gap-2 items-center' onClick={logOutHandler}>
            <div className='font-semibold w-full flex gap-2 items-center justify-center bg-button-gradient px-3 py-1 text-white rounded-sm'>
                <IoExitOutline className='text-xl' /> 
                <span className='font-semibold' >
                    Logout
                </span>
            </div>  
        </MenuItem>
  
      </Menu>
      {open && <BackDrop />}
    </div>
  );
}

export default UserMenu