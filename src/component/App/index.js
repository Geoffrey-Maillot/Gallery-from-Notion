// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
//import 'semantic-ui-css/semantic.min.css'
import './styles.module';
// Sémantic-ui styles

// Import components =>
import Gallery from '../Gallery';
import Header from '../Header';
import Carroussel from '../Carroussel';
import Modal from '../Modal';

// == Composant
const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const body = document.querySelector('body')
    if (modalIsOpen) {
      body.style.overflow = 'hidden'
    }
    if (!modalIsOpen) {
      body.style.overflow = null
    }
  }, [modalIsOpen])

  return (
    <>
      <Header />
      <Gallery setModalIsOpen={setModalIsOpen} />
      {modalIsOpen && (
        <Modal setModalIsOpen={setModalIsOpen}>
          <Carroussel setModalIsOpen={setModalIsOpen} />
        </Modal>
      )}

    </>
  )
};

// == Export
export default App;
