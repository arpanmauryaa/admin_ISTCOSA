import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import InputField from '../globlecomponent/InputField';
import Button1 from '../globlecomponent/Button1';
import { qualificationPost, qualificationUpdate } from '../../utils/api/qualificationapi/QualificationAPI';
import { MdEdit } from 'react-icons/md';

function QualificationModal({ getQualification, getQualification1, name, qualificationName, id }) {
    console.log(name, 'Nameprops')
    const [isModal, setIsModal] = useState(false);
    const [errorMassage, setErrorMassage] = useState('')

    const [QualificationData, setQualificationData] = useState({
        QualificationName: '',
        Active: true
    })

    const handleChange = (e) => {
        setQualificationData((oldData => ({ ...oldData, [e.target.name]: e.target.value })))
        setErrorMassage('')
    }

    const openModal = () => {
        setIsModal(true)
    }

    const closeModal = () => {
        setIsModal(false)
        setErrorMassage('')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let isValid = true
        const yearsPattern = /^[0-9]{4}$/;

        if (!QualificationData.QualificationName) {
            setErrorMassage('Enter Qualification')
            isValid = false;
        }

        if (isValid) {
            name == 'Submit' ?
                qualificationPost(QualificationData).then(response => {
                    const data = response
                    setQualificationData({
                        QualificationName: ''
                    })
                    closeModal();
                    getQualification();
                }).catch((error => {
                    console.log('error in post qualification api')
                }))

                :

                qualificationUpdate(id, QualificationData).then(response => {
                    const data = response
                    setQualificationData({
                        QualificationName: ''
                    })
                    getQualification1();
                    closeModal();

                }).catch(error => {
                    console.log('error in qualification put api ')
                })
        }
    }


    const updateQualification = (event) => {
        event.preventDefault()
        qualificationUpdate(id, QualificationData).then(response => {
            const data = response
            setQualificationData({
                QualificationName: ''
            })
            getQualification1();
            closeModal();

        }).catch(error => {
            console.log('error in qualification put api ')
        })
    }

    return (
        <>
            <div>
                <div>
                    {
                        name == 'Submit' ?

                            <FiPlusCircle onClick={openModal} className='mt-4 text-2xl text-red-900 me-4 cursor-pointer' />
                            :
                            <MdEdit onClick={() => {
                                setQualificationData({
                                    QualificationName: qualificationName
                                })
                                openModal()
                            }
                            } className='cursor-pointer text-blue-700 ' />


                    }
                </div>

                {
                    isModal ?
                        <div className=''>
                            <div id='containt' className='fixed inset-0 bg-black bg-opacity-30   flex items-center justify-center'>
                                <div className='bg-white p-3 rounded  md:w-96  w-60'>

                                    <div className='mt-2 px-3'>
                                        <p className='font-medium text-gray-700  text-xl'>
                                            {
                                                name == 'Submit' ?
                                                    'Update Qualification ' : 'Add Qualification'
                                            }
                                        </p>
                                    </div>
                                    <form


                                        onSubmit={handleSubmit}
                                        className='px-3'>
                                        <div className='mt-3 '>
                                            <InputField inputType='text' placeholder='Batch Years' paddingY='py-2.5'
                                                name='QualificationName'
                                                value={QualificationData.QualificationName}
                                                handleChange={handleChange}
                                            />
                                            <p className="text-red-700">{errorMassage}</p>
                                        </div>

                                        <div className='text-end mt-7'>
                                            <Button1 onClickFunction={closeModal} buttonName='Close' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-red-900' bgColor='bg-white' hoverText='hover:text-white' textColor='text-red-700' />

                                            {
                                                name == 'Submit' ?
                                                    <Button1 buttonName='Submit' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                                                    :
                                                    <Button1 buttonName='Update' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />


                                            }

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        </>
    )
}

export default QualificationModal
