import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const adminMenu = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/all-appointments', label: 'Appointments', icon: '📅' },
    { path: '/add-doctor', label: 'Add Doctor', icon: '➕' },
    { path: '/doctor-list', label: 'Doctors List', icon: '👨‍⚕️' },
  ]
  const doctorMenu = [
    { path: '/doctor-dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/doctor-appointments', label: 'Appointments', icon: '📅' },
    { path: '/doctor-profile', label: 'Profile', icon: '👤' },
  ]

  const menu = aToken ? adminMenu : doctorMenu

  return (
    <aside className='min-h-screen w-16 md:w-64 bg-white border-r border-gray-100 flex-shrink-0'>
      <div className='py-6 px-2 md:px-4 flex flex-col gap-1'>
        {menu.map(item => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
              }`}>
                <span className='text-lg flex-shrink-0'>{item.icon}</span>
                <span className='hidden md:block text-sm font-medium'>{item.label}</span>
                {isActive && <div className='hidden md:block ml-auto w-1.5 h-1.5 rounded-full bg-white/60'></div>}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
