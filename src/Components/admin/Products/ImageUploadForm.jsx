import { Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { updateDashboardProductImage } from '../../../Store/Actions';

const ImageUploadForm = ({setOpen, product}) => {
    const fileInputRef = useRef();
    const [previewImage,setPreviewImage] = useState(null);
    const [selectedFile,setSelectedFile] = useState(null);
    const [loader,setLoader] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles.includes("ROLE_ADMIN");

    const onHandleImageChange = (e) => {
        const file = e.target.files[0];
        if(file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)){
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            }
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }else{
            toast.error("Please select a valid image file.(.jpeg, .jpg, .png)")
            setPreviewImage(null);
            setSelectedFile(null);
        }
    };
    const addNewImageHandler = async (event) => {
        event.preventDefault();
        if(!selectedFile){
            toast.error("Please select an image before saving.")
            return;
        }
        const formData = new FormData();
        formData.append("image", selectedFile)
        dispatch(updateDashboardProductImage(formData,product.id,toast,setLoader,setOpen,isAdmin));
    };
    const handleClearImage = () => {
        setPreviewImage(null);
        selectedFile(null);
        fileInputRef.current.value = null;
    };
  return (
    <div className='py-5 relative h-full'>
        <form action="" className='space-y-4' onSubmit={addNewImageHandler}>
            <div className='flex flex-col gap-4 w-full' >
                <label  className='flex items-center gap-2 cursor-pointer text-custom-blue border border-dashed border-custom-blue rounded-md p-3 w-full justify-center'>
                    <FaCloudUploadAlt size={24}/>
                    <span>Upload Product Image</span>
                    <input 
                        type='file'
                        ref={fileInputRef}
                        onChange={onHandleImageChange}
                        className='hidden'
                        accept='.jpeg, .jpg, .png'
                    />
                </label>

                {previewImage && (
                    <div className='mt-10 p-4 w-full flex flex-col items-center gap-3' >
                        <h4 className='text-xl font-semibold text-gray-800' >Image Preview</h4>
                        <img src={previewImage} alt="image preview" 
                        className='h-60 rounded-md mb-2'
                        />
                        <button
                            onClick={handleClearImage} 
                            type='button'
                            className='bg-rose-600 text-white px-2 py-1 rounded-md'
                        >
                            Clear Image
                        </button>
                    </div>
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

export default ImageUploadForm