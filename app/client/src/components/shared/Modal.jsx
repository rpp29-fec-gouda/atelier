import React from 'react';
import './modal.css';

const Modal = ({ handleClose, show, children }) => {
  const toggleModal = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={toggleModal}>
      <section className='modal-main'>
        {children}
        <button type='button' onClick={handleClose}>
          Exit
        </button>
      </section>
    </div>
  );
};

export default Modal;