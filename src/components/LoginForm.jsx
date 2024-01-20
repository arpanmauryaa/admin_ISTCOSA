import React, { useEffect, useState } from 'react'

import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import { postAccount } from '../utils/api/margeapi';

function LoginForm() {

  const navigate = useNavigate()

  const [isChecked, setIsChecked] = useState(false)

  const [errorMassage, setErrorMassage] = useState({
    errorUserName: '',
    errorPassword: ''
  })

  const [loginData, setLoginData] = useState({
    UserName: '',
    Password: ''
  });

  const handleChange = (e) => {
    setLoginData((oldData) => ({ ...oldData, [e.target.name]: e.target.value, }));
    setErrorMassage((oldData) => ({ ...oldData, [`error${e.target.name}`]: '' }));
  };

  const showPassword = () => {
    setIsChecked(old => !old)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let isValid = true

    const error = ({
      errorUserName: '',
      errorPassword: '',
    })

    if (loginData.UserName == '') {
      error.errorUserName = 'Enter Email ID'
      isValid = false
    }

    if (loginData.Password == '') {
      error.errorPassword = 'Enter Password'
      isValid = false
    }

    if (!isValid) {
      setErrorMassage(error)
    }

    if (isValid) {
      // api for authentication and store token
      postAccount(loginData).then(response => {
        const token = response[0].Token
        if (token) {
          localStorage.setItem('admintoken', token);
          navigate('/home/dashboard')
        } else {
          console.log('Authentication failed')
        }
      }).catch(error => { 
        setErrorMassage({
          errorPassword : 'Enter currect password'
        })
      })
    }
  }



  return (
    <>

      <div>
        <NavBar />
      </div>


      <div className='justify-center flex mt-16 px-16'>
        <div className='bg-stone-100 shadow-xl  px-9'>

          <div className='pt-5'>
            <p className='font-bold text-center text-3xl Nametext-red-950'>Admin Login</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='mt-4 '>
              <label> Email </label>
              <div className='mt-1'>
                <input type="text"
                  name='UserName'
                  value={loginData.UserName}
                  onChange={handleChange}
                  placeholder="Enter Roll Number"

                  className={`bg-gray-50 border   text-sm rounded-lg ${errorMassage.errorUserName? '  border-red-500 ':'border-gray-300'} focus:border-blue-500 block focus:outline-none
                    w-full p-2.5 `}
                />
                <p className='text-red-600'>{errorMassage.errorUserName}</p>
              </div>
            </div>


            <div className='mt-5'>
              <label> Password </label>
              <div className='mt-1'>{console.log(isChecked, 'hii')
              }
                <input
                  type={isChecked ? "text" : "password"}
                  name='Password'
                  value={loginData.Password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className={`bg-gray-50 border   text-sm rounded-lg ${errorMassage.errorPassword? '  border-red-500 ':'border-gray-300'} focus:border-blue-500 block focus:outline-none
                  w-full p-2.5 `}
                />
                <p className='text-red-600'>{errorMassage.errorPassword}</p>
              </div>

            </div>

            <div className="flex justify-between my-4 ">
              <div>
                <input onClick={showPassword} id="default-checkbox" type="checkbox" value='' name='' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded    dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
              </div>
              <div>
                <a href="#" className="text-blue-800 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
            </div>



            <div className='w-full text-end lg:px-36 md:px-11 px-11 mt-6 pb-5'>
              <button type="button" className="focus:outline-none text-red-900 bg-white-700 hover:bg-red-900 focus:ring-2 hover:text-white focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-950 border border-red-900 ">Reset</button>
              <button type="submit" className="focus:outline-none text-white bg-white-700 hover:bg-white focus:ring-2 hover:text-black focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-white border border-red-900 bg-red-900 ">Submit</button>
            </div>
          </form>
        </div>
      </div>

      {/* <div>
        <div className='w-screen w-full'>
          <div className='justify-center md:mt-16 mt-9 lg:px-96 md:px-36 px-9'>
            <div className='bg-stone-100 shadow-xl  px-9'>

              <div className='pt-5'>
                <p className='font-bold text-center text-3xl Nametext-red-950'>Admin Login</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='mt-4 '>
                  <label> Email </label>
                  <div className='mt-1'>
                    <input type="text"
                      name='UserName'
                      value={loginData.UserName}
                      onChange={handleChange}
                      placeholder="Enter Roll Number"

                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                            w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p className='text-red-600'>{errorMassage.errorUserName}</p>
                  </div>

                </div>


                <div className='mt-5'>
                  <label> Password </label>
                  <div className='mt-1'>
                    <input type="text"
                      name='Password'
                      value={loginData.Password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                            w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <p className='text-red-600'>{errorMassage.errorPassword}</p>
                  </div>

                </div>

                <div className="flex justify-between my-4 ">
                  <div>
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                  </div>
                  <div>
                    <a href="#" className="text-blue-800 text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                </div>



                <div className='w-full text-end lg:px-36 md:px-11 px-11 mt-6 pb-5'>
                  <button type="button" className="focus:outline-none text-red-900 bg-white-700 hover:bg-red-900 focus:ring-2 hover:text-white focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-950 border border-red-900 ">Reset</button>
                  <button type="submit" className="focus:outline-none text-white bg-white-700 hover:bg-white focus:ring-2 hover:text-black focus:ring-red-900 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-white border border-red-900 bg-red-900 ">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}



    </>
  )
}

export default LoginForm