import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorCard = ({ item }) => {
  const navigate = useNavigate()
  const { currencySymbol } = useContext(AppContext)

  return (
    <div
      onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
      className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
    >
      <img className='bg-[#EAEFFF] w-full' src={item.image} alt='' />
      <div className='p-4'>
        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
          <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
          <p>{item.available ? 'Available' : 'Not Available'}</p>
        </div>
        <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
        <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
        <p className='text-primary text-sm mt-1'>{currencySymbol}{item.fees}</p>
      </div>
    </div>
  )
}

export default DoctorCard
