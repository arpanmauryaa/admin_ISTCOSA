import React from 'react'

function InputField({ id, inputType, disabled, name, value, handleChange, placeholder, bgColor, paddingX, paddingY }) {
    return (
        <>

            <div className='w-full'>
                <input type={inputType}
                    id={id}
                    disabled={disabled}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={`${placeholder ? `${placeholder}` : ''}`}
                    className={` ${bgColor} border-b-2 border-gray-400 text-gray-700  ${paddingX}
                         ${paddingY} w-full  leading-tight focus:outline-none focus:border-blue-500`}
                />

            </div>

        </>
    )
}

export default InputField