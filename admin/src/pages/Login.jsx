import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login'
      const { data } = await axios.post(backendUrl + endpoint, { email, password })
      if (data.success) {
        if (state === 'Admin') { localStorage.setItem('aToken', data.token); setAToken(data.token) }
        else { localStorage.setItem('dToken', data.token); setDToken(data.token) }
        toast.success('Login successful!')
      } else toast.error(data.message)
    } catch (error) { toast.error(error.message) }
    finally { setLoading(false) }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 border border-gray-100 animate-fadeInUp'>
          {/* Logo */}
          <div className='flex justify-center mb-6'>
            <div className='flex items-center gap-2'>
              <div className='w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/30'>
                <span className='text-white font-bold'>P</span>
              </div>
              <span className='text-xl font-bold text-gray-800'>Prescripto</span>
            </div>
          </div>

          {/* Toggle */}
          <div className='flex bg-gray-100 rounded-xl p-1 mb-6'>
            {['Admin','Doctor'].map(s => (
              <button
                key={s}
                onClick={() => setState(s)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  state === s ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {s === 'Admin' ? '🛡️' : '👨‍⚕️'} {s}
              </button>
            ))}
          </div>

          <h2 className='text-xl font-bold text-gray-800 mb-1'>{state} Login</h2>
          <p className='text-gray-400 text-sm mb-6'>Enter your credentials to access the panel</p>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>Email Address</label>
              <input
                type='email' value={email} onChange={e => setEmail(e.target.value)}
                placeholder='admin@prescripto.com' required
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>Password</label>
              <input
                type='password' value={password} onChange={e => setPassword(e.target.value)}
                placeholder='••••••••' required
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
              />
            </div>
            <button
              type='submit' disabled={loading}
              className='w-full bg-primary text-white font-semibold py-3.5 rounded-xl mt-2 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:scale-100'
            >
              {loading ? <span className='flex items-center justify-center gap-2'><span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></span> Logging in...</span> : `Login as ${state} →`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
