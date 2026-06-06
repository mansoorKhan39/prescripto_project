import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const endpoint = state === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = state === 'Sign Up' ? { name, email, password } : { email, password }
      const { data } = await axios.post(backendUrl + endpoint, payload)
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { if (token) navigate('/') }, [token])

  return (
    <div className='min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white rounded-3xl shadow-xl shadow-blue-100/50 p-8 border border-gray-100 animate-fadeInUp'>
          {/* Logo */}
          <div className='flex justify-center mb-6'>
            <img src={assets.logo} alt='Prescripto' className='h-10' />
          </div>

          <h2 className='text-2xl font-bold text-gray-800 text-center mb-1'>
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className='text-gray-400 text-sm text-center mb-7'>
            {state === 'Sign Up' ? 'Sign up to book your appointment' : 'Login to your account'}
          </p>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            {state === 'Sign Up' && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1.5'>Full Name</label>
                <input
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='John Doe'
                  required
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
                />
              </div>
            )}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>Email Address</label>
              <input
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='you@example.com'
                required
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1.5'>Password</label>
              <input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Min. 8 characters'
                required
                className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-primary text-white font-semibold py-3.5 rounded-xl mt-2 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 active:scale-100'
            >
              {state === 'Sign Up' ? 'Create Account →' : 'Login →'}
            </button>
          </form>

          <p className='text-sm text-gray-500 text-center mt-5'>
            {state === 'Sign Up' ? (
              <>Already have an account?{' '}<span onClick={() => setState('Login')} className='text-primary font-medium cursor-pointer hover:underline'>Login here</span></>
            ) : (
              <>New to Prescripto?{' '}<span onClick={() => setState('Sign Up')} className='text-primary font-medium cursor-pointer hover:underline'>Create account</span></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
