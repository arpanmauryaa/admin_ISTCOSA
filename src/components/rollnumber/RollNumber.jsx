import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import InputField from '../globlecomponent/InputField'
import { deleterollNumber, getrollnumberbybatch, rollnumbergetbatch } from '../../utils/rollnumberapi/RollNumberAPI'
import Conformation from '../globlecomponent/Conformation'
import RollNumberModal from './RollNumberModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RollNumber({ closeModal }) {
  const [batchYears, setBatchYears] = useState()
  const [dataByBatch, setDataByBatch] = useState()
  const [filterByInputField, setFilterByInputField] = useState([])

  const [addData, setAddData] = useState({
    StartRollNumbers: '',
    EndRollNumbers: '',
    BatchID: '',
  })
  const handleChange = (e) => {
    setAddData((oldData => ({ ...oldData, [e.target.name]: e.target.value })))
  }


  // get batch in dropdown
  useEffect(() => {
    rollnumbergetbatch().then(response => {
      setBatchYears(response.filter((item => { return item.Active == true })))
      console.log(response)

    }).catch(error => {
      console.log('error in Rollnuber get batch api')
    })
  }, [])


  // grt rollNumber by batch
  useEffect(() => {
    getrollnumberbybatch(addData.BatchID).then(response => {
      setDataByBatch(response)

      setFilterByInputField(response)
      console.log(response, 'byBatch')
    }).catch(error => {
      console.log('Error in Get RollNumber By Batch API')
    })
  }, [addData.BatchID])


  // Delete Roll Number
  const deleteRollNumber = (id, closeModal) => {
    deleterollNumber(id).then(response => {
      console.log(response)
      closeModal();
      toast('Sucessfully Delete !', {
        position: toast.POSITION.TOP_RIGHT
      })
    }).catch((error => {
      console.log('error in delete Roll number api')
    }))
  }


  const filterData = (e) => {
    let data = dataByBatch?.filter((item => item?.RollNumberID.toString().includes(e.target.value)))
    setFilterByInputField(data)
  }






  return (
    <>
      <div className='bg-slate-50 h-full'>
        <ToastContainer />
        <div className='pt-5 px-5'>
          <div className='grid grid-cols-2'>
            <div>
              <p className='text-red-900  font-bold rounded-lg text-3xl bg-white px-3 py-4'>Roll Numbers</p>
            </div>

            <div className='bg-white flex justify-end'>
              {/* <FiPlusCircle className='mt-6 text-2xl text-red-900 me-4 cursor-pointer' /> */}
              <RollNumberModal batchYears={batchYears} />
            </div>
          </div>


          <div className='grid grid-cols-3 mt-5 gap-4'>
            <div className='ms-3 '>
              <select className="w-full py-2 border-b-2 focus:outline-none focus:border-blue-500 " name='BatchID' value={addData.BatchID} onChange={handleChange} aria-label="Default select example">
                <option disabled selected value=''>Select</option>
                {
                  batchYears?.map((item) => {
                    return (

                      <option>{item.BatchID}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className='col-span-2'>
              <InputField placeholder='Filter' paddingY='py-2.5' handleChange={filterData} />
            </div>
          </div>


          {
            !addData.BatchID ?
              <div className=' mt-2 px-5 bg-white text-center font-bold text-gray-600 rounded-md border'>
                <p className='pt-5 pb-96'>Select Batch Year First</p>
              </div>

              :

              <div className=" overflow-x-auto shadow-md mt-3">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-md bg-red-900 text-white   dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-2">
                        Batch Year
                      </th>

                      <th scope="col" className="px-6 py-3 text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      // (filterByInputField[0]? filterByInputField : dataByBatch)?.map(((item, index)
                      filterByInputField?.map(((item, index) => {
                        return (
                          <tr key={index} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                              {item.RollNumberID}
                            </td>
                            <td className="pe-8 py-4 justify-end flex text-2xl">
                              {/* <MdDelete onClick={() => deleteBatches(item.BatchID)} className='cursor-pointer text-red-900 ' /> */}
                              <Conformation deleteBatches={deleteRollNumber} id={item.RollNumberID} />
                              {/* deleteBatches={deleteBatches} id={item.BatchID} */}
                            </td>
                          </tr>
                        )
                      }))
                    }


                    {/* <div className=' pb-5 flex justify-end w-full'>
                      <div className='flex  '>
                        <div className='mt-2'>
                          Item per page :
                        </div>
                        <div className='ms-3 '>
                          <select
                            name='itemPage'
                            value={itemPage}
                            onChange={dropChange}
                            className=" bg-slate-50 border-b  border-gray-400 text-gray-700 px-2 py-1.5 
                          w-full  leading-tight focus:outline-none focus:border-blue-500"
                          >
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                          </select>
                        </div>
                      </div>
  
                      <div className='ms-10 mt-2'>
                        <p>{initialState} - {initialState + itemPerPage} of 36</p>
                      </div>
  
  
                      <div className='flex ms-10 mt-2 '>
                        <MdKeyboardDoubleArrowLeft onClick={firstPage} className='text-2xl font-medium cursor-pointer' />
                        <MdArrowBackIos className='ms-6 text-md mt-1 font-medium cursor-pointer' />
                        <MdArrowForwardIos className='ms-6 text-md mt-1 font-medium cursor-pointer' />
                        <MdKeyboardDoubleArrowRight onClick={lastPage} className='ms-6 text-2xl font-medium cursor-pointer' />
                      </div>
                    </div> */}

                  </tbody>
                </table>
              </div>

          }



        </div>
      </div >
    </>
  )
}

export default RollNumber