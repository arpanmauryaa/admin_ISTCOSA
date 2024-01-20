import React from 'react'

function DropdownField({ salect, apiData ,name ,value , handleChange , showvalue, show }) {
    return (
        <>
            <select className="w-full py-2 border-b-2 focus:outline-none focus:border-blue-500"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled selected value=''>{salect}</option>
                {
                    apiData?.map((item) => {
                        return (

                            <option value={item[showvalue]}>{item[show]}</option>
                        )
                    })
                }
            </select>
        </>
    )
}

export default DropdownField
