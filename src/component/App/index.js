// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
//import 'semantic-ui-css/semantic.min.css'
import './styles.module';

// Import Hook
import { useFetchImages } from '../../hook/useFetchImages';

// Import components =>
import Gallery from '../Gallery';
import Header from '../Header';
import Carroussel from '../Carroussel';
import Modal from '../Modal';

// == Composant
const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [images, error, loading, page, setPage, hasMore] = useFetchImages(); //datas images
  const [displayedImageModal, setDisplayedImageModal] = useState('')

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
      <Gallery setModalIsOpen={setModalIsOpen} images={images} error={error} loading={loading} page={page} setPage={setPage} setDisplayedImageModal={setDisplayedImageModal} hasMore={hasMore} />
      {modalIsOpen && (
        <Modal setModalIsOpen={setModalIsOpen}>
          <Carroussel setModalIsOpen={setModalIsOpen} images={images} displayedImageModal={displayedImageModal} setDisplayedImageModal={setDisplayedImageModal} />
        </Modal>
      )}

    </>
  )
};

// == Export
export default App;
