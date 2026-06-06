import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => { if (dToken) getAppointments() }, [dToken])

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Appointments</h1>
        <p className='text-gray-400 text-sm mt-1'>{appointments.length} total appointments</p>
      </div>

      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
        <div className='hidden md:grid grid-cols-[40px_2fr_60px_1fr_2fr_80px_80px_100px] gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide'>
          <p>#</p><p>Patient</p><p>Age</p><p>Payment</p><p>Date & Time</p><p>Fees</p><p></p><p>Action</p>
        </div>

        <div className='divide-y divide-gray-50 max-h-[70vh] overflow-y-auto'>
          {appointments.map((item, i) => (
            <div
              key={item._id}
              className='flex flex-wrap md:grid md:grid-cols-[40px_2fr_60px_1fr_2fr_80px_80px_100px] gap-3 items-center px-6 py-4 hover:bg-gray-50 transition-colors'
              style={{ animation: `fadeInUp 0.4s ease ${Math.min(i,10)*40}ms both` }}
            >
              <p className='hidden md:block text-xs text-gray-400'>{i+1}</p>

              <div className='flex items-center gap-3 min-w-0'>
                <img src={item.userData.image} className='w-9 h-9 rounded-xl object-cover flex-shrink-0' alt='' />
                <p className='text-sm font-medium text-gray-800 truncate'>{item.userData.name}</p>
              </div>

              <p className='hidden md:block text-sm text-gray-500'>{calculateAge(item.userData.dob)}</p>

              <span className={`hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.payment ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                {item.payment ? 'Online' : 'Cash'}
              </span>

              <div>
                <p className='text-sm text-gray-700'>{slotDateFormat(item.slotDate)}</p>
                <p className='text-xs text-gray-400'>{item.slotTime}</p>
              </div>

              <p className='text-sm font-semibold text-gray-800'>{currency}{item.amount}</p>

              <div></div>

              <div>
                {item.cancelled
                  ? <span className='px-2.5 py-1 bg-red-50 text-red-400 rounded-full text-xs font-medium'>Cancelled</span>
                  : item.isCompleted
                    ? <span className='px-2.5 py-1 bg-green-50 text-green-500 rounded-full text-xs font-medium'>Done ✓</span>
                    : <div className='flex gap-2'>
                        <button onClick={() => cancelAppointment(item._id)} className='w-8 h-8 bg-red-50 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors'>✕</button>
                        <button onClick={() => completeAppointment(item._id)} className='w-8 h-8 bg-green-50 text-green-500 rounded-lg flex items-center justify-center hover:bg-green-100 transition-colors'>✓</button>
                      </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
