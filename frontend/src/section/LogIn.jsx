import React from 'react'
import { motion } from 'framer-motion'
import { slideUpVariants, zoomInVariants } from './animation'

const Login = () => {
  return (
    <div id='login' className='bg-white w-full'>
      <div className='lg:w-[50%] w-[90%] m-auto py-[60px] flex flex-col items-center'>
        <motion.div initial='hidden' whileInView='visible' variants={slideUpVariants}
          className='w-full flex flex-col justify-center items-center gap-6'>
          <motion.h1 variants={slideUpVariants} className='text-yellow-500 text-2xl'>
            LOGIN
          </motion.h1>
          <motion.h1 variants={slideUpVariants} className='text-black uppercase text-[40px] font-bold text-center'>
            Welcome Back
          </motion.h1>
          <div className='w-[120px] h-[6px] bg-yellow-500'></div>
        </motion.div>

        <motion.form
          initial='hidden'
          whileInView='visible'
          variants={zoomInVariants}
          className='mt-8 w-full flex flex-col gap-4'>
          <input type='email' placeholder='Email' className='px-6 py-3 border-[2px] border-black text-black rounded-lg w-full' />
          <input type='password' placeholder='Password' className='px-6 py-3 border-[2px] border-black text-black rounded-lg w-full' />
          <motion.button variants={zoomInVariants} className='bg-yellow-500 hover:bg-black hover:text-white px-10 py-4 text-black font-bold rounded-lg w-full'>
            LOGIN
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default Login
