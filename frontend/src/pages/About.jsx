import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      {/* Header */}
      <div className='text-center mb-16'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Who We Are</p>
        <h1 className='text-4xl font-bold text-gray-800'>About <span className='gradient-text'>Prescripto</span></h1>
      </div>

      {/* Story Section */}
      <div className='flex flex-col md:flex-row gap-12 items-center mb-20'>
        <div className='flex-1'>
          <img
            src={assets.about_image}
            alt='About Prescripto'
            className='w-full rounded-3xl shadow-xl shadow-blue-100'
          />
        </div>
        <div className='flex-1 flex flex-col gap-5'>
          <p className='text-gray-600 leading-relaxed'>
            Welcome to <strong>Prescripto</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when scheduling doctor appointments and managing health records.
          </p>
          <p className='text-gray-600 leading-relaxed'>
            We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here for you.
          </p>
          <div className='bg-blue-50 rounded-2xl p-5 border-l-4 border-primary'>
            <h3 className='font-bold text-gray-800 mb-2 flex items-center gap-2'><span>🎯</span> Our Vision</h3>
            <p className='text-gray-600 text-sm leading-relaxed'>
              To create a seamless healthcare experience — bridging the gap between patients and providers, making care accessible when you need it most.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='mb-16'>
        <h2 className='text-2xl font-bold text-gray-800 text-center mb-10'>Why Choose <span className='gradient-text'>Us</span></h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            { icon: '⚡', title: 'EFFICIENCY', desc: 'Streamlined appointment scheduling that fits into your busy lifestyle.' },
            { icon: '🎯', title: 'CONVENIENCE', desc: 'Access to a network of trusted healthcare professionals in your area.' },
            { icon: '💎', title: 'PERSONALIZATION', desc: 'Tailored recommendations and reminders to help you stay on top of your health.' },
          ].map((item, i) => (
            <div
              key={i}
              className='group bg-white border border-gray-100 rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer'
            >
              <span className='text-4xl mb-4 block'>{item.icon}</span>
              <h3 className='font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors'>{item.title}</h3>
              <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className='hero-gradient rounded-3xl p-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white'>
          {[
            { num: '100+', label: 'Expert Doctors' },
            { num: '10K+', label: 'Happy Patients' },
            { num: '50+', label: 'Specialities' },
            { num: '99%', label: 'Satisfaction Rate' },
          ].map((s, i) => (
            <div key={i}>
              <p className='text-3xl md:text-4xl font-bold mb-1'>{s.num}</p>
              <p className='text-white/70 text-sm'>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
