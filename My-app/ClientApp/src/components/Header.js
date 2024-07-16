
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className='navbar col-12'>
        <div className='nav-section'>
          <img src='https://res.cloudinary.com/dfaxgzkuc/image/upload/v1721017584/qqkdyoxfn3dwoau9cpxc.png' alt='Logo' className='nav-logo' />
          <button className='nav-toggle' onClick={toggleMenu}>
            ☰
          </button>
          <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
            <Link to="#home">HOME</Link>
            <Link to="#about">ABOUT US</Link>
            <Link to="#contact">CONTACT US</Link>
            <Link to="#service">OUR SERVICE</Link>
            <Link to="/signup">SIGN UP</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
