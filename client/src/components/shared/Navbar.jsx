import React from 'react';
import './navbar.css';
import DarkMode from './DarkMode.jsx';

const Navbar = (props) => {

  return (
    <div className='shared-navbar'>
      <div className='shared-logos'>
        <div className={document.body.classList.contains('background-dark') ? 'dark-on-orange-text' : 'dark-on-orange-text'}>Gouda</div>
        <DarkMode />
      </div>
      <div className='shared-announcements'>
        <div className='shared-announcement site-wide uppercase'>Site-wide announcement message!</div>
        <div className='shared-announcement sale-discount uppercase'> - sale / discount offer</div>
        <div className='shared-announcement new-product uppercase'> new product highlight</div>
      </div>
    </div>

  );
};

export default Navbar;