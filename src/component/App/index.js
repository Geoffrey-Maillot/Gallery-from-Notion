// == Import npm
import React, { useEffect } from 'react';

// == Import
import './styles.module';

// Hook =>
import { useFetchImages } from '../hook/useFetchImages';

// Import components =>
import Gallery from '../Gallery';
import Header from '../Header';

// == Composant
const App = () => {

  const [images, error, loading, page, setPage] = useFetchImages()

  return (
    <>
      <Header />
      <Gallery />
      <button onClick={() => setPage(() => page + 1)}>CLick</button>
    </>
  )
};

// == Export
export default App;
