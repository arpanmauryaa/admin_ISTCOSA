import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import HomePage from '../pages/HomePage'
import Dashboard from '../components/Dashboard'
import User from '../components/user/User'
import Batches from '../components/batches/Batches'
import RollNumber from '../components/rollnumber/RollNumber'
import Qualification from '../components/qualification/Qualification'
import Companies from '../components/companies/Companies'
import Industries from '../components/industries/Industries'
import Employements from '../components/employements/Employements'
import Event from '../components/event/Event'
import MarqueLink from '../components/marquelink/MarqueLink'
import Countries from '../components/commantype/Countries'
import States from '../components/commantype/States'
import Cities from '../components/commantype/Cities'
import Protect from '../components/Protect'

function Routing() {
  return (
    <>


    

      <Routes>
        <Route path='/' element={<LoginForm />} >
        </Route>


        <Route path='/home' element={< Protect Component={HomePage} />} >
          <Route path='/home/dashboard' element={<  Protect Component={Dashboard} />} />
          <Route path='/home/user' element={<User />} />
          <Route path='/home/batches' element={<Batches />} />
          <Route path='/home/rollnumber' element={<RollNumber />} />
          <Route path='/home/qualification' element={<Qualification />} />
          <Route path='/home/companies' element={<Companies />} />
          <Route path='/home/industries' element={<Industries />} />
          <Route path='/home/employements' element={<Employements />} />
          <Route path='/home/event' element={<Event />} />
          <Route path='/home/marquelink' element={<MarqueLink />} />
          <Route path='/home/countries' element={<Countries />} />
          <Route path='/home/states' element={<States />} />
          <Route path='/home/cities' element={<Cities />} />
        </Route>
      </Routes>
    </>
  )
}

export default Routing