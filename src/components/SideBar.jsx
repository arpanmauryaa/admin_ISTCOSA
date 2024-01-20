import React from 'react'
import { useState } from 'react'
import Img from '../assets/Img.png'
import { AiOutlineDashboard } from "react-icons/ai";
import { FaHospitalUser } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsFillBuildingsFill } from "react-icons/bs";
import { PiCalendarPlusFill, PiUserListFill, PiNotebookDuotone } from "react-icons/pi";
import { MdOutlineBatchPrediction, MdTextsms, MdKeyboardArrowDown } from "react-icons/md";
import { FaIndustry } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowForward, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


function SideBar({ open }) {

    const location = useLocation()
    const path = location.pathname.split('/').pop()

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const dashboardNavigate = () => {
        navigate('/home/dashboard')
    }

    const userNavigate = () => {
        navigate('/home/user')
    }

    const batchesNavigation =()=>{
        navigate('/home/batches')
    }

    const rollNumberNavigation =()=>{
        navigate('/home/rollnumber')
    }

    const QualificationNavigation =()=>{
        navigate('/home/qualification')
    }

    const CompaniesNavigation =()=>{
        navigate('/home/companies')
    }

    const EmployementsNavigation =()=>{
        navigate('/home/employements')
    }

    const IndustriesNavigation =()=>{
        navigate('/home/industries')
    }

    const eventNavigation =()=>{
        navigate('/home/event')
    }

    const MarqueeLinkNavigation =()=>{
        navigate('/home/marquelink')
    }

    const CountriesNavigation =()=>{
        navigate('/home/countries')
    }

    const StatesNavigation =()=>{
        navigate('/home/states')
    }


    const citiesNavigation =()=>{
        navigate('/home/cities')
    }

 

    return (
        <>
            {
                open ?
                    <div className=' bg-white  border-r-2 h-full'>
                        <div className='flex border-b-2'>
                            <img src={Img} alt='img' className='py-5 me-3 ms-4 w-16' />
                            <div className='mt-2'>
                                <p className='mt-4 font-medium text-lg'>Admin</p>
                                <p className='text-sm'>admin@istcosa.com</p>
                            </div>
                        </div>


                        <div className='mt-2 ms-3'>
                            Pages
                        </div>


                        <div onClick={dashboardNavigate} className={`flex ${path === 'dashboard' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50 mt-3 py-3 cursor-pointer`}>
                            <AiOutlineDashboard className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Dashboard
                            </div>
                        </div>

                        <div onClick={userNavigate} className={`flex ${path === 'user' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <FaHospitalUser className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Users
                            </div>
                        </div>

                        <div onClick={batchesNavigation} className={`flex ${path === 'batches' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <MdOutlineBatchPrediction className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Batches
                            </div>
                        </div>

                        <div onClick={rollNumberNavigation} className={`flex ${path === 'rollnumber' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <PiUserListFill className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Roll Number
                            </div>
                        </div>


                        <div onClick={QualificationNavigation} className={`flex ${path === 'qualification' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <PiNotebookDuotone className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Qualifications
                            </div>
                        </div>

                        <div onClick={CompaniesNavigation} className={`flex ${path === 'companies' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <BsFillBuildingsFill className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Companise
                            </div>
                        </div>


                        <div onClick={IndustriesNavigation} className={`flex ${path === 'industries' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <FaIndustry className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Industries
                            </div>
                        </div>

                        <div onClick={EmployementsNavigation} className={`flex ${path === 'employements' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <BsPeopleFill className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Employements
                            </div>
                        </div>

                        <div onClick={eventNavigation} className={`flex ${path === 'event' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <PiCalendarPlusFill className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Event
                            </div>
                        </div>

                        <div onClick={MarqueeLinkNavigation} className={`flex ${path === 'marquelink' ? 'ps-5 border-l-4 border-red-900 bg-slate-50' : 'ps-6'} hover:bg-slate-50  py-3 cursor-pointer`}>
                            <MdTextsms className='mt-1 text-xl' />
                            <div className='ms-5'>
                                MarqueeLink
                            </div>
                        </div>

                        <div onClick={() => { setIsOpen((old => !old)) }} className='flex ps-6 mt-2 cursor-pointer  pb-2'>
                            <CiGlobe className='mt-1 text-xl' />
                            <div className='ms-5'>
                                Comman Type
                            </div>
                            {
                                isOpen ?
                                    <div className='mt-1.5 ms-10'>
                                        <IoIosArrowUp />
                                    </div>
                                    :
                                    <div className='mt-1.5 ms-10'>
                                        <IoIosArrowDown />
                                    </div>
                            }
                        </div>

                        {
                            isOpen ?
                                <div>

                                    <div onClick={CountriesNavigation} className={`flex ${path === 'countries' ? 'ms-10 border-l-4 border-red-900 bg-slate-50' : 'ms-11 me-10'} hover:bg-slate-50  py-2 me-10 cursor-pointer`}>
                                        <IoIosArrowForward className='mt-1' />
                                        <p className='ps-6'>Countries</p>
                                    </div>

                                    <div onClick={StatesNavigation} className={`flex ${path === 'states' ? 'ms-10 border-l-4 border-red-900 bg-slate-50' : 'ms-11 me-10'} hover:bg-slate-50  py-2 me-10  cursor-pointer`}>
                                        <IoIosArrowForward className='mt-1' />
                                        <p className='ps-6'>States</p>
                                    </div>

                                    <div onClick={citiesNavigation} className={`flex ${path === 'cities' ? 'ms-10  border-l-4 border-red-900 bg-slate-50' : 'ms-11 me-10'} hover:bg-slate-50  py-2 me-10  cursor-pointer`}>
                                        <IoIosArrowForward className='mt-1' />
                                        <p className='ps-6'>Cities</p>
                                    </div>

                                </div>
                                : null
                        }



                    </div>
                    :
                    null
            }
        </>
    )
}

export default SideBar