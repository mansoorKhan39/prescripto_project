import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateProfile = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        { address: profileData.address, fees: profileData.fees, available: profileData.available },
        { headers: { dToken } }
      )
      if (data.success) { toast.success(data.message); setIsEdit(false); getProfileData() }
      else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (dToken) getProfileData() }, [dToken])

  if (!profileData) return (
    <div className='flex-1 flex items-center justify-center'>
      <div className='w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
    </div>
  )

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>My Profile</h1>
        <p className='text-gray-400 text-sm mt-1'>Manage your doctor profile</p>
      </div>

      <div className='max-w-3xl'>
        {/* Profile Header Card */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5'>
          <div className='h-24 bg-gradient-to-r from-primary to-purple-500 relative'>
            <div className='absolute inset-0 opacity-10'>
              <div className='absolute top-2 right-8 w-14 h-14 border border-white rounded-full'/>
              <div className='absolute bottom-2 left-8 w-8 h-8 border border-white rounded-full'/>
            </div>
          </div>
          <div className='px-6 pb-6'>
            <div className='flex items-end justify-between -mt-10 mb-4'>
              <img src={profileData.image} alt='' className='w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg' />
              <div>
                {isEdit ? (
                  <div className='flex gap-2'>
                    <button onClick={() => setIsEdit(false)} className='px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-500 hover:bg-gray-50 transition-all'>Cancel</button>
                    <button onClick={updateProfile} disabled={loading} className='px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-70'>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEdit(true)} className='px-4 py-2 border border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all'>Edit Profile</button>
                )}
              </div>
            </div>
            <h2 className='text-xl font-bold text-gray-800 mb-0.5'>{profileData.name}</h2>
            <p className='text-gray-500 text-sm mb-3'>{profileData.degree} · {profileData.speciality}</p>
            <div className='flex flex-wrap gap-2'>
              <span className='bg-blue-50 text-primary text-xs font-medium px-3 py-1 rounded-full'>{profileData.experience} exp</span>
              <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 ${profileData.available ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${profileData.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {profileData.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
            <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4'>About</h3>
            <p className='text-sm text-gray-600 leading-relaxed'>{profileData.about}</p>
          </div>

          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-5'>
            <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4'>Settings</h3>
            <div className='flex flex-col gap-4'>
              <div>
                <p className='text-xs text-gray-400 mb-1.5'>Consultation Fee</p>
                {isEdit ? (
                  <div className='flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'>
                    <span className='px-3 py-2.5 bg-gray-50 text-gray-500 text-sm border-r border-gray-200'>{currency}</span>
                    <input
                      type='number' value={profileData.fees}
                      onChange={e => setProfileData(p => ({...p, fees: e.target.value}))}
                      className='flex-1 px-3 py-2.5 text-sm focus:outline-none'
                    />
                  </div>
                ) : (
                  <p className='text-lg font-bold text-primary'>{currency}{profileData.fees}</p>
                )}
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1.5'>Address</p>
                {isEdit ? (
                  <div className='flex flex-col gap-2'>
                    <input value={profileData.address?.line1} onChange={e => setProfileData(p => ({...p, address:{...p.address,line1:e.target.value}}))} placeholder='Line 1' className='border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' />
                    <input value={profileData.address?.line2} onChange={e => setProfileData(p => ({...p, address:{...p.address,line2:e.target.value}}))} placeholder='Line 2' className='border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20' />
                  </div>
                ) : (
                  <p className='text-sm text-gray-600'>{profileData.address?.line1}<br />{profileData.address?.line2}</p>
                )}
              </div>

              <div>
                <p className='text-xs text-gray-400 mb-1.5'>Availability</p>
                <label className='flex items-center gap-3 cursor-pointer'>
                  <div
                    onClick={() => isEdit && setProfileData(p => ({...p, available: !p.available}))}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${profileData.available ? 'bg-green-500' : 'bg-gray-200'} ${!isEdit ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${profileData.available ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                  <span className={`text-sm font-medium ${profileData.available ? 'text-green-600' : 'text-gray-400'}`}>
                    {profileData.available ? 'Accepting patients' : 'Not accepting patients'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
