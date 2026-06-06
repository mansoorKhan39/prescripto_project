import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const DoctorCard = ({ item }) => {
  const navigate = useNavigate()
  const { currencySymbol } = useContext(AppContext)

  return (
    <div
      onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0,0) }}
      className='bg-white rounded-2xl overflow-hidden cursor-pointer card-hover border border-gray-100 shadow-sm group'
    >
      <div className='bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden'>
        <img
          src={item.image}
          alt={item.name}
          className='w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500'
        />
      </div>
      <div className='p-4'>
        <div className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${item.available ? 'text-green-500' : 'text-gray-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
          {item.available ? 'Available' : 'Not Available'}
        </div>
        <p className='text-gray-800 font-semibold text-sm leading-tight mb-0.5'>{item.name}</p>
        <p className='text-gray-500 text-xs mb-2'>{item.speciality}</p>
        <p className='text-primary text-xs font-semibold'>{currencySymbol}{item.fees} <span className='text-gray-400 font-normal'>/ visit</span></p>
      </div>
    </div>
  )
}

export default DoctorCard
