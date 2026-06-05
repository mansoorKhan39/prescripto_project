import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const adminMenuItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/all-appointments', label: 'Appointments', icon: '📅' },
    { path: '/add-doctor', label: 'Add Doctor', icon: '➕' },
    { path: '/doctor-list', label: 'Doctors List', icon: '👨‍⚕️' },
  ]

  const doctorMenuItems = [
    { path: '/doctor-dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/doctor-appointments', label: 'Appointments', icon: '📅' },
    { path: '/doctor-profile', label: 'Profile', icon: '👤' },
  ]

  const menuItems = aToken ? adminMenuItems : doctorMenuItems

  return (
    <div className='min-h-screen bg-white border-r'>
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
          }
        >
          <span className='text-xl'>{item.icon}</span>
          <p className='hidden md:block'>{item.label}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
