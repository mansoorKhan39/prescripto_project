import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import DoctorCard from '../components/DoctorCard'

const specialityList = [
  { speciality: 'General physician', emoji: '🩺' },
  { speciality: 'Gynecologist', emoji: '👩‍⚕️' },
  { speciality: 'Dermatologist', emoji: '🧴' },
  { speciality: 'Pediatricians', emoji: '👶' },
  { speciality: 'Neurologist', emoji: '🧠' },
  { speciality: 'Gastroenterologist', emoji: '🏥' },
]

const Home = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/* Left */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
          <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br /> With Trusted Doctors
          </p>
          <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
            <div className='flex -space-x-2'>
              {[1,2,3].map(i => (
                <div key={i} className='w-8 h-8 bg-white/30 rounded-full border-2 border-white'></div>
              ))}
            </div>
            <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
          </div>
          <a
            onClick={() => navigate('/doctors')}
            className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#595959] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 cursor-pointer'
          >
            Book appointment <span className='ml-1'>→</span>
          </a>
        </div>
        {/* Right - Placeholder hero image */}
        <div className='md:w-1/2 relative'>
          <div className='w-full h-64 md:h-auto flex items-end justify-center'>
            <div className='w-64 h-64 bg-white/20 rounded-t-full flex items-center justify-center'>
              <span className='text-8xl'>👨‍⚕️</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SPECIALITY SECTION ===== */}
      <div className='flex flex-col items-center gap-4 py-16 text-[#262626]' id='speciality'>
        <h1 className='text-3xl font-medium'>Find by Speciality</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
          {specialityList.map((item, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/doctors/${item.speciality}`); scrollTo(0, 0) }}
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'
            >
              <div className='w-16 h-16 sm:w-24 sm:h-24 bg-[#EAEFFF] rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-2'>
                {item.emoji}
              </div>
              <p>{item.speciality}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== TOP DOCTORS ===== */}
      <div className='flex flex-col items-center gap-4 my-16 text-[#262626]'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
          {doctors.slice(0, 10).map((item, index) => (
            <DoctorCard key={index} item={item} />
          ))}
        </div>
        <button
          onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
          className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
        >
          more
        </button>
      </div>

      {/* ===== BANNER ===== */}
      <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
          <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointment</p>
            <p className='mt-4'>With 100+ Trusted Doctors</p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className='bg-white text-sm sm:text-base text-[#595959] px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'
          >
            Create account
          </button>
        </div>
        <div className='hidden md:flex items-end w-1/2 lg:w-[370px]'>
          <div className='w-full h-48 flex items-center justify-center'>
            <span className='text-8xl'>🏥</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
