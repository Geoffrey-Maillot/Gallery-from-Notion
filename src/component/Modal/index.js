import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';


// Import style =>
import './styles.modale.scss';

const Modal = ({ children, setModalIsOpen }) => {


  // Je veux que le focus soit sur la modal quand elle s'ouvre
  // ce qui permet de parcourir la modal avec la tabulation 
  // Si un élément de la modal doit avoir le focus à l'ouverture (ex: un input) alors on le fait pas.

 

  const onKeyDownCloseModal = ({ keyCode }) => {
    if (keyCode === 27) {
      setModalIsOpen(false)
    }
  }
  const closeModalOnClick = (evt) => {
    if (evt.target.className === 'carroussel') {
      setModalIsOpen(false)
    }
  };


  // Return =>
  return (
    <div className="modal" onKeyDown={(e) => onKeyDownCloseModal(e)} onClick={closeModalOnClick}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
  children: PropTypes.object
};






export default Modal;
