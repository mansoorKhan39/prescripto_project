import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const slotDateFormat = (slotDate) => {
  const [d, m, y] = slotDate.split('_')
  return `${d} ${months[Number(m)-1]} ${y}`
}

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) setAppointments(data.appointments.reverse())
    } catch (error) { toast.error(error.message) }
    finally { setLoading(false) }
  }

  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId: id }, { headers: { token } })
      if (data.success) { toast.success(data.message); getUserAppointments() }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount, currency: order.currency,
      name: 'Appointment Payment', description: 'Appointment Fees',
      order_id: order.id, receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) { getUserAppointments(); toast.success('Payment successful!') }
        } catch (error) { toast.error(error.message) }
      }
    }
    new window.Razorpay(options).open()
  }

  const payRazorpay = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId: id }, { headers: { token } })
      if (data.success) initPay(data.order)
    } catch (error) { toast.error(error.message) }
  }

  const payStripe = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-stripe',
        { appointmentId: id },
        { headers: { origin: window.location.origin, token } }
      )
      if (data.success) window.location.replace(data.session_url)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => { if (token) getUserAppointments() }, [token])

  const statusBadge = (item) => {
    if (item.cancelled) return <span className='px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-medium'>Cancelled</span>
    if (item.isCompleted) return <span className='px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium'>Completed</span>
    if (item.payment) return <span className='px-3 py-1 bg-blue-50 text-primary rounded-full text-xs font-medium'>Paid ✓</span>
    return <span className='px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium'>Pending Payment</span>
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>My Appointments</h1>
          <p className='text-gray-400 text-sm mt-1'>{appointments.length} total bookings</p>
        </div>
        <button
          onClick={() => navigate('/doctors')}
          className='bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all'
        >
          + Book New
        </button>
      </div>

      {loading ? (
        <div className='flex justify-center py-20'>
          <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className='text-center py-20 text-gray-400'>
          <span className='text-6xl block mb-4'>📅</span>
          <p className='text-lg font-medium mb-2'>No appointments yet</p>
          <p className='text-sm mb-6'>Book your first appointment today</p>
          <button onClick={() => navigate('/doctors')} className='bg-primary text-white px-8 py-3 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all'>
            Find Doctors →
          </button>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {appointments.map((item, i) => (
            <div
              key={item._id}
              className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow'
              style={{ animation: `fadeInUp 0.5s ease ${i * 60}ms both` }}
            >
              <div className='flex flex-col sm:flex-row gap-4'>
                {/* Doctor image */}
                <img
                  src={item.docData.image}
                  alt=''
                  className='w-20 h-20 rounded-xl object-cover bg-blue-50 flex-shrink-0'
                />

                {/* Info */}
                <div className='flex-1'>
                  <div className='flex flex-wrap items-start justify-between gap-2 mb-2'>
                    <div>
                      <h3 className='font-bold text-gray-800'>{item.docData.name}</h3>
                      <p className='text-gray-500 text-sm'>{item.docData.speciality}</p>
                    </div>
                    {statusBadge(item)}
                  </div>

                  <div className='flex flex-wrap gap-4 text-xs text-gray-500 mb-3'>
                    <span className='flex items-center gap-1'>📅 {slotDateFormat(item.slotDate)}</span>
                    <span className='flex items-center gap-1'>🕐 {item.slotTime}</span>
                    <span className='flex items-center gap-1'>📍 {item.docData.address?.line1}</span>
                  </div>

                  {/* Actions */}
                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <div className='flex flex-wrap gap-2'>
                      <button
                        onClick={() => payStripe(item._id)}
                        className='flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-primary/50 hover:bg-blue-50 text-gray-700 hover:text-primary px-4 py-2 rounded-xl text-xs font-medium transition-all'
                      >
                        <img src={assets.stripe_logo} alt='' className='h-4' />
                        Pay with Stripe
                      </button>
                      <button
                        onClick={() => payRazorpay(item._id)}
                        className='flex items-center gap-2 bg-gray-50 border border-gray-200 hover:border-primary/50 hover:bg-blue-50 text-gray-700 hover:text-primary px-4 py-2 rounded-xl text-xs font-medium transition-all'
                      >
                        <img src={assets.razorpay_logo} alt='' className='h-4' />
                        Pay with Razorpay
                      </button>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='border border-red-200 text-red-400 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-medium transition-all'
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
