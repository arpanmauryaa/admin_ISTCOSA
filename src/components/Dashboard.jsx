import React from 'react'

function Dashboard() {
  const arr = [
    { id: 1, name: 'Registered Alumni', percentage: '1703 (47.25%)' },
    { id: 2, name: 'Non-Registered', percentage: '1901 (52.75%)' },
    { id: 3, name: 'Obituary', percentage: '1 (0.06%)' },
    { id: 4, name: 'Total Users', percentage: '3604' },
    { id: 5, name: 'Recent Registered', percentage: '1703 (47.25%)' },
    { id: 6, name: 'Life Member', percentage: '441 (25.90%)' },
    { id: 7, name: 'Mentor', percentage: '0 (0.00%)' },
    { id: 8, name: 'Batch Coordinator', percentage: '0 (0.00%)' },
  ];

  return (
    <>
      <div className='bg-slate-50 h-full'>
        <div className='pt-5 mx-5'>
          <div>
            <p className='text-red-900 bg-white font-bold text-3xl p-2.5 rounded-lg'>Dashboard</p>
          </div>

          <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-8'>
            {
              arr.map((item) => {
                return (
                  <>
                    <div className='border-2 border-red-900 text-center bg-white'>
                      <p className='bg-red-900 text-white font-medium text-lg p-2.5'>{item.name}</p>
                      <p className='text-xl mt-5'>{item.percentage}</p>
                      <div className='grid grid-cols-2 px-5 pb-5 mt-5'>
                        <div className='bg-gradient-to-l  from-red-900 h-0.5 '></div>
                        <div className='bg-gradient-to-r  from-red-900 h-0.5 '></div>
                      </div>
                    </div>
                  </>
                )
              })
            }


          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard