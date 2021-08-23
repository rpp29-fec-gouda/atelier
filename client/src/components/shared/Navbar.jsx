import React from 'react';
import './navbar.css';
import DarkMode from './DarkMode.jsx';

const Navbar = (props) => {

  return (
    <div className='shared-navbar'>
      <div className='shared-logos'>
        <h2 className='dark-on-orange-text'>Gouda</h2>
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