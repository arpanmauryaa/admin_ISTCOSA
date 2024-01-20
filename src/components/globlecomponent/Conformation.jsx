import React, { useState } from 'react'
import Button1 from './Button1'
import { MdDelete } from "react-icons/md";

function Conformation({ deleteBatches, id, batchID }) {
    
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true)
    }

    const closeModal = () => {
        setIsModal(false)
    }

    return (
        <>
            <div>
                <div>
                    <MdDelete onClick={openModal} className='cursor-pointer text-red-900 text-2xl ' />
                </div>

                {
                    isModal ?
                        <div className=''>
                            <div id='containt' className='fixed inset-0 bg-black bg-opacity-30   flex items-center justify-center'>
                                <div className='bg-white p-3 rounded  md:w-96  w-60'>

                                    <div className='mt-5'>
                                        <p className='font-medium text-red-900 text-center text-xl'>Are you Confirm to delete Data </p>
                                    </div>

                                    <div className='text-center mt-10'>
                                        <Button1 onClickFunction={closeModal} buttonName='Cancel' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-red-900' bgColor='bg-white' hoverText='hover:text-white' textColor='text-red-700' />
                                        <Button1 buttonType='button' onClickFunction={() => deleteBatches(id, closeModal, batchID)} buttonName='Ok' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        </>
    )
}

export default Conformation
