// == Import npm
import React from 'react';

// == Import
//import 'semantic-ui-css/semantic.min.css'
import './styles.module';
// Sémantic-ui styles

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
