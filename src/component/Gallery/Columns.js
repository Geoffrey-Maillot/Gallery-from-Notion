import React from 'react';

// Styles =>
import './styles.module.scss';

// => Component
const Columns = ({ images }) => {

  // Return component =>
  return (
    <div>
      {images.map((image) => (
        <figure key={image.id}>
          <img src={image.download_url} alt="" />
        </figure>
      ))}


    </div>
  );
};

export default Columns;
