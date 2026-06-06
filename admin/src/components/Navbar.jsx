import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    if (aToken) { setAToken(''); localStorage.removeItem('aToken') }
    if (dToken) { setDToken(''); localStorage.removeItem('dToken') }
  }

  return (
    <div className='flex justify-between items-center px-6 py-3 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/30'>
          <span className='text-white font-bold text-sm'>P</span>
        </div>
        <span className='text-lg font-bold text-gray-800'>Prescripto</span>
        <span className='bg-primary/10 text-primary text-xs font-semibold px-3 py-0.5 rounded-full'>
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>
      <button
        onClick={logout}
        className='flex items-center gap-2 bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-600 text-sm font-medium px-5 py-2 rounded-full transition-all duration-200'
      >
        <span>🚪</span> Logout
      </button>
    </div>
  )
}

export default Navbar
