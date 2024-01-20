import React, {  Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protect({Component}) {
    const navigate = useNavigate()

    const data = localStorage.getItem('admintoken');

    const fun = () => {
        if (!data) {
            navigate('/')
        }
    }

    useEffect(() => {
        fun();
    },[])


    return (
        <>
            <Component/>
        </>
    )
}
export default Protect