import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets_frontend/assets'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateProfile = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  if (!userData) return null

  return (
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-800'>My Profile</h1>
        <p className='text-gray-400 text-sm mt-1'>Manage your personal information</p>
      </div>

      <div className='bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden'>
        {/* Cover */}
        <div className='h-28 hero-gradient relative'>
          <div className='absolute inset-0 opacity-20'>
            <div className='absolute top-2 right-10 w-16 h-16 border border-white rounded-full'/>
            <div className='absolute bottom-2 left-10 w-10 h-10 border border-white rounded-full'/>
          </div>
        </div>

        <div className='px-6 pb-6'>
          {/* Avatar */}
          <div className='flex items-end justify-between -mt-12 mb-6'>
            <div className='relative'>
              <img
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=''
                className='w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg'
              />
              {isEdit && (
                <label htmlFor='profileImg' className='absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform'>
                  <span className='text-white text-xs'>✏️</span>
                  <input id='profileImg' type='file' hidden onChange={e => setImage(e.target.files[0])} />
                </label>
              )}
            </div>
            <div>
              {isEdit ? (
                <div className='flex gap-2'>
                  <button onClick={() => { setIsEdit(false); setImage(false) }} className='px-5 py-2 border border-gray-200 rounded-full text-sm text-gray-500 hover:bg-gray-50 transition-all'>Cancel</button>
                  <button onClick={updateProfile} className='px-5 py-2 bg-primary text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/30 transition-all'>Save Changes</button>
                </div>
              ) : (
                <button onClick={() => setIsEdit(true)} className='px-5 py-2 border border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all'>Edit Profile</button>
              )}
            </div>
          </div>

          {/* Name */}
          {isEdit ? (
            <input
              value={userData.name}
              onChange={e => setUserData(p => ({ ...p, name: e.target.value }))}
              className='text-2xl font-bold text-gray-800 border-b-2 border-primary/30 focus:border-primary outline-none bg-transparent mb-1 w-full'
            />
          ) : (
            <h2 className='text-2xl font-bold text-gray-800 mb-1'>{userData.name}</h2>
          )}
          <p className='text-gray-400 text-sm mb-6'>{userData.email}</p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Contact Info */}
            <div className='bg-gray-50 rounded-2xl p-5'>
              <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4'>Contact Information</h3>
              <div className='flex flex-col gap-4'>
                <div>
                  <p className='text-xs text-gray-400 mb-1'>Email</p>
                  <p className='text-sm text-primary font-medium'>{userData.email}</p>
                </div>
                <div>
                  <p className='text-xs text-gray-400 mb-1'>Phone</p>
                  {isEdit ? (
                    <input
                      value={userData.phone}
                      onChange={e => setUserData(p => ({ ...p, phone: e.target.value }))}
                      className='text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  ) : (
                    <p className='text-sm text-gray-700 font-medium'>{userData.phone || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <p className='text-xs text-gray-400 mb-1'>Address Line 1</p>
                  {isEdit ? (
                    <input
                      value={userData.address?.line1}
                      onChange={e => setUserData(p => ({ ...p, address: { ...p.address, line1: e.target.value } }))}
                      className='text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  ) : (
                    <p className='text-sm text-gray-700'>{userData.address?.line1 || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <p className='text-xs text-gray-400 mb-1'>Address Line 2</p>
                  {isEdit ? (
                    <input
                      value={userData.address?.line2}
                      onChange={e => setUserData(p => ({ ...p, address: { ...p.address, line2: e.target.value } }))}
                      className='text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  ) : (
                    <p className='text-sm text-gray-700'>{userData.address?.line2 || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className='bg-gray-50 rounded-2xl p-5'>
              <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4'>Basic Information</h3>
              <div className='flex flex-col gap-4'>
                <div>
                  <p className='text-xs text-gray-400 mb-1'>Gender</p>
                  {isEdit ? (
                    <select
                      value={userData.gender}
                      onChange={e => setUserData(p => ({ ...p, gender: e.target.value }))}
                      className='text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    >
                      <option>Not Selected</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  ) : (
                    <p className='text-sm text-gray-700 font-medium'>{userData.gender}</p>
                  )}
                </div>
                <div>
                  <p className='text-xs text-gray-400 mb-1'>Date of Birth</p>
                  {isEdit ? (
                    <input
                      type='date'
                      value={userData.dob}
                      onChange={e => setUserData(p => ({ ...p, dob: e.target.value }))}
                      className='text-sm border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'
                    />
                  ) : (
                    <p className='text-sm text-gray-700 font-medium'>{userData.dob || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
