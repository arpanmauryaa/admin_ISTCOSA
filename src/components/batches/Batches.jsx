import React, { useEffect, useState } from 'react'
import InputField from '../globlecomponent/InputField';
import { MdArrowBackIos, MdArrowForwardIos, MdDelete, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { deletebatch, getBatch } from '../../utils/api/margeapi';
import BatchModal from './BatchModal';
import Conformation from '../globlecomponent/Conformation';



function Batches() {

  const [initialState, setInitialState] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(10)
  const [mapData, setMapData] = useState([])
  const [batchYears, setBatchYears] = useState([])
  const [batchInput, setBatchID] = useState('')

  const [itemPage, setItemPage] = useState(10)

  const handlChange = (e) => {
    setBatchID(e.target.value)
  }

  const dropChange = (e) => {
    setItemPage(e.target.value)
  }


  // get Batch api  
  const getBatchFunction = () => {
    getBatch().then(response => {
      const data = response.filter((item => { return (item.Active == true) }))
      setBatchYears(data)
      setMapData(data)
    }).catch(error => {
      console.log('error batch api')
    })
  }


  // filter for delete batchYears
  const deleteBatches = (id,closeModal) => {
    deletebatch(id).then(response => {
      closeModal()
      getBatchFunction();

    })
    console.log(id, 'hii')
  }

  // filtering data
  const yearFilter = () => {
    const datas = batchYears.filter((x) => x.BatchID?.toString().includes(batchInput));
    setMapData(datas);
  };



  const firstPage = () => {
    console.log('hi')
  }

  const lastPage = () => {
    console.log('bye')
  }

  // useEffect for yearFilter
  useEffect(() => {
    yearFilter();
  }, [batchInput])

  // useEffect for batch get api
  useEffect(() => {
    getBatchFunction();
  }, [])

  return (
    <>
      <div className='bg-slate-50 h-full'>
        <div className='pt-5 px-5'>
          <div className='grid grid-cols-2'>
            <div>
              <p className='text-red-900  font-bold rounded-lg text-3xl bg-white px-3 py-4'>Batches</p>
            </div>

            <div className='bg-white flex justify-end'>
              <BatchModal />
            </div>
          </div>
        </div>

        <div className='mt-5 px-5 grid grid-cols-1 '>
          <InputField inputType='text' paddingY='py-2.5' placeholder='Filter'
            name='BatchID'
            value={batchInput}
            handleChange={handlChange}
          />
        </div>

        <div className='mx-5 mt-2'>
          <div className=" overflow-x-auto shadow-md ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-md bg-red-900 text-white   dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Batch Year
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  mapData.map(((item, index) => {
                    return (
                      <tr key={index} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                          {item.BatchID}
                        </td>
                        <td className="pe-8 py-4 justify-end flex text-2xl">
                          {/* <MdDelete onClick={() => deleteBatches(item.BatchID)} className='cursor-pointer text-red-900 ' /> */}
                          <Conformation deleteBatches={deleteBatches} id= {item.BatchID}/>
                        </td>
                      </tr>
                    )
                  }))
                }


                <div className=' pb-5 flex justify-end w-full'>
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
                </div>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Batches