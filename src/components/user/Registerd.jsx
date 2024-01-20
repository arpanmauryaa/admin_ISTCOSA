import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { FaCheck, FaToolbox, FaUser } from "react-icons/fa6";
import { BiSolidUserRectangle } from "react-icons/bi";
import { MdModeEdit, MdOutlineCancel } from 'react-icons/md';
import { registereduser } from '../../utils/api/user/UserAPI';
import UserModal from './modal/UserModal';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { BsChevronBarLeft, BsChevronBarRight } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';




function Registerd({ redioValue }) {
    const arr = [1, 2, 3, 4, 5]
    const [id, setId] = useState()
    const [plusButton, setButton] = useState(arr)
    const [registerData, setRegisterData] = useState()

    const [initialState, setInitialState] = useState(1)
    const [lastIndex, setLastIndex] = useState(50)

    // const lastIndex = initialState * recordPerPage;
    // const firstIndex = lastIndex - recordPerPage;

    const functionForAdd =()=>{
        setButton(arr[arr.length] = arr.length + 1)
        console.log(arr,'arrr')
    }

    const getFunction = (closeModal, trueUser) => {
        registereduser(redioValue).then(response => {
            const data = response
            setRegisterData(data)
        })
    }

    
    useEffect(() => {
        getFunction();
    }, [])

    return (
        <>
            <div className='grid md:grid-cols-2 me-2 '>
                <div className=' flex py-4 flex-wrap'>
                    <div className='flex ps-5 '>
                        <RxCross1 className='text-red-600 font-bold cursor-pointer' />
                        <p className='text-xs ps-2'>De-Activate</p>
                    </div>
                    <div className='flex ps-5 '>
                        <FaCheck className='text-blue-600 font-bold cursor-pointer' />
                        <p className='text-xs ps-2'>Activate</p>
                    </div>
                    <div className='flex ps-5'>
                        <BiSolidUserRectangle className='text-red-900 font-bold cursor-pointer' />
                        <p className='text-xs ps-2'>Alive</p>
                    </div>
                    <div className='flex ps-5'>
                        <MdOutlineCancel className=' font-bold cursor-pointer' />
                        <p className='text-xs ps-2'>Obituary</p>
                    </div>
                </div>

                <div className='flex flex-wrap justify-end md:ps-15 ps-5 text-gray-600'>
                    <p className='md:mt-4'>{initialState} - {lastIndex} of 1481 </p>
                    <BsChevronBarLeft onClick={functionForAdd} className='lg:ms-8 md:mt-5 cursor-pointer' />
                    <IoIosArrowBack className='lg:ms-8 md:mt-5 cursor-pointer' />
                    {
                        plusButton?.map((item => {
                            return (
                                <p className='ms-8 md:mt-4 cursor-pointer'>{item}</p>
                            )
                        }))
                    }
                    <IoIosArrowForward className=' lg:ms-8 md:mt-5 cursor-pointer' />
                    <BsChevronBarRight className='lg:ms-8 md:mt-5 cursor-pointer' />



                </div>
            </div>


            <div>
                <div className=" overflow-x-auto no-scrollbar overflow-y-auto h-[600px] shadow-md mt-3">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-md bg-red-900 text-white   dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-2">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Roll Number
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-2">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-right">
                                    Phone
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                registerData?.map((item => {
                                    return (
                                        <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" className="px-2 py-4  text-gray-900  dark:text-white">
                                                <div className='flex'>
                                                    <MdModeEdit className='text-xl text-blue-800 cursor-pointer' />
                                                    {/* <RxCross1 className='text-xl text-red-700 ms-1 cursor-pointer' /> */}
                                                    <UserModal iconValue={item.IsAlive} getFunction={getFunction} id={item.RollNumberID} />
                                                    {
                                                        item.MembershipType == "Alumni" ?
                                                            <FaUser className='text-lg ms-1 cursor-pointer' /> :
                                                            <HiMiniComputerDesktop className='text-xl ms-1 text-yellow-700  cursor-pointer' />
                                                    }

                                                    <FaToolbox className='text-lg text-gray-600 ms-1 cursor-pointer' />
                                                    <BiSolidUserRectangle className='text-xl text-red-900 ms-1 cursor-pointer' />
                                                </div>
                                            </td>
                                            <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                                                {item.RollNumberID}
                                            </td>
                                            <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                                                {item.FullName}
                                            </td>
                                            <td scope="row" className="px-6 py-4  text-gray-900  dark:text-white">
                                                {item.Email}
                                            </td>
                                            <td className="pe-4 py-4 justify-end flex">
                                                {item.PhoneNumber}
                                            </td>
                                        </tr>
                                    )
                                }))
                            }




                            {/* {
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
                          <CompanyModal getCompanyDetails={getCompanyDetails} id={item.CompanyID} CompanyName={item.CompanyName} CompanyAddress={item.CompanyAddress}
                            EmailAddress={item.EmailAddress} ContactNumber={item.ContactNumber} CountryID={item.CountryID}
                            StateID={item.StateID} CityID={item.CityID}
                          />
                          <Conformation deleteBatches={deleteCompany} id={item.CompanyID} />
                        </td>
                      </tr>
                    )
                  }))
                } */}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Registerd
