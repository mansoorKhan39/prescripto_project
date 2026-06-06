import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import DoctorCard from './DoctorCard'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      setRelDocs(doctors.filter(doc => doc.speciality === speciality && doc._id !== docId))
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) return null

  return (
    <div className='py-12'>
      <div className='text-center mb-10'>
        <p className='text-primary text-sm font-semibold tracking-widest uppercase mb-2'>Same Speciality</p>
        <h2 className='text-2xl font-bold text-gray-800'>Related Doctors</h2>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {relDoc.slice(0, 5).map((item, i) => (
          <div key={item._id} style={{ animation: `fadeInUp 0.5s ease ${i*60}ms both` }}>
            <DoctorCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
