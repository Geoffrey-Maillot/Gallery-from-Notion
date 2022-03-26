import React from 'react';
import PropTypes from 'prop-types';

// Styles =>
import './styles.module.scss';

// => Component
const Columns = ({ images, setModalIsOpen, setDisplayedImageModal }) => {
  const onClickOpenModal = (e) => {
    setDisplayedImageModal(e.target.dataset.id);
    setModalIsOpen(true);
  };
  const onKeyDownOpenModal = (e) => {
    console.log(e.target.dataset.id)
    if (e.keyCode === 13) {
      setDisplayedImageModal(e.target.dataset.id);
      setModalIsOpen(true);
    }
  };

  // Return component =>
  return (
    <div className="column">
      {images.map((image) => (
        <figure
          className="item"
          role="dialog"
          tabIndex={0}
          onClick={(e) => onClickOpenModal(e)}
          onKeyDown={(e) => onKeyDownOpenModal(e)}
          data-id={image.id}
          key={image.id}
        >
          <img
            src={image.properties?.Image?.files[0]?.external?.url}
            alt={image.properties?.Categorie?.multi_select[0]?.name}
            data-id={image.id}
          />
        </figure>
      ))}
    </div>
  );
};

Columns.propTypes = {
  images: PropTypes.array.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
  setDisplayedImageModal: PropTypes.func.isRequired,
};

export default Columns;
