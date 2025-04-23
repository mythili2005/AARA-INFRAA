import React, { useState, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the mobile menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        // Parse only if the stored data is valid
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user'); // Remove corrupted data
      }
    }
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Reset user state
  };

  const navItem = [
    { link: 'Home', path: '/' },
    { link: 'About', path: '/about' },
    { link: 'Services', path: '/services' },
    { link: 'Portfolio', path: '/portfolio' },
    { link: 'Working', path: '/working' },
    { link: 'Testimonials', path: '/testimonials' },
    { link: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="w-full flex bg-white justify-between items-center gap-1 lg:px-16 px-6 py-4 sticky top-0 z-50">
      <h1 className="text-black md:text-4xl text-3xl font-bold font-rubik">
        AARA <span className="text-yellow-500">INFRAA</span>
      </h1>

      <ul className="lg:flex justify-center items-center gap-6 hidden">
        {navItem.map(({ link, path }) => (
          <Link
            key={path}
            className="text-black uppercase font-bold cursor-pointer p-3 rounded-full hover:bg-yellow-500 hover:text-black text-[15px]"
            to={path}
          >
            {link}
          </Link>
        ))}

        {/* Display the user info or logout */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-black">{user.fullName || user.email}</span>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            className="text-black uppercase font-bold cursor-pointer p-3 rounded-full hover:bg-yellow-500 hover:text-black text-[15px]"
            to="/authPage"
          >
            Sign Up / Log In
          </Link>
        )}
      </ul>

      {/* Mobile menu */}
      <div className="flex justify-between items-center lg:hidden mt-3" onClick={toggleMenu}>
        <div>
          {isMenuOpen ? (
            <FaTimes className="text-yellow-500 text-3xl cursor-pointer" />
          ) : (
            <FaBars className="text-yellow-500 text-3xl cursor-pointer" />
          )}
        </div>
      </div>
      <div
        className={`${isMenuOpen ? 'flex' : 'hidden'} w-full h-fit bg-yellow-500 p-4 absolute top-[72px] left-0`}
        onClick={closeMenu}
      >
        <ul className="flex flex-col justify-center items-center gap-2 w-full">
          {navItem.map(({ link, path }) => (
            <Link
              key={path}
              className="text-black uppercase font-semibold cursor-pointer p-2 rounded-lg hover:bg-black hover:text-white hover:bg-yellow-500 w-full text-center"
              to={path}
            >
              {link}
            </Link>
          ))}

          {/* Mobile display for user login/logout */}
          {user ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-black">{user.fullName || user.email}</span>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              className="text-black uppercase font-bold cursor-pointer p-3 rounded-full hover:bg-yellow-500 hover:text-black text-[15px]"
              to="/authPage"
            >
              Sign Up / Log In
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
