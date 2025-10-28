import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuthenticaionSlice } from '../../store/features/authentication'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    if (e.target.type == 'email')
      setEmail(e.target.value)
    else
      setPassword(e.target.value)
  }

  async function handleLogin(e) {
    e.preventDefault()
    const token = await axios({ method: "post", url: 'https://erp-system-1-1p63.onrender.com/api/student/login', data: { email: email, password: password }, withCredentials: true, },)
    if ('token' in token.data) {

      localStorage.setItem('token', token.data.token)
      dispatch(setAuthenticaionSlice(true))

      navigate('/loggedin/Overview')
    }
    else
      setMessage(token.data.message)
  }
  return (
    <div className="login-container bg-cover bg-[url(https://images.unsplash.com/photo-1580983559367-0dc2f8934365?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-center items-center bg-[url(/images/background.jpg)] h-screen">
      <form className="bg-stone-100 rounded-lg sub-container max-w-80 shadow-sm p-10 m-auto flex flex-col gap-4" onSubmit={handleLogin}>

        <p>Welcome To erp login</p>
        <input type="email" onChange={handleChange} required placeholder='Enter Your email' className='border-1 p-1 rounded-sm' />
        <input type="password" onChange={handleChange} required placeholder='Enter Your Password' className='border-1 p-1 rounded-sm' />
        <p>Forgot Password?</p>
        <button type='submit' className='text-center text-white bg-emerald-400 rounded-sm py-2 px-5'>Login</button>
        <div className='text-red-500'>{message}</div>

      </form>
    </div>
  )
}

export default Login