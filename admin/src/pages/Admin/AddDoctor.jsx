import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const specialities = ['General physician','Gynecologist','Dermatologist','Pediatricians','Neurologist','Gastroenterologist']
const experienceOptions = Array.from({length:10},(_,i)=>`${i+1} Year`)

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [form, setForm] = useState({
    name:'', email:'', password:'', experience:'1 Year',
    fees:'', about:'', speciality:'General physician',
    degree:'', address1:'', address2:''
  })
  const [loading, setLoading] = useState(false)
  const { backendUrl, aToken } = useContext(AdminContext)

  const set = (field) => (e) => setForm(p => ({...p, [field]: e.target.value}))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!docImg) return toast.error('Please upload doctor image')
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('image', docImg)
      Object.entries(form).forEach(([k,v]) => {
        if (k === 'address1' || k === 'address2') return
        fd.append(k, k === 'fees' ? Number(v) : v)
      })
      fd.append('address', JSON.stringify({line1: form.address1, line2: form.address2}))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', fd, { headers: { aToken } })
      if (data.success) {
        toast.success('Doctor added successfully!')
        setDocImg(false)
        setForm({ name:'', email:'', password:'', experience:'1 Year', fees:'', about:'', speciality:'General physician', degree:'', address1:'', address2:'' })
      } else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
    finally { setLoading(false) }
  }

  const InputField = ({ label, field, type='text', placeholder }) => (
    <div>
      <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>{label}</label>
      <input
        type={type} value={form[field]} onChange={set(field)}
        placeholder={placeholder} required
        className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
      />
    </div>
  )

  return (
    <div className='flex-1 p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Add Doctor</h1>
        <p className='text-gray-400 text-sm mt-1'>Fill in the details to add a new doctor</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5'>
          {/* Image Upload */}
          <label htmlFor='doc-img' className='flex items-center gap-5 cursor-pointer group w-fit mb-2'>
            <div className='w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 group-hover:border-primary/50 bg-gray-50 flex items-center justify-center overflow-hidden transition-all'>
              {docImg
                ? <img src={URL.createObjectURL(docImg)} className='w-full h-full object-cover' alt='' />
                : <span className='text-3xl'>👤</span>
              }
            </div>
            <div>
              <p className='text-sm font-medium text-gray-700 group-hover:text-primary transition-colors'>Upload Doctor Photo</p>
              <p className='text-xs text-gray-400 mt-0.5'>PNG, JPG up to 5MB</p>
            </div>
            <input id='doc-img' type='file' hidden accept='image/*' onChange={e => setDocImg(e.target.files[0])} />
          </label>
        </div>

        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <InputField label='Doctor Name' field='name' placeholder='Dr. John Smith' />
            <InputField label='Email Address' field='email' type='email' placeholder='doctor@example.com' />
            <InputField label='Password' field='password' type='password' placeholder='Min. 8 characters' />
            <InputField label='Consultation Fees ($)' field='fees' type='number' placeholder='e.g. 60' />
            <InputField label='Degree / Education' field='degree' placeholder='e.g. MBBS, MD' />

            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>Speciality</label>
              <select value={form.speciality} onChange={set('speciality')} className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'>
                {specialities.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>Experience</label>
              <select value={form.experience} onChange={set('experience')} className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'>
                {experienceOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>

            <InputField label='Address Line 1' field='address1' placeholder='Street address' />
            <InputField label='Address Line 2' field='address2' placeholder='City, State, ZIP' />

            <div className='md:col-span-2'>
              <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'>About Doctor</label>
              <textarea
                value={form.about} onChange={set('about')} rows={4} required
                placeholder='Brief description about the doctor, specializations, approach...'
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none'
              />
            </div>
          </div>

          <div className='mt-6 flex items-center gap-4'>
            <button
              type='submit' disabled={loading}
              className='flex items-center gap-2 bg-primary text-white font-semibold px-10 py-3 rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:scale-100'
            >
              {loading
                ? <><span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span> Adding...</>
                : '+ Add Doctor'
              }
            </button>
            <p className='text-xs text-gray-400'>All fields are required</p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDoctor
