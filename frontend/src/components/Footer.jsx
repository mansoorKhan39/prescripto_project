import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* Left Section */}
        <div>
          <div className='flex items-center gap-2 mb-5 cursor-pointer' onClick={() => navigate('/')}>
            <div className='w-8 h-8 bg-primary rounded-full flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>P</span>
            </div>
            <span className='text-xl font-bold text-primary'>Prescripto</span>
          </div>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li onClick={() => navigate('/')} className='cursor-pointer hover:text-primary'>Home</li>
            <li onClick={() => navigate('/about')} className='cursor-pointer hover:text-primary'>About us</li>
            <li onClick={() => navigate('/contact')} className='cursor-pointer hover:text-primary'>Contact us</li>
            <li className='cursor-pointer hover:text-primary'>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-000-000-0000</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2024 Prescripto - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
