import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => { if (aToken) getAllDoctors() }, [aToken])

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Doctors List</h1>
        <p className='text-gray-400 text-sm mt-1'>{doctors.length} doctors registered</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {doctors.map((item, i) => (
          <div
            key={item._id}
            className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover group'
            style={{ animation: `fadeInUp 0.5s ease ${Math.min(i,10)*60}ms both` }}
          >
            <div className='bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden'>
              <img
                src={item.image} alt={item.name}
                className='w-full h-40 object-cover object-top group-hover:scale-105 transition-transform duration-500'
              />
            </div>
            <div className='p-4'>
              <p className='font-semibold text-gray-800 text-sm mb-0.5 truncate'>{item.name}</p>
              <p className='text-gray-400 text-xs mb-3 truncate'>{item.speciality}</p>
              <label className='flex items-center gap-2 cursor-pointer'>
                <div
                  onClick={() => changeAvailability(item._id)}
                  className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${item.available ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${item.available ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                </div>
                <span className={`text-xs font-medium ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
                  {item.available ? 'Available' : 'Off'}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
