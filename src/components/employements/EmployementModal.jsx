import React, { useState } from 'react'

function EmployementModal() {
    const [isOpen, setIsOpen] = useState(true)

    const open = () => {
        setIsOpen(false)
    }

    const close = () => {
        setIsOpen(true)
    }
    return (
        <>
            <div>
            </div>

            <div className=''>
                {
                    !isOpen ?
                        <div className='fixed inset-0 bg-opacity-30 flex justify-center items-center bg-white w-36 '>
                            <div className='bg-gray-400 my-3'>
                                <p>Add Employement</p>
                                <input type="text" className='w-full border mt-5' />
                                <button onClick={close} className='mt-5 justify-end flex'>Close</button>
                            </div>
                        </div>

                        : null
                }
            </div>


        </>
    )
}

export default EmployementModal
