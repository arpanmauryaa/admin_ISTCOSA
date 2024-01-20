import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { FaCheck, FaToolbox, FaUser } from "react-icons/fa6";
import { BiSolidUserRectangle } from "react-icons/bi";
import { MdModeEdit, MdOutlineCancel } from 'react-icons/md';
import { registereduser } from '../../utils/api/user/UserAPI';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import UserModal from './modal/UserModal';

function AllUser({ redioValue ,filterData }) {
    const [allUser, setAllUser] = useState()

    const allUserFunction = () => {
        registereduser(redioValue).then(response => {
            const data = response
            setAllUser(data)
        })
    }


    useEffect(() => {
        allUserFunction();
    }, [])

    return (
        <>
            <div className='flex flex-wrap justify-between me-2 '>
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

                <div className='ps-5'>
                    pagination
                </div>
            </div>


            <div>
                <div className="bg-white overflow-x-auto no-scrollbar overflow-y-auto h-[600px] shadow-md mt-3">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
                                (filterData? filterData : allUser)?.map((item => {
                                    return (
                                        <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td scope="row" className="px-2 py-4  text-gray-900  dark:text-white">
                                                <div className='flex'>
                                                    <MdModeEdit className='text-xl text-blue-800 cursor-pointer' />
                                                    {/* <RxCross1 className='text-xl text-red-500 ms-1 cursor-pointer' /> */}
                                                    <UserModal iconValue={item.IsAlive} getFunction={allUserFunction} id={item.RollNumberID} />
                                                    {
                                                        item.MembershipType == "Alumni" ?
                                                            <FaUser className='text-lg ms-1 cursor-pointer' /> :
                                                            <HiMiniComputerDesktop className='text-xl ms-1 text-yellow-700  cursor-pointer' />
                                                    }
                                                    {/* <FaUser className='text-lg ms-1   cursor-pointer' /> */}
                                                    <FaToolbox className='text-lg  ms-1 cursor-pointer' />
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

                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

export default AllUser
