import React from 'react';

// import plugins
import LazyLoad from 'react-lazyload';

// Styles =>
import './styles.module.scss';

// => Component
const Columns = ({ images }) => {

  // Return component =>
  return (
    <div>
      {images.map((image) => (
        <LazyLoad height={'100%'} key={image.id}>
          <figure >
            <img src={image.download_url} alt="" async lazy />
          </figure>
        </LazyLoad>
      ))}


    </div>
  );
};

export default Columns;
