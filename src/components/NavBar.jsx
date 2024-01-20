import React from 'react'
import Logo from '../assets/Logo.png'
import { LuLogIn } from "react-icons/lu";
import { FaBars } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";


function NavBar({ closeFunction }) {
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname


    const data = localStorage.getItem('token');

    const deleteLocalStorage = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <>
            <div className='flex flex-wrap bg-neutral-100 justify-between'>
                <div className='flex ps-5'>
                    <FaBars onClick={closeFunction} className='mt-6 text-xl cursor-pointer' />
                    <img src={Logo} alt='logo' className='p-1 ps-5 py-3' width={150} height={150} />
                </div>
                <div>
                    {
                        path == '/' ?
                            <LuLogIn data-tooltip-target="tooltip-default" className='text-xl me-4 mt-4 cursor-pointer ' />
                            :
                            <FaRegUser onClick={deleteLocalStorage} className='text-xl me-4 mt-4 cursor-pointer text-red-900' />
                    }
                </div>


            </div>
        </>
    )
}

export default NavBar

