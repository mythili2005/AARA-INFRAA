import React from 'react'
import {motion} from 'framer-motion'
import { slideUpVariants,zoomInVariants } from './animation'

const About = () => {
  return (
    <div className='lg:w-[80%] w-[90%] m-auto py-[60px] flex lg:flex-row flex-col 
    justify-between items-start gap-[50px] 'id='about'>
        <motion.div initial='hidden' whileInView='visible' variants={slideUpVariants}
            className='lg:w-[60%] w-full flex flex-col justify-center items-start gap-6'>
                <motion.h1 variants={slideUpVariants} className='text-yellow-500 text-2xl'>
                    WELCOME TO
                </motion.h1>
                <motion.h1 variants={slideUpVariants} className='text-white uppercase text-[40px] font-bold'>
                    construction Website
                </motion.h1>
                <div className='w-[120px] h-[6px] bg-yellow-500'></div>
                    <p className='text-3xl italic text-gray-50 mt-[60px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, officia!</p>
        </motion.div>
        <motion.div initial='hidden' whileInView='visible' variants={slideUpVariants}
        className='lg:w-[40%] w-full flex flex-col justify-center items-start gap-6'>
            <p className='text-white text-lg text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fugit tempore, cupiditate tenetur commodi corporis, dolores possimus harum explicabo consectetur impedit laudantium dolorem.
                Tenetur error dolor dolorum exercitationem numquam aspernatur illum id eum, consectetur aliquam vero, modi, amet ipsam. Culpa cumque sunt consectetur. Soluta cum, sunt dolorem corporis 
                possimus quas, neque fugit aspernatur ducimus eius assumenda! Nemo magni esse tempora dolorum, placeat temporibus quas. Eius molestiae, nobis excepturi maiores dolorem itaque! Cumque 
                nostrum iure nisi deleniti blanditiis porro veniam, nesciunt a quibusdam, exercitationem voluptate at sint quod recusandae, corrupti fuga animi aspernatur. Quisquam cumque perferendis 
                iste. Voluptatibus laboriosam minima sint?
            </p>
            <motion.button variants={zoomInVariants} className='bg-yellow-500 hover:bg-white hover:text-black px-10
            py-3 rounded-lg font-bold text-black'>
                READMORE
            </motion.button>
        </motion.div>
    </div>
  )
}

export default About