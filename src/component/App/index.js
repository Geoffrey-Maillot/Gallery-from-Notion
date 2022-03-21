// == Import npm
import React from 'react';

// == Import
import './styles.module';

// Import components =>
import Gallery from '../Gallery';
import Header from '../Header';

// == Composant
const App = () => {

  return (
    <>
      <Header />
      <Gallery />
    </>
  )
};

// == Export
export default App;
