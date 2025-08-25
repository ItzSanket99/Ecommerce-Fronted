import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { FaArrowUp, FaSearch } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';


const Filter = () => {
    const categories = [
        {categoryId : 1, categoryName : "Electronic"},
        {categoryId : 2, categoryName : "clothing"},
        {categoryId : 3, categoryName : "furniture"},
        {categoryId : 4, categoryName : "books"},
        {categoryId : 5, categoryName : "toys"},
    ]

    const [category, setCategory] = useState("all");
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
  return (
    <>
        <div className='flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4' > 
            <div className=' relative flex items-center 2xl:w-[450px] xl:w-[420px] w-full' > 
                <input type="text" placeholder='Search products' className=' border border-gray-400  text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]' 
                />
                <FaSearch className=' absolute left-3 text-slate-700 size={20}'/>
            </div>

            <div className=' flex sm:flex-row flex-col gap-4 items-center' >
                <FormControl variant='outlined' size='small' 
                className=' text-slate-800 border-slate-700' >
                    <InputLabel>Category</InputLabel>
                    <Select labelId='category-select-label' value={category} onChange={handleCategoryChange} label="Category" className=' min-w-[120px] text-slate-800 border-slate-700' >
                        <MenuItem value="all" >All</MenuItem>
                        {
                            categories.map((item) => (
                                <MenuItem key={item.categoryId} value={item.categoryName} >
                                    {item.categoryName}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>

                <Tooltip title="Sorted by price: asc">
                    <Button variant="contained" color="primary">
                        Sort By
                        <FaArrowUp size={20} className='pl-2' />
                    </Button>
                </Tooltip>
                <button className='flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none' >
                    <MdRefresh className='font-semibold' size={16} />
                    <span className='font-semibold' >Clear Filter</span>
                </button>
            </div>
        </div>
    </>
  )
}

export default Filter