import React from 'react';
import PropTypes from 'prop-types';


// import plugins
import LazyLoad from 'react-lazyload';

// Styles =>
import './styles.module.scss';


// => Component
const Columns = ({ images, setModalIsOpen, setDisplayedImageModal }) => {



  const onClickOpenModal = (e) => {
    setDisplayedImageModal(e.target.dataset.id)
    setModalIsOpen(true)
  }
  const onKeyDownOpenModal = ({ keyCode }) => {
    if (keyCode === 19) {
      setModalIsOpen(true)
    }
  }

  // Return component =>
  return (
    <div className='column'>
      {images.map((image) => (
        <LazyLoad height={'100%'} key={image.properties.Image.files[0].id}>
          <figure className='item' role="dialog" tabIndex={0} onClick={(e) => onClickOpenModal(e)} onKeyDown={(e) => onKeyDownOpenModal(e)}>
            <img src={image.properties.Image.files[0].file.url} data-id={image.id} alt="" async lazy="true" />
          </figure>
        </LazyLoad>
      ))}
    </div>
  );
};

Columns.propTypes = {
  images: PropTypes.array.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  setDisplayedImageModal: PropTypes.func.isRequired
};



export default Columns;
