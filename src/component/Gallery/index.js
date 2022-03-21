import React, { useEffect, useState } from 'react';

// Hook =>
import { useFetchImages } from '../../hook/useFetchImages';
import { useGetWindowWidth } from '../../hook/useGetWindowWidth';
import { useColumnsNumber } from '../../hook/useColumnsNumber';

// Styles =>
import './styles.module.scss';

// Import component =>
import Spinner from '../Snipper';
import Columns from './Columns'

// => Component
const Gallery = () => {

  const [images, error, loading, page, setPage] = useFetchImages(); //datas images
  const columns = useColumnsNumber(); // nrb of columns
  const [slicedImages, setSlicedImages] = useState([])

  // Je veux diviser mon tableau original en sous tableau en fonction du nombre de colones
  // Ensuite je distribue chaque tableau à chaque colonne
  // ex: => 
  // [30] => [[10], [10], [10]] // 3 colonnes affichées
  // [30] => [[15], [15]] // 2 colonnes affichées
  // [30] => [[30]] => 1 colonne affichée
  useEffect(() => {
    const totalImages = images.length
    const imagesPerColumns = totalImages / columns

    if (columns === 1) {
      setSlicedImages([images])
    }

    if (columns === 2) {
      const firstColumn = images.slice(0, Math.ceil(imagesPerColumns));
      const secondColumn = images.slice(Math.ceil(imagesPerColumns), images.length)

      setSlicedImages([
        firstColumn,
        secondColumn
      ])
    }

    if (columns === 3) {
      const firstColumn = images.slice(0, Math.ceil(imagesPerColumns));
      const secondColumn = images.slice(Math.ceil(imagesPerColumns), Math.ceil(imagesPerColumns) + Math.floor(imagesPerColumns))
      const thirdColumn = images.slice(- Math.floor(imagesPerColumns), images.length)

      setSlicedImages([
        firstColumn,
        secondColumn,
        thirdColumn
      ])
    }


  }, [images, columns])

  if (error)
    return (
      <p>
        Nous sommes désolé une erreur s'est produite lors du chargement des
        images
      </p>
    );
  if (loading && page === 1) return <Spinner />;

  // Return component =>
  return (

    <main className="gallery" style={{ '--col': columns }}>
      <div className="wrapper">
        {slicedImages.map((listImages, i) => (<Columns images={listImages} />))}
      </div>
      <button onClick={() => setPage(() => page + 1)}>CLick</button>
    </main>
  );
};

export default Gallery;
