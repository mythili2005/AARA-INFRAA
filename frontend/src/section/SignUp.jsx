import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { slideUpVariants, zoomInVariants } from './animation'
import axios from 'axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match")
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      })

      setMessage(response.data.message || 'Signup successful!')
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      console.error(error)
      setMessage('Signup failed. Try again.')
    }
  }

  return (
    <div id='signup' className='bg-white w-full'>
      <div className='lg:w-[50%] w-[90%] m-auto py-[60px] flex flex-col items-center'>
        <motion.div initial='hidden' whileInView='visible' variants={slideUpVariants}
          className='w-full flex flex-col justify-center items-center gap-6'>
          <motion.h1 variants={slideUpVariants} className='text-yellow-500 text-2xl'>
            SIGN UP
          </motion.h1>
          <motion.h1 variants={slideUpVariants} className='text-black uppercase text-[40px] font-bold text-center'>
            Create Your Account
          </motion.h1>
          <div className='w-[120px] h-[6px] bg-yellow-500'></div>
        </motion.div>

        <motion.form
          initial='hidden'
          whileInView='visible'
          variants={zoomInVariants}
          onSubmit={handleSubmit}
          className='mt-8 w-full flex flex-col gap-4'>
          <input type='text' name='fullName' value={formData.fullName}
            onChange={handleChange}
            placeholder='Full Name' className='px-6 py-3 border-[2px] border-black text-black rounded-lg w-full' />
          <input type='email' name='email' value={formData.email}
            onChange={handleChange}
            placeholder='Email' className='px-6 py-3 border-[2px] border-black text-black rounded-lg w-full' />
          <input type='password' name='password' value={formData.password}
            onChange={handleChange}
            placeholder='Password' className='px-6 py-3 border-[2px] border-black text-black rounded-lg w-full' />
          <input type='password' name='confirmPassword' value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm Password' className='px-6 py-3 border-[2px] border-black text-black rounded-lg w-full' />
          <motion.button
            variants={zoomInVariants}
            type='submit'
            className='bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full'>
            SIGN UP
          </motion.button>
          {message && <p className='text-center text-red-600 mt-2'>{message}</p>}
        </motion.form>
      </div>
    </div>
  )
}

export default Signup
