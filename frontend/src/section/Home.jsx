import React from 'react'
import heroimg from '../assets/heroimg.png'
import backgroundImage from '../assets/homeimg.webp'
import {motion} from 'framer-motion'
import { slideUpVariants,zoomInVariants } from './animation'
import { Link } from 'react-scroll' 

const Home = () => {
  return (
        <div id = 'home' className='bg-black w-full lg:h-[700px] h-fit m-auto pt-[60px] 
        lg:pt-[0px] lg:px-[150px] px-[20px] flex justify-between items-center lg:flex-row 
        flex-col lg:gap-5 gap-[50px] bg-cover bg-center' style={{backgroundImage:`url(${backgroundImage})`}}>

        <motion.div initial='hidden' whileInView='visible' variants={slideUpVariants}
        className='lg:w-[60%] w-full flex flex-col justify-center items-start lg:gap-8 gap-4'>
            <motion.h1 variants={slideUpVariants} className='text-yellow-500 text-2xl'>
                WE ARE BUILDERS
            </motion.h1>
            <motion.h1 variants={slideUpVariants}
            className='text-white uppercase text-[50px] font-bold' > 
                We will build your dream
            </motion.h1>
            <div className='w-[120px] h-[6px] bg-yellow-500'></div>
                <p className='text-white'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Optio velit aperiam voluptate nam ad hic facere perspiciatis natus dolorum odit.</p>
                <motion.div initial='hidden' whileInView='visible' variants={zoomInVariants}
                className='flex justify-center items-center gap-5'>
                    <motion.button variants={zoomInVariants}
                    className='bg-yellow-500 hover:bg-white hover:text-black px-10 py-3
                    rounded-lg text-black font-bold'>
                        READ MORE
                    </motion.button>
                    <Link to="contact" spy={true} smooth={true} offset={-100} duration={500}>
                    <motion.button variants={zoomInVariants} className='border-white hover:border-yellow-500 hover:text-yellow-500 border-2 px-10 py-3 rounded-lg text-white font-bold '>
                        REACH US
                    </motion.button>
                        </Link>
                </motion.div>
        </motion.div>
        <div className='w-[40%] flex flex-col justify-end items-end'>
            <motion.img initial='hidden' whileInView='visible' variants={zoomInVariants}
            src ={heroimg} alt='hero img' />
            
        </div>
        </div>
  )
}

export default Home