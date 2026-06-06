import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => { if (dToken) getDashData() }, [dToken])

  if (!dashData) return (
    <div className='flex-1 flex items-center justify-center'>
      <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  const stats = [
    { icon: '💰', label: 'Total Earnings', value: `${currency}${dashData.earnings}`, bg: 'bg-green-50', color: 'text-green-600' },
    { icon: '📅', label: 'Appointments', value: dashData.appointments, bg: 'bg-blue-50', color: 'text-blue-600' },
    { icon: '👥', label: 'Unique Patients', value: dashData.patients, bg: 'bg-purple-50', color: 'text-purple-600' },
  ]

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Doctor Dashboard</h1>
        <p className='text-gray-400 text-sm mt-1'>Your practice overview</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8'>
        {stats.map((s, i) => (
          <div
            key={i}
            className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover'
            style={{ animation: `fadeInUp 0.5s ease ${i*100}ms both` }}
          >
            <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>{s.icon}</div>
            <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className='text-gray-500 text-sm'>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Latest Appointments */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-4 border-b border-gray-100'>
          <span className='text-xl'>📋</span>
          <h2 className='font-semibold text-gray-800'>Latest Bookings</h2>
        </div>
        <div className='divide-y divide-gray-50'>
          {dashData.latestAppointments.slice(0,5).map((item, i) => (
            <div key={i} className='flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors'>
              <img src={item.userData.image} className='w-11 h-11 rounded-xl object-cover flex-shrink-0' alt='' />
              <div className='flex-1 min-w-0'>
                <p className='font-semibold text-gray-800 text-sm truncate'>{item.userData.name}</p>
                <p className='text-gray-400 text-xs mt-0.5'>{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
              </div>
              {item.cancelled
                ? <span className='px-3 py-1 bg-red-50 text-red-400 rounded-full text-xs font-medium'>Cancelled</span>
                : item.isCompleted
                  ? <span className='px-3 py-1 bg-green-50 text-green-500 rounded-full text-xs font-medium'>Completed</span>
                  : <div className='flex gap-2'>
                      <button onClick={() => cancelAppointment(item._id)} className='w-8 h-8 bg-red-50 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors text-sm'>✕</button>
                      <button onClick={() => completeAppointment(item._id)} className='w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors text-sm'>✓</button>
                    </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
