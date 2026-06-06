import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto px-4 py-12'>
      <div className='text-center mb-14'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Reach Out</p>
        <h1 className='text-4xl font-bold text-gray-800'>Contact <span className='gradient-text'>Us</span></h1>
      </div>

      <div className='flex flex-col md:flex-row gap-12 mb-16'>
        <div className='flex-1'>
          <img
            src={assets.contact_image}
            alt='Contact'
            className='w-full rounded-3xl shadow-xl shadow-blue-100'
          />
        </div>

        <div className='flex-1 flex flex-col justify-center gap-6'>
          <div>
            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'><span>🏢</span> Our Office</h2>
            <div className='flex flex-col gap-3'>
              {[
                { icon: '📍', text: '00000 Willms Station, Suite 000,\nWashington, USA' },
                { icon: '📞', text: '+1 (000) 000-0000' },
                { icon: '✉️', text: 'prescripto@gmail.com' },
              ].map((item, i) => (
                <div key={i} className='flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group'>
                  <span className='text-xl'>{item.icon}</span>
                  <p className='text-gray-600 text-sm whitespace-pre-line'>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm'>
            <h3 className='font-bold text-gray-800 mb-2'>Careers at Prescripto</h3>
            <p className='text-gray-500 text-sm mb-4'>Learn more about our teams and job openings.</p>
            <button className='bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95'>
              Explore Jobs →
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12'>
        <h2 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Send us a Message</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {[
            { label: 'Your Name', type: 'text', placeholder: 'John Doe' },
            { label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
            { label: 'Phone Number', type: 'tel', placeholder: '+1 000 000 0000' },
            { label: 'Subject', type: 'text', placeholder: 'How can we help?' },
          ].map((field, i) => (
            <div key={i}>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
              />
            </div>
          ))}
          <div className='md:col-span-2'>
            <label className='block text-sm font-medium text-gray-700 mb-1.5'>Message</label>
            <textarea
              rows={4}
              placeholder='Write your message here...'
              className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none'
            />
          </div>
          <div className='md:col-span-2 text-center'>
            <button className='bg-primary text-white font-semibold px-12 py-4 rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 active:scale-95'>
              Send Message →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
