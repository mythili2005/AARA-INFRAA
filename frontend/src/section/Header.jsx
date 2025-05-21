import React, { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
  const onStorageChange = () => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
    const storedAdmin = localStorage.getItem('admin');
    setAdmin(storedAdmin ? JSON.parse(storedAdmin) : null);
  };

  window.addEventListener('storage', onStorageChange);
  return () => window.removeEventListener('storage', onStorageChange);
}, []);


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    setUser(null);
    setAdmin(null);
    navigate('/');
  };

  const navItems = [
    { link: 'Home', path: '/' },
    { link: 'About', path: '/about' },
    { link: 'Services', path: '/services' },
    { link: 'Portfolio', path: '/portfolio' },
    { link: 'Working', path: '/working' },
    { link: 'Testimonials', path: '/testimonials' },
    { link: 'DealerContact', path: '/dealership' },
    { link: 'Products', path: '/product' },
    { link: 'Contact', path: '/contact' },
  ];

  return (
    <nav id='header' className="w-full flex bg-white justify-between items-center gap-1 lg:px-12 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <h1 className="text-black md:text-3xl text-2xl font-bold font-rubik">
        AARA <span className="text-yellow-500">INFRAA</span>
      </h1>

      <ul className="lg:flex justify-center items-center gap-6 hidden">
  {navItems.map(({ link, path }) => (
    <Link
      key={path}
      className="text-black font-semibold cursor-pointer px-3 py-1 rounded-full hover:bg-yellow-500 hover:text-black text-[15px]"
      to={path}
    >
      {link}
    </Link>
  ))}

  {(user || admin) ? (
    <>
      {/* Show user name */}
      {user && (
        <span className="text-black font-semibold px-4 py-2 text-[15px]">
          Hello, {user.fullName || user.name || 'User'}
        </span>
      )}

      <button
        onClick={handleLogout}
        className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-[15px]"
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      className="text-black font-semibold cursor-pointer px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-[15px]"
      to="/authPage"
    >
      Login
    </Link>
  )}
</ul>

      {/* Mobile menu button */}
      <div className="lg:hidden" onClick={toggleMenu}>
        {isMenuOpen ? (
          <FaTimes className="text-yellow-500 text-2xl cursor-pointer" />
        ) : (
          <FaBars className="text-yellow-500 text-2xl cursor-pointer" />
        )}
      </div>

      {/* Mobile menu */}
      <div
        className={`${isMenuOpen ? 'flex' : 'hidden'} w-full bg-yellow-500 p-4 absolute top-[72px] left-0 right-0 shadow-md`}
        onClick={closeMenu}
      >
        <ul className="flex flex-col justify-center items-center gap-3 w-full">
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              className="text-black font-semibold cursor-pointer p-2 rounded-lg hover:bg-black hover:text-white w-full text-center text-[15px]"
              to={path}
            >
              {link}
            </Link>
          ))}

          {(user || admin) ? (
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 w-full text-[15px]"
            >
              Logout
            </button>
          ) : (
            <Link
              className="text-black font-semibold cursor-pointer p-2 rounded-lg bg-white hover:bg-gray-200 w-full text-center text-[15px]"
              to="/authPage"
            >
              Login
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;