import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData ? (
    <div className='m-5'>
      {/* Stats */}
      <div className='flex flex-wrap gap-3'>
        {[
          { icon: '💰', label: 'Earnings', value: `${currency}${dashData.earnings}` },
          { icon: '📅', label: 'Appointments', value: dashData.appointments },
          { icon: '👥', label: 'Patients', value: dashData.patients },
        ].map((stat, i) => (
          <div key={i} className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
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
              <img className='rounded-full w-10' src={item.userData.image} alt='' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                  : <div className='flex gap-2'>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='text-red-500 border border-red-500 rounded px-2 py-1 text-xs hover:bg-red-500 hover:text-white'
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className='text-green-500 border border-green-500 rounded px-2 py-1 text-xs hover:bg-green-500 hover:text-white'
                    >
                      Done
                    </button>
                  </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null
}

export default DoctorDashboard
