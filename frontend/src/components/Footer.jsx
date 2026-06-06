import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className='bg-gray-900 text-white mt-20'>
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mb-12'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <img src={assets.logo} alt='Prescripto' className='h-10 mb-4 brightness-0 invert' />
            <p className='text-gray-400 text-sm leading-relaxed max-w-xs'>
              Your trusted partner in managing healthcare needs. Book appointments with verified doctors, hassle-free.
            </p>
            <div className='flex gap-3 mt-5'>
              {['🐦','💼','📸'].map((icon,i) => (
                <div key={i} className='w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition-colors text-sm'>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className='font-semibold text-white mb-4 tracking-wide'>COMPANY</p>
            <ul className='flex flex-col gap-3'>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'All Doctors', path: '/doctors' },
                { label: 'Contact Us', path: '/contact' },
              ].map(item => (
                <li
                  key={item.path}
                  onClick={() => { navigate(item.path); scrollTo(0,0) }}
                  className='text-gray-400 text-sm cursor-pointer hover:text-primary transition-colors flex items-center gap-2 group'
                >
                  <span className='w-0 group-hover:w-3 h-0.5 bg-primary transition-all duration-300 rounded'></span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className='font-semibold text-white mb-4 tracking-wide'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-3'>
              <li className='flex items-center gap-3 text-gray-400 text-sm'>
                <span className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary'>📞</span>
                +1-000-000-0000
              </li>
              <li className='flex items-center gap-3 text-gray-400 text-sm'>
                <span className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary'>✉️</span>
                prescripto@gmail.com
              </li>
              <li className='flex items-center gap-3 text-gray-400 text-sm'>
                <span className='w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary'>📍</span>
                New York, USA
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-gray-500 text-sm'>© 2024 Prescripto. All Rights Reserved.</p>
          <div className='flex gap-6'>
            {['Privacy Policy','Terms of Service','Cookie Policy'].map(item => (
              <span key={item} className='text-gray-500 text-xs hover:text-primary cursor-pointer transition-colors'>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
