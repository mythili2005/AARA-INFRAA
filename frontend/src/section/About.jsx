import React from 'react'
import {motion} from 'framer-motion'
import { slideUpVariants,zoomInVariants } from './animation'
import { Link } from 'react-scroll' 

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
                    AARA INFRAA
                </motion.h1>
                <div className='w-[120px] h-[6px] bg-yellow-500'></div>
                    <p className='text-3xl italic text-gray-50 mt-[60px]'>Protecting Public Spaces with Innovative Solutions</p>
        </motion.div>
        <motion.div initial='hidden' whileInView='visible' variants={slideUpVariants}
        className='lg:w-[40%] w-full flex flex-col justify-center items-start gap-6'>
            
            <p className='text-white text-lg text-justify'>
                At AARA INFRAA, we are dedicated to enhancing public safety and infrastructure with our specialized construction solutions. We design and install high-quality sliding windows around public water purifiers to ensure safety and security in public spaces.
                <br />
                Our commitment to safety is at the core of everything we do. Our sliding windows are not only durable but also designed to blend seamlessly into the environment, providing both functionality and aesthetics. 
                <br />
                Our team of experts ensures that each installation is done with precision and care, making sure the water purifiers are accessible while being safeguarded against potential hazards.
                <br />
                Whether it's for public parks, bus stations, or any other public space, AARA INFRAA is here to provide reliable, secure, and innovative solutions.
            </p>
             <Link to='projects' spy={true} smooth={true} offset={-1} duration={500}>
            <motion.button variants={zoomInVariants} className='bg-yellow-500 hover:bg-white hover:text-black px-10
            py-3 rounded-lg font-bold text-black'>
                LEARN MORE
            </motion.button>
            </Link>
        </motion.div>
    </div>
  )
}

export default About