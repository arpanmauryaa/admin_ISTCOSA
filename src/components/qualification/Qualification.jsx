import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { qualification, qualificationDelete } from '../../utils/api/qualificationapi/QualificationAPI'
import { MdDelete, MdEdit } from 'react-icons/md'
import QualificationModal from './QualificationModal'
import Conformation from '../globlecomponent/Conformation'

function Qualification() {
  const [filterData ,setFilterData] = useState()
  const [qualificationData, setQualificationData] = useState()

  // get qualification Data
  const getQualification = () => {
    qualification().then(response => {
      const data = response.filter((item => { return item.Active == true }))
      setQualificationData(data)
      setFilterData(data)
    })
  }
  useEffect(() => {
    getQualification();
  }, [])

  // delete qualification Data
  const deleteQualification = (id, closeModal) => {
    qualificationDelete(id).then((response => {
      const data = response
      closeModal();
      getQualification()
    })).catch(error => {
      console.log('error in delete qualification api')
    })
  }

  const filterFunction = (e) => {
    const datas = qualificationData.filter((x) => x.QualificationName?.toString().includes(e.target.value));
    setFilterData(datas)
  };




  return (
    <>
      <div className='bg-slate-50 h-full'>
        <div className='pt-5 px-5'>
          <div className='grid grid-cols-2'>
            <div>
              <p className='text-red-900  font-bold rounded-lg text-3xl bg-white px-3 py-2'>Qualifications</p>
            </div>

            <div className='bg-white flex justify-end'>
              <QualificationModal name='Submit' getQualification={getQualification} />
              {/* <FiPlusCircle className='mt-4 text-2xl text-red-900 me-4 cursor-pointer' /> */}
              {/* <RollNumberModal batchYears={batchYears} /> */}
            </div>
          </div>

          <div className='mt-4 ms-3'>
            <input type='text' className='w-full border-b-2 bg-slate-50 focus:outline-none focus:border-blue-500' placeholder='Filter by Name'
              onChange={filterFunction}
            />
          </div>


          <div className=" overflow-x-auto shadow-md mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-md bg-red-900 text-white   dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    Qualification Type
                  </th>

                  <th scope="col" className="px-6 py-3 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {
                  filterData?.map(((item, index) => {
                    return (
                      <tr key={index} className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" className="px-6 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                          {item.QualificationName}
                        </td>
                        <td className="pe-4 py-4 justify-end flex text-2xl">
                          {/* <MdEdit onClick={() => deleteBatches()} className='cursor-pointer text-blue-700 ' /> */}
                          <QualificationModal getQualification1={getQualification} qualificationName={item.QualificationName} id={item.QualificationID} />
                          <Conformation deleteBatches={deleteQualification} id={item.QualificationID} />
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
        </div>
      </div>
    </>
  )
}

export default Qualification