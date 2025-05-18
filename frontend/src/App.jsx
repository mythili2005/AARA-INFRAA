import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './section/Header';
import Home from './section/Home';
import About from './section/About';
import Services from './section/Services';
import Portfolio from './section/Portfolio';
import Working from './section/Working';
import Testimonials from './section/Testimonials';
import Contact from './section/Contact';
import Footer from './section/Footer';
import AuthPage from './section/AuthPage';
import DealershipPage from "./section/DealershipForm";
import ProductsPage from "./section/ProductList";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/working" element={<Working />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/dealership" element={<DealershipPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/authPage" element={<AuthPage />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
