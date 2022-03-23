import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// Import styles =>
import './styles.modales.scss';

const Carroussel = ({
  setModalIsOpen,
  displayedImageModal,
  setDisplayedImageModal,
  images,
}) => {
  const [indexImage, setIndexImage] = useState(null); // Index de l'image affiché
  const [imageToDisplay, setImageToDisplay] = useState(''); // L'id de l'image à afficher

  const urlImage = imageToDisplay.properties?.Image?.files[0]?.external?.url;
  const author = imageToDisplay.properties?.Auteur?.select?.name;
  const name = imageToDisplay.properties?.Name?.title[0]?.text?.content;
  const description =
    imageToDisplay.properties?.Description?.rich_text[0]?.text?.content;
  const alt = imageToDisplay.properties?.Categorie?.multi_select[0]?.name;

  // L'orsque le composant charge, je filtre l'item à afficher dans la modal
  //  avec son id récupérer lors du clic sur l'image dans la galerie
  useEffect(() => {
    const image = images.find((image, i) => {
      setIndexImage(i);
      return image.id === displayedImageModal;
    });
    setImageToDisplay(image);
  });

  // Je veux afficher l'image qui se trouve à l'index supérieur ou inférieur
  const swipeImage = (e) => {
    // L'index est égal à l'index de l'image actuel + 1 ou -1
    // Si on arrive sur l'une des extrémité du tableau, on va directement à l'autre extrémité
    if (e.target.dataset.id === 'right') {
      const index = indexImage + 1 === images.length ? 0 : indexImage + 1;
      setDisplayedImageModal(images[index].id);
    }
    if (e.target.dataset.id === 'left') {
      const index = indexImage - 1 < 0 ? images.length - 1 : indexImage - 1;
      setDisplayedImageModal(images[index].id);
    }
  };

  /*
    Close Modal
  */
  const onClickCloseModal = () => {
    setModalIsOpen(false);
  };

  const onKeyDownCloseModal = ({ keyCode }) => {
    if (keyCode === 27 || keyCode === 13) {
      setModalIsOpen(false);
    }
  };

  const modalElem = useRef(null);

  useEffect(() => {
    modalElem.current.focus();
  }, []);

  // Return =>
  return (
    <>
      <div className="carroussel">
        <button
          className="carrousselButton left"
          data-id="left"
          onClick={(e) => swipeImage(e)}
        >
          {' '}
          <i
            className="gg-chevron-left"
            data-id="left"
            onClick={(e) => swipeImage(e)}
          ></i>{' '}
        </button>
        <div
          className="carrousselContent"
          ref={modalElem}
          id="dialog"
          role="dialog"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-desc"
          aria-modal="true"
          aria-hidden="true"
          tabIndex="-1"
        >
          <div className="carrousselHeader">
            <button
              className="headerButton"
              tabIndex="1"
              onClick={onClickCloseModal}
              onKeyDown={(e) => onKeyDownCloseModal(e)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {name && <h2 className="headerName">{name}</h2>}
          </div>
          {imageToDisplay && (
            <figure className="carrousselImage">
              <img src={urlImage} alt={alt} async lazy="true" />
              {author && <div className="author">@ {author}</div>}
            </figure>
          )}

          {description && <p className="description"> {description} </p>}
        </div>
        <button
          className="carrousselButton right"
          data-id="right"
          onClick={(e) => swipeImage(e)}
        >
          <i
            className="gg-chevron-right"
            data-id="right"
            onClick={(e) => swipeImage(e)}
          ></i>
        </button>
      </div>
    </>
  );
};

Carroussel.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
  displayedImageModal: PropTypes.string,
  setDisplayedImageModal: PropTypes.func,
  images: PropTypes.array,
};

export default Carroussel;
