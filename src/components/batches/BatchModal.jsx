
import { FiPlusCircle } from "react-icons/fi";
import { useState } from 'react';
import InputField from '../globlecomponent/InputField';
import Button1 from '../globlecomponent/Button1';
import { addBatch } from "../../utils/api/margeapi";


function BatchModal() {
    const [errorMassage, setErrorMassage] = useState('')
    const [isModal, setIsModal] = useState(false);
    const [BatchYear, setBatchYear] = useState('')

    const handleChange = (e) => {
        setBatchYear(e.target.value)
        setErrorMassage('')
    }


    const openModal = () => {
        setIsModal(true)
    }

    const closeModal = () => {
        setIsModal(false)
    }

    // const outerCloseModal = (e) => {
    //     if (e.target.id == 'containt') {
    //         setIsModal(false)
    //     }
    // }

    const addBatchYears = (event) => {
        event.preventDefault()
        let isValid = true
        const yearsPattern = /^[0-9]{4}$/;

        if (!BatchYear) {
            setErrorMassage('Enter Batch Years')
            isValid = false;
        } else if (!yearsPattern.test(BatchYear)) {
            setErrorMassage('Year should be 4 digits')
            isValid = false;
        }

        if (isValid) {
            addBatch(BatchYear).then(reponse => {
                const data = reponse
                toast.success('Successfully Deleted !', {
                    position: toast.POSITION.TOP_RIGHT
                  })
            }).catch(error => {
                console.log('error batch post api')
            })
            closeModal();
        }



    }




    return (
        <>
            <div>
                <div>
                    <FiPlusCircle onClick={openModal} className='mt-6 text-2xl text-red-900 me-4 cursor-pointer' />

                </div>

                {
                    isModal ?
                        <div className=''>
                            <div id='containt' className='fixed inset-0 bg-black bg-opacity-30   flex items-center justify-center'>
                                <div className='bg-white p-3 rounded  md:w-96  w-60'>

                                    <div className="mt-2">
                                        <p className='font-medium text-gray-700 text-center text-xl'>Add Batch Year</p>
                                    </div>
                                    <form onSubmit={addBatchYears} className="px-2">
                                        <div className='mt-4'>
                                            <InputField inputType='text' placeholder='Batch Years' paddingY='py-2.5'
                                                name='BatchYear'
                                                value={BatchYear}
                                                handleChange={handleChange}
                                            />
                                            <p className="text-red-700">{errorMassage}</p>
                                        </div>

                                        <div className='text-end mt-7'>
                                            <Button1 onClickFunction={closeModal} buttonName='Close' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-red-900' bgColor='bg-white' hoverText='hover:text-white' textColor='text-red-700' />
                                            <Button1 buttonName='Submit' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        </>
    );
}

export default BatchModal

