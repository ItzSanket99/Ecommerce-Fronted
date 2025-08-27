import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import { MdRefresh, MdTurnedInNot } from 'react-icons/md';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';


const Filter = ({categories}) => {
   
    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if(selectedCategory === "all"){
            params.delete("category");
        }else{
            params.set("category", selectedCategory);
        }
        navigate(`${pathName}?${params}`);
        setCategory(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder)=>{
            const newOrder = (prevOrder === "asc") ? "desc" : "asc";
            params.set("sortby",newOrder);
            navigate(`${pathName}?${params}`);
            return newOrder;
        });
    };

    const handleClearFilter = () => {
        navigate({ pathname : window.location.pathname })
    };

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathName = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortby") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);

    }, [searchParams])

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword",searchTerm);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathName}?${searchParams.toString()}`)
        }, 700);
        return () => {
            clearTimeout(handler);
        }
    },[searchParams, searchTerm, navigate, pathName]);

  return (
    <>
        <div className='flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4' > 
            <div className=' relative flex items-center 2xl:w-[450px] xl:w-[420px] w-full' > 
                <input type="text" placeholder='Search products' className=' border border-gray-400  text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={toggleSortOrder}
                        >
                        Sort By
                        {sortOrder === "asc" ? (
                            <FaArrowUp size={20} className='pl-2' />
                        ) : (
                            <FaArrowDown size={20} className='pl-2' />
                        )}
                        
                    </Button>
                </Tooltip>
                <button className='flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none'
                onClick={handleClearFilter}
                >
                    <MdRefresh className='font-semibold' size={16} />
                    <span className='font-semibold' >Clear Filter</span>
                </button>
            </div>
        </div>
    </> 
  )
}

export default Filter