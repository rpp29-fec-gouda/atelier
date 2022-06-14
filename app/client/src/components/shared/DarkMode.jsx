import React, { useState, useEffect } from 'react';
import './darkMode.css';

const DarkMode = (props) => {
  const [isDarkModeActive, setIsDarkModeActive] = useState(false);

  const switchModes = (mode) => {
    if (mode === 'light') {
      setIsDarkModeActive(false);
    } else if (mode === 'dark') {
      setIsDarkModeActive(true);
    }
  };

  isDarkModeActive ? document.body.classList.add('background-dark') : document.body.classList.remove('background-dark');

  return (
    <div className={isDarkModeActive ? 'toggle-dark' : 'toggle-light'}>
      {isDarkModeActive ?
        <h2 className='light-mode' onClick={() => switchModes('light')}>Light</h2>
        : <h2 className='dark-mode' onClick={() => switchModes('dark')}>Dark</h2>
      }
    </div>
  );
};

export default DarkMode;