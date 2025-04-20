import React, { useState } from 'react'
import {FaXmark,FaBars} from 'react-icons/fa6'
import {Link} from 'react-scroll'

const Header = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

  }

  const closeMenu = () =>{
    setIsMenuOpen(false);
  }

  const navItem = [
    {
      link: 'Home',path:'home'
    },
    {
      link: 'About',path:'about'
    },
    {
      link: 'Services',path:'services'
    },
    {
      link: 'Projects',path:'projects'
    },
    {
      link: 'Contact',path:'contact'
    },
    {
      link:'Sign Up',path:'signup'
    },
    {
      link:'Log In',path:'login'
    },
  ]


  return (
    <>
      <nav className = 'w-full flex bg-white justify-between items-center gap-1 lg:px-16 px-6 py-4 sticky top-0 z-50'>
          <h1 className='text-black md:text-4xl text-3xl font-bold font-rubik'>AARA 
            <span className='text-yellow-500'>INFRAA</span>
          </h1>
          <ul className='lg:flex justify-center items-center gap-6 hidden'>
            {
                navItem.map(({link,path})=>(
                  <Link key={path} className='text-black uppercase font-bold cursor-pointer p-3 rounded-full
                  hover:bg-yellow-500 hover:text-black text-[15px]' to={path}
                  spy={true} offset={-100} smooth={true}>{link}</Link>

                ))
            }
          </ul>
          
          <Link to="contact" spy={true} smooth={true} offset={-100} duration={500}>
          <button className='bg-yellow-500 hover:bg-black hover:text-white text-black px-10
          py-3 rounded-full font-semibold transform hover:scale-105 transition-transform duration-300
          cursor-pointer md:flex hidden'>REACH US</button>
          </Link>
          {/* mobile menu starts here*/}
          <div className='flex justify-between items-center lg:hidden mt-3 ' onClick={toggleMenu}>
            <div>
              {isMenuOpen ? <FaXmark className='text-yellow-500 text-3xl cursor-pointer'/>:< FaBars className='text-yellow-500 text-3xl 
              cursor-pointer'/>}
            </div>
          </div>
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} w-full h-fit bg-yellow-500 p-4
          absolute top-[72px] left-0`} onClick={closeMenu}>
            <ul className='flex flex-col justify-center items-center gap-2 w-full'>
              {
                navItem.map(({link,path})=> (
                  <Link key={path} className='text-black uppercase font-semibold cursor-pointer p-2 rounded-lg
                  hover:bg-black hover:text-white hover:bg-yellow-500 w-full text-center' to={path} spy={true}
                  offset={-100} smooth={true}>{link}</Link>
                ))
              }
            </ul>
          </div>
      </nav>
    </>
  )
}

export default Header