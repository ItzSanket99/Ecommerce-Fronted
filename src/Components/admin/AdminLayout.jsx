import React, { useState } from 'react'
import SideBar from '../Shared/SideBar'

import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { RxCross1 } from 'react-icons/rx'

const AdminLayout = () => {
    let [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
        <Dialog 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            className="relative z-50 xl:hidden">
        
        <DialogBackdrop 
        transition
        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0" />

        <div className="fixed inset-0 flex">
          <DialogPanel 
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
                
           <TransitionChild>
            <div className='absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0'>
                <button type='button'
                 onClick={() => setSidebarOpen(false)}
                 className='-m-2.5 p-2.5'>
                    <span className='sr-only'> Close Sidebar</span>
                    <RxCross1 className='text-white text-2xl'/>
                </button>
            </div>
           </TransitionChild>
           <SideBar />
          </DialogPanel>
        </div>
      </Dialog>
        <div className='fixed inset-y-0 z-50 flex w-72 flex-col' >
            <SideBar />
        </div>
    </div>
  )
}

export default AdminLayout