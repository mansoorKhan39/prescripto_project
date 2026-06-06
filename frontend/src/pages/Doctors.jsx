import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { specialityData } from '../assets/assets_frontend/assets'
import DoctorCard from '../components/DoctorCard'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  useEffect(() => {
    setFilterDoc(speciality ? doctors.filter(d => d.speciality === speciality) : doctors)
  }, [doctors, speciality])

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Find Your Doctor</h1>
        <p className='text-gray-500 text-sm'>Browse through our extensive list of trusted specialists.</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Sidebar Filter */}
        <aside className='lg:w-64 flex-shrink-0'>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='lg:hidden w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 mb-4 shadow-sm'
          >
            <span className='font-medium text-gray-700'>Filter by Speciality</span>
            <span className={`transition-transform duration-200 ${showFilter ? 'rotate-180' : ''}`}>▼</span>
          </button>

          <div className={`${showFilter ? 'block' : 'hidden lg:block'} bg-white rounded-2xl border border-gray-100 shadow-sm p-4`}>
            <p className='font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide'>Specialities</p>
            <div className='flex flex-col gap-1'>
              <button
                onClick={() => navigate('/doctors')}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                  !speciality ? 'bg-primary text-white shadow-md shadow-primary/30' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>🏥</span> All Doctors
              </button>
              {specialityData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => speciality === item.speciality ? navigate('/doctors') : navigate(`/doctors/${item.speciality}`)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all text-left ${
                    speciality === item.speciality
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <img src={item.image} alt='' className='w-5 h-5' />
                  {item.speciality}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Doctors Grid */}
        <div className='flex-1'>
          <div className='flex items-center justify-between mb-5'>
            <p className='text-gray-500 text-sm'>
              <span className='font-semibold text-gray-800'>{filterDoc.length}</span> doctors found
              {speciality && <span> in <span className='text-primary font-medium'>{speciality}</span></span>}
            </p>
          </div>

          {filterDoc.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
              <span className='text-5xl mb-4'>🔍</span>
              <p className='text-lg font-medium'>No doctors found</p>
              <p className='text-sm'>Try a different speciality</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'>
              {filterDoc.map((item, i) => (
                <div
                  key={item._id}
                  className='animate-fadeInUp opacity-0-init'
                  style={{ animation: `fadeInUp 0.5s ease ${i * 50}ms forwards` }}
                >
                  <DoctorCard item={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
