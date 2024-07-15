
import React,{useState} from 'react'
import './NavMenu.css'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div>
        <nav className='navbar'>
      <div className='nav-section'>
        <img src='https://res.cloudinary.com/dfaxgzkuc/image/upload/v1721017584/qqkdyoxfn3dwoau9cpxc.png' alt='Logo' className='nav-logo' />
        <button className='nav-toggle' onClick={toggleMenu} >
          ☰
        </button>
        <div className={`nav-links ${isOpen ? 'nav-links-open' : ''}`}>
          <a href='#home'>HOME</a>
          <a href='#about'>ABOUT US</a>
          <a href='#contact'>CONTACT US</a>
          <a href='#signup'>SIGN UP</a>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Header