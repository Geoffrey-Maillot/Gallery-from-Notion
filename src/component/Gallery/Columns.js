import React from 'react';
import PropTypes from 'prop-types';


// import plugins
import LazyLoad from 'react-lazyload';

// Styles =>
import './styles.module.scss';


// => Component
const Columns = ({ images, setModalIsOpen }) => {

  const onClickOpenModal = () => {
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
        <LazyLoad height={'100%'} key={image.id}>
          <figure className='item' role="dialog" tabIndex={0} onClick={onClickOpenModal} onKeyDown={(e) => onKeyDownOpenModal(e)}>
            <img src={image.download_url} alt="" async lazy />
          </figure>
        </LazyLoad>
      ))}
    </div>
  );
};

Columns.propTypes = {
  images: PropTypes.array.isRequired,
  setModalIsOpen: PropTypes.func.isRequired
};



export default Columns;
