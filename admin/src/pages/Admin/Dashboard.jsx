import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData ? (
    <div className='m-5'>
      {/* Stats Cards */}
      <div className='flex flex-wrap gap-3'>
        {[
          { icon: '👨‍⚕️', label: 'Doctors', value: dashData.doctors, path: '/doctor-list' },
          { icon: '📅', label: 'Appointments', value: dashData.appointments, path: '/all-appointments' },
          { icon: '👥', label: 'Patients', value: dashData.patients, path: null },
        ].map((stat, i) => (
          <div
            key={i}
            onClick={() => stat.path && navigate(stat.path)}
            className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'
          >
            <span className='text-4xl'>{stat.icon}</span>
            <div>
              <p className='text-xl font-semibold text-gray-600'>{stat.value}</p>
              <p className='text-gray-400'>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Appointments */}
      <div className='bg-white mt-10'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <span className='text-xl'>📋</span>
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.docData.image} alt='' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-600'>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <img
                    onClick={() => cancelAppointment(item._id)}
                    className='w-10 cursor-pointer'
                    src='https://cdn-icons-png.flaticon.com/512/1828/1828665.png'
                    alt='cancel'
                  />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
}

export default Dashboard
