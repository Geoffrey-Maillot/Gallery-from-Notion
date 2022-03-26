import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

// => Plugin
import { Button } from 'semantic-ui-react'

// Hook =>
import { useColumnsNumber } from '../../hook/useColumnsNumber';

// Styles =>
import './styles.module.scss';

// Import component =>
import Spinner from '../Snipper';
import Columns from './Columns'

// => Component
const Gallery = ({ setModalIsOpen, images, error, loading, page, setPage, setDisplayedImageModal, hasMore }) => {

  /**
   * Distribute the list of object between several array
   * @param {number} nbColumn Number of column displayed
   * @returns {array} 
   */
  const distributeArray = (nbColumn = 1) => {
    let count = 0; // Count for know in which array push the object
    const columns = []; // Array who contain 1, 2 or 3 array depending of "nbColumn"

    // Create array in "columns" depending "nbColumn"
    for (let i = 1; i <= nbColumn; i++) {
      columns.push([]);
    };

    // Push alternately each object "image" in each array in who are in "column"
    images.forEach((image) => {
      count = count === nbColumn ? 0 : count
      columns[count].push(image);
      count++
    })

    return columns
  }

  const columns = useColumnsNumber(); // nrb of columns
  const [slicedImages, setSlicedImages] = useState([])

  useEffect(() => {

    setSlicedImages(distributeArray(columns))

  }, [images, columns])


  if (error)
    return (
      <p className='error'>
        Nous sommes désolé une erreur s'est produite lors du chargement des
        images
      </p>
    );
  if (loading && page === 1) return <Spinner />;

  // Return component =>
  return (

    <main className="gallery" style={{ '--col': columns }}>
      <div className="wrapper">
        {slicedImages.map((listImages, i) => (<Columns setModalIsOpen={setModalIsOpen} setDisplayedImageModal={setDisplayedImageModal} images={listImages} key={i} />))}
      </div>
      <div className='buttonLoading'>
        {hasMore && <Button
          onClick={() => setPage(() => page + 1)}
          size='medium'
          loading={loading}

        >
          Chargez plus de photos
        </Button>}

      </div>

    </main>
  );
};
Gallery.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setDisplayedImageModal: PropTypes.func,
  hasMore: PropTypes.bool,
};

Gallery.defaultProps = {
  error: null,
};



export default Gallery;
