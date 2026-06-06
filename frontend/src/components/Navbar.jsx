import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    setShowDropdown(false)
    navigate('/login')
  }

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/doctors', label: 'ALL DOCTORS' },
    { to: '/about', label: 'ABOUT' },
    { to: '/contact', label: 'CONTACT' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-100/50' : 'bg-white'
      }`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>

            {/* Logo */}
            <div
              onClick={() => navigate('/')}
              className='flex items-center gap-2 cursor-pointer group'
            >
              <img
                src={assets.logo}
                alt='Prescripto'
                className='h-9 w-auto transition-transform duration-300 group-hover:scale-105'
              />
            </div>

            {/* Desktop Nav */}
            <ul className='hidden md:flex items-center gap-8'>
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} end={link.to === '/'}>
                  {({ isActive }) => (
                    <li className={`nav-link text-sm font-medium tracking-wide cursor-pointer transition-colors duration-200 ${
                      isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                    } ${isActive ? 'active' : ''}`}>
                      {link.label}
                    </li>
                  )}
                </NavLink>
              ))}
            </ul>

            {/* Right Side */}
            <div className='flex items-center gap-4'>
              {token && userData ? (
                <div className='relative'>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className='flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all duration-200'
                  >
                    <img
                      src={userData.image}
                      alt=''
                      className='w-9 h-9 rounded-full object-cover ring-2 ring-primary/30'
                    />
                    <img src={assets.dropdown_icon} alt='' className={`w-2.5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <div className='absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-gray-200/80 border border-gray-100 py-2 animate-slideDown'>
                      <div className='px-4 py-2 border-b border-gray-100'>
                        <p className='text-sm font-semibold text-gray-800'>{userData.name}</p>
                        <p className='text-xs text-gray-500'>{userData.email}</p>
                      </div>
                      {[
                        { label: 'My Profile', icon: '👤', path: '/my-profile' },
                        { label: 'My Appointments', icon: '📅', path: '/my-appointments' },
                      ].map(item => (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setShowDropdown(false) }}
                          className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors'
                        >
                          <span>{item.icon}</span> {item.label}
                        </button>
                      ))}
                      <div className='border-t border-gray-100 mt-1'>
                        <button
                          onClick={logout}
                          className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors'
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className='hidden md:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 active:scale-95'
                >
                  Create Account
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setShowMenu(true)}
                className='md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors'
              >
                <img src={assets.menu_icon} alt='' className='w-5' />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className='h-16'></div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className='fixed inset-0 z-50 md:hidden'>
          <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={() => setShowMenu(false)} />
          <div className='absolute right-0 top-0 h-full w-72 bg-white shadow-2xl animate-fadeInRight'>
            <div className='flex items-center justify-between p-5 border-b'>
              <img src={assets.logo} alt='' className='h-8' />
              <button onClick={() => setShowMenu(false)} className='p-2 rounded-full hover:bg-gray-100'>
                <img src={assets.cross_icon} alt='' className='w-4' />
              </button>
            </div>
            <div className='p-5 flex flex-col gap-1'>
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} onClick={() => setShowMenu(false)} end={link.to === '/'}>
                  {({ isActive }) => (
                    <div className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-50'
                    }`}>
                      {link.label}
                    </div>
                  )}
                </NavLink>
              ))}
              {!token && (
                <button
                  onClick={() => { navigate('/login'); setShowMenu(false) }}
                  className='mt-4 w-full bg-primary text-white py-3 rounded-xl text-sm font-medium'
                >
                  Create Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
