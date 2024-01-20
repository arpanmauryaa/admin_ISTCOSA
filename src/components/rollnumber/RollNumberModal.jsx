import React, { useState } from 'react'
import { FiPlusCircle } from "react-icons/fi";
import InputField from '../globlecomponent/InputField';
import Button1 from '../globlecomponent/Button1';
import { rollnumberpostbatch } from '../../utils/rollnumberapi/RollNumberAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function RollNumberModal({ batchYears }) {
  const [errorMassage, setErrorMassage] = useState({
    errorBatchID: '',
    errorStartRollNumbers: '',
    errorEndRollNumbers: ''
  })
  const [isModal, setIsModal] = useState(false)
  const [addBatch, setAddBatch] = useState({
    BatchID: '',
    StartRollNumbers: '',
    EndRollNumbers: '',
  })

  const handlChange = (e) => {
    setAddBatch((oldData => ({ ...oldData, [e.target.name]: e.target.value })))
    setErrorMassage((old => ({ ...old, [`error${e.target.name}`]: "" })))
  }

  const openModal = () => {
    setIsModal(true)
  }

  const closeModal = () => {
    setIsModal(false)
    setAddBatch('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let isValid = true
    const pattern = /^[0-9]{4}$/;
    const error = ({
      errorBatchID: '',
      errorStartRollNumbers: '',
      errorEndRollNumbers: ''
    })

    if (!addBatch.BatchID) {
      error.errorBatchID = 'Select Batch ID'
      isValid = false
    }
    if (!addBatch.StartRollNumbers.match(pattern)) {
      error.errorStartRollNumbers = '4-digit Start Roll Number';
      isValid = false;
    }
    if (!addBatch.EndRollNumbers) {
      error.errorEndRollNumbers = '4-digit End Roll Number'
      isValid = false
    }

    if (!isValid) {
      setErrorMassage(error)
    }

    if (isValid) {
      rollnumberpostbatch(addBatch).then((response=>{
        toast('Sucessfully Added !', {
          position: toast.POSITION.TOP_RIGHT
      })
      })).catch(error=>{
        console.log('error in post bach api')
      })
      console.log(addBatch, 'addBatch')
      closeModal();
    }

  }

  return (
    <>
      <div>
      <ToastContainer />
        <div>
          <FiPlusCircle onClick={openModal} className='mt-6 text-2xl text-red-900 me-4 cursor-pointer' />
        </div>

        {
          isModal ?

            <div className=''>
              <div id='containt' className='fixed inset-0 bg-black bg-opacity-30   flex items-center justify-center'>
                <div className='bg-white p-3 rounded  md:w-96  w-60'>

                  <div className='mt-2'>
                    <p className='font-medium text-gray-700 text-center text-2xl'>Add Batch Year</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className='mt-4'>
                      <select className="w-full py-2 border-b-2 focus:outline-none focus:border-blue-500" name='BatchID' value={addBatch.BatchID} onChange={handlChange}>
                        <option disabled selected value=''>Select</option>
                        {
                          batchYears?.map((item) => {
                            return (

                              <option>{item.BatchID}</option>
                            )
                          })
                        }
                      </select>
                      <p className="text-red-700 text-sm">{errorMassage.errorBatchID}</p>
                    </div>

                    <div className='grid grid-cols-2 mt-5 gap-4'>
                      <div>
                        <InputField paddingY='py-2' placeholder='Start Roll Number *' handleChange={handlChange}
                          name="StartRollNumbers"
                          value={addBatch.StartRollNumbers}
                        />
                        <p className="text-red-700 text-sm">{errorMassage.errorStartRollNumbers}</p>
                      </div>
                      <div>
                        <InputField paddingY='py-2' placeholder='End Roll Number *' handleChange={handlChange}
                          name="EndRollNumbers"
                          value={addBatch.EndRollNumbers}
                        />
                        <p className="text-red-700 text-sm">{errorMassage.errorEndRollNumbers}</p>
                      </div>
                    </div>


                    <div className='text-end mt-7'>
                      <Button1 onClickFunction={closeModal} buttonName='Close' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-red-900' bgColor='bg-white' hoverText='hover:text-white' textColor='text-red-700' />
                      <Button1 buttonName='Submit' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            : null
        }

      </div>
    </>
  )
}

export default RollNumberModal
