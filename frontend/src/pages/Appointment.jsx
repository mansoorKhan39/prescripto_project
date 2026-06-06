import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  useEffect(() => {
    if (doctors.length > 0) {
      setDocInfo(doctors.find(d => d._id === docId))
    }
  }, [doctors, docId])

  useEffect(() => {
    if (!docInfo) return
    setDocSlots([])
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const curr = new Date(today)
      curr.setDate(today.getDate() + i)
      const end = new Date(curr)
      end.setHours(21, 0, 0, 0)

      if (i === 0) {
        curr.setHours(curr.getHours() > 10 ? curr.getHours() + 1 : 10)
        curr.setMinutes(curr.getMinutes() > 30 ? 30 : 0)
      } else {
        curr.setHours(10); curr.setMinutes(0)
      }

      const slots = []
      while (curr < end) {
        const time = curr.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const slotDate = `${curr.getDate()}_${curr.getMonth()+1}_${curr.getFullYear()}`
        const booked = docInfo.slots_booked?.[slotDate]?.includes(time)
        if (!booked) slots.push({ datetime: new Date(curr), time })
        curr.setMinutes(curr.getMinutes() + 30)
      }
      setDocSlots(prev => [...prev, slots])
    }
  }, [docInfo])

  const bookAppointment = async () => {
    if (!token) { toast.warn('Login to book appointment'); return navigate('/login') }
    if (!slotTime) { toast.warn('Please select a time slot'); return }
    try {
      const date = docSlots[slotIndex][0].datetime
      const slotDate = `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}`
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  if (!docInfo) return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='max-w-5xl mx-auto px-4 py-8'>
      {/* Doctor Profile Card */}
      <div className='flex flex-col sm:flex-row gap-6 mb-8'>
        <div className='sm:w-64 flex-shrink-0'>
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className='w-full rounded-2xl object-cover bg-gradient-to-br from-blue-50 to-indigo-100 shadow-lg'
          />
        </div>

        <div className='flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
          <div className='flex items-start justify-between gap-4 mb-3'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                <h1 className='text-2xl font-bold text-gray-800'>{docInfo.name}</h1>
                <img src={assets.verified_icon} alt='' className='w-5' />
              </div>
              <p className='text-gray-500 text-sm'>{docInfo.degree} · {docInfo.speciality}</p>
            </div>
            <span className='bg-blue-50 text-primary text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap'>
              {docInfo.experience}
            </span>
          </div>

          <div className='flex items-center gap-2 mb-4'>
            <img src={assets.info_icon} alt='' className='w-4' />
            <p className='text-sm font-medium text-gray-700'>About</p>
          </div>
          <p className='text-sm text-gray-600 leading-relaxed mb-5'>{docInfo.about}</p>

          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 rounded-xl px-4 py-2'>
              <p className='text-xs text-gray-500'>Appointment Fee</p>
              <p className='text-lg font-bold text-primary'>{currencySymbol}{docInfo.fees}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${docInfo.available ? 'bg-green-50' : 'bg-gray-50'}`}>
              <span className={`w-2 h-2 rounded-full ${docInfo.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
              <span className={`text-sm font-medium ${docInfo.available ? 'text-green-600' : 'text-gray-500'}`}>
                {docInfo.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10'>
        <h2 className='text-lg font-bold text-gray-800 mb-5'>Select Appointment Slot</h2>

        {/* Day selector */}
        <div className='flex gap-3 overflow-x-auto pb-2 mb-6'>
          {docSlots.map((daySlots, i) => (
            <button
              key={i}
              onClick={() => { setSlotIndex(i); setSlotTime('') }}
              className={`flex flex-col items-center px-5 py-3 rounded-2xl flex-shrink-0 transition-all duration-200 ${
                slotIndex === i
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-primary'
              }`}
            >
              <span className='text-xs font-medium mb-1'>
                {daySlots[0] && daysOfWeek[daySlots[0].datetime.getDay()]}
              </span>
              <span className='text-xl font-bold'>
                {daySlots[0] && daySlots[0].datetime.getDate()}
              </span>
            </button>
          ))}
        </div>

        {/* Time slots */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {docSlots[slotIndex]?.length === 0 ? (
            <p className='text-gray-400 text-sm py-4'>No slots available for this day</p>
          ) : (
            docSlots[slotIndex]?.map((slot, i) => (
              <button
                key={i}
                onClick={() => setSlotTime(slot.time)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  slotTime === slot.time
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-primary border border-gray-200'
                }`}
              >
                {slot.time.toLowerCase()}
              </button>
            ))
          )}
        </div>

        <button
          onClick={bookAppointment}
          className='w-full sm:w-auto bg-primary text-white font-semibold px-12 py-4 rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95 animate-pulse-ring'
        >
          Book Appointment
        </button>
      </div>

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  )
}

export default Appointment
