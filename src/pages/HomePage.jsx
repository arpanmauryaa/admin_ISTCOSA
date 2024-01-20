import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import { Outlet } from "react-router-dom";

// https://github.com/arpanmauryaa/administcosa.git


function HomePage() {
    const [isOpen, setIsOpen] = useState(true)

    const close = () => {
        setIsOpen(old => !old)
        console.log('hii')
    }

    return (
        <>
            <div className='fixed top-0 w-full'>
                <NavBar closeFunction={close} />
            </div>
            <div className='flex mt-16'>
                <div className={`${isOpen ? 'w-72' : null}`}>
                    <SideBar open={isOpen} />
                </div>
                <div className='h-screen w-screen'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default HomePage
