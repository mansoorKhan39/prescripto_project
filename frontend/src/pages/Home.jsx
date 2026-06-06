import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets, specialityData } from '../assets/assets_frontend/assets'
import DoctorCard from '../components/DoctorCard'

const Home = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0-init')
            entry.target.style.animationPlayState = 'running'
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.animationPlayState = 'paused'
      observerRef.current.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [doctors])

  return (
    <div className='overflow-x-hidden'>

      {/* ===== HERO ===== */}
      <div className='hero-gradient rounded-2xl mx-2 sm:mx-0 overflow-hidden relative'>
        {/* decorative blobs */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl' />
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl' />

        <div className='flex flex-col md:flex-row items-center relative z-10'>
          {/* Left text */}
          <div className='flex-1 px-8 md:px-14 py-12 md:py-16'>
            {/* badge */}
            <div className='inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 animate-fadeInUp'>
              <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
              <span className='text-white/90 text-xs font-medium tracking-wide'>100+ Verified Doctors Available</span>
            </div>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fadeInUp delay-100'>
              Book Appointment<br />
              <span className='text-yellow-300'>With Trusted</span><br />
              Doctors
            </h1>

            <p className='text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-md animate-fadeInUp delay-200'>
              Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
            </p>

            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fadeInUp delay-300'>
              {/* group profiles */}
              <div className='flex items-center gap-3'>
                <img src={assets.group_profiles} alt='' className='h-10' />
                <div>
                  <p className='text-white text-sm font-semibold'>10,000+</p>
                  <p className='text-white/70 text-xs'>Happy Patients</p>
                </div>
              </div>
              <button
                onClick={() => { navigate('/doctors'); scrollTo(0,0) }}
                className='flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full hover:shadow-2xl hover:shadow-black/20 hover:scale-105 transition-all duration-300 active:scale-95'
              >
                Book Appointment
                <img src={assets.arrow_icon} alt='' className='w-4' />
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className='flex-1 flex justify-center items-end px-8 pt-8 md:pt-0'>
            <img
              src={assets.header_img}
              alt='Doctor'
              className='w-full max-w-md animate-float drop-shadow-2xl'
            />
          </div>
        </div>
      </div>

      {/* ===== SPECIALITIES ===== */}
      <section className='py-20 px-4'>
        <div className='text-center mb-12 reveal animate-fadeInUp opacity-0-init'>
          <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Browse by Category</p>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>Find by Speciality</h2>
          <p className='text-gray-500 max-w-md mx-auto text-sm leading-relaxed'>
            Browse our extensive list of trusted specialists and book your appointment with ease.
          </p>
        </div>

        <div className='flex gap-4 sm:gap-6 overflow-x-auto pb-4 sm:justify-center scrollbar-hide'>
          {specialityData.map((item, i) => (
            <div
              key={i}
              onClick={() => { navigate(`/doctors/${item.speciality}`); scrollTo(0,0) }}
              className={`flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group reveal animate-fadeInUp opacity-0-init`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className='w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-primary/20'>
                <img src={item.image} alt={item.speciality} className='w-12 sm:w-14' />
              </div>
              <p className='text-xs sm:text-sm text-gray-600 font-medium text-center group-hover:text-primary transition-colors w-20 sm:w-24 leading-tight'>
                {item.speciality}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TOP DOCTORS ===== */}
      <section className='py-10 px-4 bg-gradient-to-b from-white to-blue-50/50'>
        <div className='text-center mb-12 reveal animate-fadeInUp opacity-0-init'>
          <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Our Team</p>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-3'>Top Doctors to Book</h2>
          <p className='text-gray-500 max-w-md mx-auto text-sm'>
            Simply browse through our extensive list of trusted doctors.
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto'>
          {doctors.slice(0, 10).map((item, i) => (
            <div
              key={item._id}
              className={`reveal animate-fadeInUp opacity-0-init`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <DoctorCard item={item} />
            </div>
          ))}
        </div>

        <div className='text-center mt-10 reveal animate-fadeInUp opacity-0-init'>
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0,0) }}
            className='inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-10 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 active:scale-95'
          >
            View All Doctors
            <img src={assets.arrow_icon} alt='' className='w-4' />
          </button>
        </div>
      </section>

      {/* ===== BANNER CTA ===== */}
      <section className='py-16 px-4'>
        <div className='hero-gradient rounded-3xl overflow-hidden relative max-w-6xl mx-auto'>
          <div className='absolute inset-0 opacity-10'>
            <div className='absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full' />
            <div className='absolute top-8 right-8 w-20 h-20 border border-white rounded-full' />
            <div className='absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full' />
          </div>
          <div className='flex flex-col md:flex-row items-center relative z-10 p-8 md:p-12 lg:p-16 gap-8'>
            <div className='flex-1'>
              <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4'>
                Book Appointment<br />
                <span className='text-yellow-300'>With 100+ Trusted</span><br />
                Doctors
              </h2>
              <button
                onClick={() => navigate('/login')}
                className='inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 mt-2'
              >
                Create Account <img src={assets.arrow_icon} alt='' className='w-4' />
              </button>
            </div>
            <div className='flex-1 flex justify-center'>
              <img
                src={assets.appointment_img}
                alt=''
                className='w-full max-w-sm rounded-2xl shadow-2xl shadow-black/20 animate-float'
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
