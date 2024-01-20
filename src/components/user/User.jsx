import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import InputField from '../globlecomponent/InputField'
import { IoIosSearch } from "react-icons/io";
import Registerd from './Registerd';
import NonRegisterd from './NonRegisterd';
import LifeMember from './LifeMember';
import Obituary from './Obituary';
import AllUser from './AllUser';
import { allUser } from '../../utils/api/user/UserAPI';


function User() {
  const [redioValue, setRedioValue] = useState('registered')
  const [filterData,setFilterData] = useState()
  const [search, setSearch] = useState('')

  const handlChange = (e) => {
    setSearch(e.target.value)
  }

  const handleChange = (e) => {
    setRedioValue(e.target.value)
    setFilterData('')
    setSearch('')
  }

  const allUserFunction = () => {
    allUser(search).then((response => {
      setFilterData(response)
      setRedioValue('all-user')
    })).catch(error => {
      console.log('error in all userApi')
    })
  }


  return (
    <>
      <div className='bg-slate-50 h-full'>
        <div className='pt-5 px-5'>

          <div className='flex md:justify-between   bg-white '>
            <div>
              <p className='text-red-900  font-bold rounded-lg text-3xl bg-white px-3 py-2'>Users</p>
            </div>
            <div className='bg-white flex justify-end'>
              <FiPlusCircle className='mt-4 text-2xl text-red-900 me-4 cursor-pointer' />
            </div>
          </div>


          <div className='flex flex-wrap justify-between'>
            <div className='flex flex-wrap mt-7 '>
              <div class="flex ps-4">
                <input id="default-radio-1" type="radio"
                  checked={redioValue === 'registered'}
                  value='registered'
                  name="redioValue"
                  onClick={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />
                <label class="ms-1 text-sm font-medium">Registerd</label>
              </div>

              <div class="flex ps-4">
                <input id="default-radio-1" type="radio"
                  value='non-registered'
                  name="redioValue"
                  onClick={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300    " />
                <label class="ms-1 text-sm font-medium">Non-Registerd</label>
              </div>

              <div class="flex ps-4">
                <input id="default-radio-1" type="radio"
                  value='life-member'
                  name="redioValue"
                  onClick={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300    " />
                <label class="ms-1 text-sm font-medium">Life-Member</label>
              </div>

              <div class="flex ps-4">
                <input id="default-radio-1" type="radio"
                  value='obituary'
                  name="redioValue"
                  onClick={handleChange}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300    " />
                <label class="ms-1 text-sm font-medium">Obituary</label>
              </div>

              <div class="flex ps-4">
                <input id="default-radio-1" type="radio"
                  value='all-user'
                  name="redioValue"
                  onClick={handleChange}
                  checked={redioValue === 'all-user'}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300    " />
                <label class="ms-1 text-sm font-medium">All User</label>
              </div>

            </div>

            <div className='flex mt-5  '>
              <InputField placeholder='search by batch'
                name='search'
                value={search}
                handleChange={handlChange}
              />
              <IoIosSearch
                onClick={search ? allUserFunction : null} className='bg-white text-xl mt-1' />
            </div>
          </div>


          <div className='mt-8 border'>
            {
              redioValue == 'registered' ? <Registerd redioValue={redioValue} /> : null
            }
            {
              redioValue == 'non-registered' ? <NonRegisterd redioValue={redioValue} /> : null
            }
            {
              redioValue == 'life-member' ? <LifeMember redioValue={redioValue} /> : null
            }
            {
              redioValue == 'obituary' ? <Obituary redioValue={redioValue} /> : null
            }
            {
              redioValue == 'all-user' ? <AllUser redioValue={redioValue} allUserFunction={allUserFunction} filterData={filterData} /> : null
            }

          </div>


        </div>
      </div>
    </>
  )
}

export default User