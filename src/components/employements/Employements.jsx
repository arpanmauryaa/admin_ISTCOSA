import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EmployementModal from './EmployementModal'

function Employements() {
  const [name, setName] = useState('')
  const [id, setID] = useState()

  const [errorMassage, setErrorMassage] = useState('')
  const [isOpen, setIsOpen] = useState(true)

  const open = () => {
    setIsOpen(false)
  }

  const close = () => {
    setIsOpen(true)
    setAddData('')
    setName('')
    setErrorMassage('')
  }

  const [employeData, setEmployeData] = useState()
  const [addData, setAddData] = useState({
    EmployementTypeName: '',
    Active: true
  })

  const handleChange = (e) => {
    setAddData((oldData => ({ ...oldData, [e.target.name]: e.target.value })))
    setErrorMassage('')
  }



  async function getData() {
    const api = await axios.get('http://dev-softwiz-002/EmploymentType')
      .then(response => {
        setEmployeData(response.data.filter((item => { return item.Active == true })))
      }).catch(error => {
        console.log('error')
      })
  }

  async function deleteData(id) {
    const api = await axios.delete(`http://dev-softwiz-002/EmploymentType/${id}`)
      .then(response => {
        getData();
        alert('Successfully Deleted')
      }).catch(error => {
        console.log('error')
      })
  }



  async function postData() {
    const api = await axios.post('http://dev-softwiz-002/EmploymentType', addData)
      .then(response => {
        getData()
        console.log(response)
      }).catch(error => {
        console.log('error')
      })
    // console.log(addData, 'hiiiiiiiiiii')
    setAddData('')
    close();
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!addData.EmployementTypeName) {
      setErrorMassage('Enter Employee Name')
    } else {
      postData();
    }

  }


  async function putData() {
    if (!addData.EmployementTypeName) {
      setErrorMassage('Enter Employee Name')
    } else {
      const api = await axios.put(`http://dev-softwiz-002/EmploymentType/${id}`, addData)
        .then(response => {
          getData()
          console.log(response)
        }).catch(error => {
          console.log('error')
        })
      close()
    }

  }

  const editData = (item) => {
    setID(item.EmploymentTypeID)
    setName('Edit')
    setAddData({
      EmployementTypeName: item.EmployementTypeName,
      Active: true
    })
    open();

  }





  useEffect(() => {
    getData();
  }, [])

  console.log(employeData, 'hhhhhhhhhh')


  return (
    <>
      <div className='flex justify-between mt-5 pb-3 bg-gray-200 mx-5'>
        <p className='px-5 py-2 mt-2 text-red-900 font-bold text-xl'>Employments</p>
        <button onClick={open} className='px-2 mt-2 bg-red-900 text-white rounded me-2'>Add</button>
      </div>

      <div className='px-5'>
        {
          !isOpen ?
            <div className='grid  mt-5 px-5 bg-gray-300 w-64 py-3'>

              <div className='text-end me-5'>
                <button onClick={close} className='rounded text-red-900 px-2 font-bold'>Close</button>
              </div>
              <p className='text-center mt-5'>{!addData.EmployementTypeName ? 'Add Data' : 'Update Data'}</p>
              <div className='mt-5 justify-center'>
                <input type='text'
                  name='EmployementTypeName'
                  value={addData.EmployementTypeName}
                  onChange={handleChange}
                  className='border' />
                <p className='text-red-700'>{errorMassage}</p>
              </div>
              <div className='text-end mt-4 me-8 text-red-900 font-bold'>
                {
                  !name ?
                    < button onClick={handleSubmit}>Add</button>
                    :
                    <button onClick={putData}>Update</button>
                }




              </div>

            </div>


            : null
        }
      </div >


      <div className='px-5 mt-5'>
        <table className='border overflow-x-auto row-auto'>
          <thead>
            <tr className='text-white bg-red-900'>
              <th className='py-2'>Employment Name</th>
              <th className='flex justify-end py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employeData?.map((item => {
                return (
                  <tr>
                    <td>{item.EmployementTypeName}</td>
                    <td>
                      <button onClick={() => editData(item)} className='bg-red-900 text-white rounded px-2'>Edit</button>
                      <button onClick={() => deleteData(item.EmploymentTypeID)} className='ms-3 bg-red-900 text-white rounded px-2'>Delete</button>
                    </td>
                  </tr>
                )
              }))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Employements