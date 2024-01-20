import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import InputField from '../globlecomponent/InputField'
import { deletecompany, getcompany } from '../../utils/api/company/CompanyAPI'
import { MdEdit } from 'react-icons/md'
import Conformation from '../globlecomponent/Conformation'
import CompanyModal from './CompanyModal'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Companies() {

  const [filterData, setFilterData] = useState()
  const [companyData, setCopanyData] = useState()

  const getCompanyDetails = () => {
    getcompany().then((response => {
      const data = response.filter((item => { return (item.Active == true) }))
      setCopanyData(data)
      setFilterData(data)
      // console.log(data, 'data of company')
    })).catch((error => {
      console.log('error in get company api')
    }))
  }
  useEffect(() => {
    getCompanyDetails();
  }, [])


  const filterFunction = (e) => {
    const data = companyData.filter((x) => x.CompanyName.toString().includes(e.target.value))
    setFilterData(data)
  }

  const deleteCompany = (id, closeModal) => {
    deletecompany(id).then(response => {
      getCompanyDetails();
      closeModal();
      toast.success('Successfully Deleted !', {
        position: toast.POSITION.TOP_RIGHT
      })
    }).catch(error => {
      console.log('error in delete company')
    })
  }



  return (
    <>
      <div className='bg-slate-50 h-full'>

        <div className='pt-5 px-5'>
          <ToastContainer />
          <div className='flex justify-between bg-white'>
            <div>
              <p className='text-red-900  font-bold rounded-lg text-3xl px-3 py-2'>Companies</p>
            </div>

            <div>
              <CompanyModal name='Submit' getCompanyDetails={getCompanyDetails} />
            </div>
          </div>

          <div>
            <div className='mt-5 px-5 grid grid-cols-1 '>
              <InputField inputType='text' paddingY='py-2.5' placeholder='Filter by Name...' handleChange={filterFunction}
              />
            </div>
          </div>


          <div className=" overflow-x-auto no-scrollbar overflow-y-auto h-[600px] shadow-md mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-md bg-red-900 text-white   dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    Company Name
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Company Address
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Email ID
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Contact No.
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
                        <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                          {item.CompanyName}
                        </td>
                        <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                          {item.CompanyAddress}
                        </td>
                        <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                          {item.EmailAddress}
                        </td>
                        <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                          {item.ContactNumber}
                        </td>
                        <td className="pe-4 py-4 justify-end flex text-lg">
                          {/* name='Submit' getQualification1={getQualification} qualificationName={item.QualificationName} id={item.QualificationID} */}
                          <CompanyModal getCompanyDetails={getCompanyDetails} id={item.CompanyID} CompanyName={item.CompanyName} CompanyAddress={item.CompanyAddress}
                            EmailAddress={item.EmailAddress} ContactNumber={item.ContactNumber} CountryID={item.CountryID}
                            StateID={item.StateID} CityID={item.CityID}
                          />
                          <Conformation deleteBatches={deleteCompany} id={item.CompanyID} />
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

export default Companies