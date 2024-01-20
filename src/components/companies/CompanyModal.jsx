import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import InputField from '../globlecomponent/InputField';
import Button1 from '../globlecomponent/Button1';
import DropdownField from '../globlecomponent/DropdownField';
import { getbycity, getbystate, getcountry, postcompany, updatecompany } from '../../utils/api/company/CompanyAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CompanyModal({ name, id, CompanyName, CompanyAddress, EmailAddress, ContactNumber, CountryID, StateID, CityID, getCompanyDetails }) {
    const [isModal, setIsModal] = useState(false);
    const [country, setCountry] = useState()
    const [stateId, setStateID] = useState()
    const [cityId, setCityID] = useState()


    const [errorMassage, setErrorMassage] = useState({
        errorCompanyName: '',
        errorCompanyAddress: '',
        errorEmailAddress: '',
        errorContactNumber: '',
        errorCountryID: '',
        errorStateID: '',
        errorCityID: '',
    })

    const [addCompany, setAddCompany] = useState({
        CompanyName: '',
        CompanyAddress: '',
        EmailAddress: '',
        ContactNumber: '',
        CountryID: '',
        StateID: '',
        CityID: '',
        Active: true,
    })

    const handleChange = (e) => {
        setAddCompany((oldData => ({ ...oldData, [e.target.name]: e.target.value })))
        setErrorMassage((old => ({ ...old, [`error${e.target.name}`]: "" })))
    }

    const openModal = () => {
        setIsModal(true)
    }

    const closeModal = () => {
        setIsModal(false)
        setAddCompany('')
        setErrorMassage('')
    }



    useEffect(() => {
        getcountry().then(response => {
            setCountry(response.filter((item => { return item.Active == true })))
            console.log(response, 'response get country')
        }).catch(error => {
            console.log('error in get country')
        })
    }, [])


    useEffect(() => {
        getbycity(addCompany.StateID).then(response => {
            setCityID(response)
            console.log(response, 'response city')
        }).catch(error => {
            console.log('error in city api')
        })
    }, [addCompany.StateID])

    useEffect(() => {
        getbystate(addCompany.CountryID).then(response => {
            setStateID(response)
            console.log(response, 'response state')
        }).catch(error => {
            console.log('error in state  api')
        })
    }, [addCompany.CountryID])

    const handleSubmit = (event) => {
        event.preventDefault()
        let isValid = true
        const error = ({
            errorCompanyName: '',
            errorCompanyAddress: '',
            errorEmailAddress: '',
            errorContactNumber: '',
            errorCountryID: '',
            errorStateID: '',
            errorCityID: '',
        })

        if (!addCompany.CompanyName) {
            error.errorCompanyName = 'Enter Company Name'
            isValid = false
        }
        if (!addCompany.CompanyAddress) {
            error.errorCompanyAddress = 'Enter Company Name'
            isValid = false
        }
        if (!addCompany.EmailAddress) {
            error.errorEmailAddress = 'Enter Company Name'
            isValid = false
        }
        if (!addCompany.ContactNumber) {
            error.errorContactNumber = 'Enter Company Name'
            isValid = false
        }

        if (!addCompany.CountryID) {
            error.errorCountryID = 'Enter Company Name'
            isValid = false
        }
        if (!addCompany.StateID) {
            error.errorStateID = 'Enter Company Name'
            isValid = false
        }
        if (!addCompany.CityID) {
            error.errorCityID = 'Enter Company Name'
            isValid = false
        }

        if (!isValid) {
            setErrorMassage(error)
        }

        if (isValid) {
            name == 'Submit' ?
                postcompany(addCompany).then(response => {
                    console.log(response)
                    closeModal();
                    getCompanyDetails();
                    toast.success(' Data Added Successfully  !', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }).catch(error => {
                    console.log('error in post api')
                })


                :

                // update company details
                updatecompany(id, addCompany).then(response => {
                    console.log(response)
                    closeModal()
                    getCompanyDetails();
                    toast.success('Successfully Updated !', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }).catch((error => {
                    console.log('error in company update')
                }))
        }
    }

    // const updateCompany = (event) => {
    //     event.preventDefault()
    //     updatecompany(id, addCompany).then(response => {
    //         console.log(response)
    //         closeModal()
    //         getCompanyDetails();
    //     }).catch((error => {
    //         console.log('error in company update')
    //     }))
    //     console.log('Update')
    // }

    const editFunction = () => {
        openModal()
        setAddCompany({
            CompanyName: CompanyName,
            CompanyAddress: CompanyAddress,
            EmailAddress: EmailAddress,
            ContactNumber: ContactNumber,
            CountryID: CountryID,
            StateID: StateID,
            CityID: CityID,
        })
    }

    return (
        <>
            <div>
                <div>
                    {
                        name == 'Submit' ?

                            <FiPlusCircle onClick={openModal} className='mt-4 text-2xl text-red-900 me-4 cursor-pointer' />
                            :
                            <MdEdit onClick={editFunction}
                                className='cursor-pointer text-blue-700 text-2xl ' />

                    }
                </div>

                {
                    isModal ?
                        <div className=''>
                            <div id='containt' className='fixed inset-0 bg-black bg-opacity-30   flex items-center justify-center'>
                                <div className='bg-white p-3 rounded  md:w-2/5 w-60'>

                                    <div className='mt-2 px-3'>
                                        <p className='font-medium text-gray-700 text-center text-xl'>
                                            {
                                                name == 'Submit' ?
                                                    ' Add Company Details ' : 'Update Company Details '
                                            }
                                        </p>
                                    </div>
                                    <form
                                        // onSubmit={name == 'Submit' ? handleSubmit : updateCompany}
                                        onSubmit={handleSubmit}
                                        className='px-3'>
                                        <div className='grid grid-cols-2 gap-4 mt-3'>
                                            <div className='mt-3 '>
                                                <InputField inputType='text' placeholder='Enter Company Name' paddingY='py-2.5'
                                                    name='CompanyName'
                                                    value={addCompany.CompanyName}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorCompanyName}</p>
                                            </div>
                                            <div className='mt-3 '>
                                                <InputField inputType='text' placeholder='Company Address' paddingY='py-2.5'
                                                    name='CompanyAddress'
                                                    value={addCompany.CompanyAddress}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorCompanyAddress}</p>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2 gap-4 mt-3'>
                                            <div className='mt-3 '>
                                                <InputField inputType='text' placeholder='Email ID' paddingY='py-2.5'
                                                    name='EmailAddress'
                                                    value={addCompany.EmailAddress}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorEmailAddress}</p>
                                            </div>
                                            <div className='mt-3 '>
                                                <InputField inputType='text' placeholder='Contact Number' paddingY='py-2.5'
                                                    name='ContactNumber'
                                                    value={addCompany.ContactNumber}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorContactNumber}</p>
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-3 gap-4 mt-3'>
                                            <div className='mt-3 '>
                                                <DropdownField salect='Country *' apiData={country}
                                                    show='countryName'
                                                    showvalue='countryId'
                                                    name='CountryID'
                                                    value={addCompany.CountryID}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorCountryID}</p>
                                            </div>
                                            <div className='mt-3 '>
                                                <DropdownField salect='State *' apiData={stateId}
                                                    show='StateName'
                                                    showvalue='StateId'
                                                    name='StateID'
                                                    value={addCompany.StateID}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorStateID}</p>
                                            </div>

                                            <div className='mt-3 '>
                                                <DropdownField salect='City *' apiData={cityId}
                                                    show='CityName'
                                                    showvalue='CityId'
                                                    name='CityID'
                                                    value={addCompany.CityID}
                                                    handleChange={handleChange}
                                                />
                                                <p className='text-red-700 text-sm'>{errorMassage.errorCityID}</p>
                                            </div>
                                        </div>

                                        <div className='mt-4 '>
                                            <InputField inputType='file' placeholder='Upload Image' paddingY='py-2.5'
                                            />
                                        </div>

                                        <div className='text-end mt-8'>
                                            <Button1 onClickFunction={closeModal} buttonName='Close' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-red-900' bgColor='bg-white' hoverText='hover:text-white' textColor='text-red-700' />

                                            {
                                                name == 'Submit' ?
                                                    <Button1 buttonName='Submit' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                                                    :
                                                    <Button1 buttonName='Update' paddingX='px-3' paddingY='py-1' rounded='rounded-md' hoverBg='hover:bg-white' bgColor='bg-red-900' textColor='text-white' hoverText='hover:text-red-900' />
                                            }

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> : null
                }

            </div>
        </>
    )
}

export default CompanyModal
