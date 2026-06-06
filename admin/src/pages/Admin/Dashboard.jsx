import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => { if (aToken) getDashData() }, [aToken])

  if (!dashData) return (
    <div className='flex-1 flex items-center justify-center'>
      <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  const stats = [
    { icon: '👨‍⚕️', label: 'Total Doctors', value: dashData.doctors, bg: 'bg-blue-50', color: 'text-blue-600', path: '/doctor-list' },
    { icon: '📅', label: 'Appointments', value: dashData.appointments, bg: 'bg-purple-50', color: 'text-purple-600', path: '/all-appointments' },
    { icon: '👥', label: 'Total Patients', value: dashData.patients, bg: 'bg-green-50', color: 'text-green-600', path: null },
  ]

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
        <p className='text-gray-400 text-sm mt-1'>Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8'>
        {stats.map((s, i) => (
          <div
            key={i}
            onClick={() => s.path && navigate(s.path)}
            className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover ${s.path ? 'cursor-pointer' : ''}`}
            style={{ animation: `fadeInUp 0.5s ease ${i*100}ms both` }}
          >
            <div className='flex items-center justify-between mb-4'>
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl`}>{s.icon}</div>
              {s.path && <span className='text-gray-300 text-sm'>→</span>}
            </div>
            <p className={`text-3xl font-bold ${s.color} mb-1`}>{s.value}</p>
            <p className='text-gray-500 text-sm'>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-100'>
          <div className='flex items-center gap-3'>
            <span className='text-xl'>📋</span>
            <h2 className='font-semibold text-gray-800'>Latest Bookings</h2>
          </div>
          <button onClick={() => navigate('/all-appointments')} className='text-primary text-xs font-medium hover:underline'>View all →</button>
        </div>

        <div className='divide-y divide-gray-50'>
          {dashData.latestAppointments.slice(0,5).map((item, i) => (
            <div
              key={i}
              className='flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors'
              style={{ animation: `fadeInUp 0.4s ease ${i*80}ms both` }}
            >
              <img src={item.docData.image} className='w-11 h-11 rounded-xl object-cover bg-blue-50 flex-shrink-0' alt='' />
              <div className='flex-1 min-w-0'>
                <p className='font-semibold text-gray-800 text-sm truncate'>{item.docData.name}</p>
                <p className='text-gray-400 text-xs mt-0.5'>{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
              </div>
              {item.cancelled
                ? <span className='px-3 py-1 bg-red-50 text-red-400 rounded-full text-xs font-medium'>Cancelled</span>
                : item.isCompleted
                  ? <span className='px-3 py-1 bg-green-50 text-green-500 rounded-full text-xs font-medium'>Completed</span>
                  : <button
                      onClick={() => cancelAppointment(item._id)}
                      className='px-3 py-1 bg-red-50 text-red-400 rounded-full text-xs font-medium hover:bg-red-100 transition-colors'
                    >
                      Cancel
                    </button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
