import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import Button1 from '../../globlecomponent/Button1'
import axios from 'axios'
import { FaCheck } from 'react-icons/fa6'

function UserModal({ iconValue, trueUser, id, getFunction }) {
    const [changeValue, setChangeValue] = useState()
    const [isOpen, setIsOpen] = useState(false)

    const openModal = (a) => {
        setIsOpen(true)
        setChangeValue(a)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    async function signData() {
        const data = await axios(`http://dev-softwiz-002/User/GETObituary?status=${changeValue}&id=${id}`)
            .then((response => {
                console.log(response, 'response')
                getFunction();
            }))

        closeModal();
    }

    return (
        <div>
            <div>
                <div>
                    {
                        iconValue == true ?
                            <FaCheck onClick={() => openModal(false)} className='text-xl text-blue-500 ms-1 cursor-pointer' /> :
                            <RxCross1 onClick={() => openModal(true)} className='text-xl text-red-700 ms-1 cursor-pointer' />
                    }
                </div>

                {
                    isOpen ?
                        <div className=''>
                            <div id='containt' className='fixed inset-0 bg-black bg-opacity-30   flex items-center justify-center'>
                                <div className='bg-white p-3 rounded  md:w-96  w-60'>

                                    <div className='mt-5'>

                                        <p className='font-medium text-center text-xl'>
                                            {
                                                iconValue == true ?
                                                    
                                                    ' Are you sure want to Active User?':
                                                    ' Are you sure want to Deactivate User?' 
                                            }

                                        </p>
                                    </div>

                                    <div className='text-center mt-10'>
                                        <Button1 onClickFunction={closeModal} buttonName='Cancel' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-red-900' bgColor='bg-white' hoverText='hover:text-white' textColor='text-red-700' />
                                        <Button1 buttonType='button' onClickFunction={signData} buttonName='Ok' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                                    </div>
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        </div>
    )
}

export default UserModal
