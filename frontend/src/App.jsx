import React from 'react'
import Header from './section/Header'
import Home from './section/Home'
import About from './section/About'
import Services from './section/Services'
import Portfolio from './section/Portfolio'
import Working from './section/Working'
import Testimonials from './section/Testimonials'
import Contact from './section/Contact'
import Footer from './section/Footer'
import SignUp from './section/SignUp'
import LogIn from './section/LogIn'

const App = () => {
  return (
    <>
    <Header />
    <Home />
    <About />
    <Services />
    <SignUp />
    <LogIn />
    <Portfolio />
    <Working />
    <Testimonials />
    <Contact />
    <Footer />
    </>
  )
}

export default App