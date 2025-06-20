import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchHits } from '../services/api';
import s from './App.module.css';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!query) return;

    const abortController = new AbortController();
    const getData = async () => {
      try {
        setLoading(true);
        const data = await fetchHits(query, page, abortController.signal);
        setHits(prev => [...prev, ...data.results]);
        setTotalPages(data.total_pages - 1);
        setError(false);
      } catch (err) {
        // console.log(err);
        if (err.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [query, page]);

  const handleChangeQuery = newQuery => {
    setQuery(newQuery);
    setHits([]);
    setPage(0);
    setTotalPages(0);
  };

  const handleChangePage = () => {
    setPage(page + 1);
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleOpenImage = img => {
    setImage(img);
    openModal();
  };

  return (
    <div className={s.body}>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <ImageGallery arr={hits} handleOpenImage={handleOpenImage} />
      <Loader loading={loading} />
      {error && <ErrorMessage />}
      {page < totalPages && !loading && !error && <LoadMoreBtn onClick={handleChangePage} />}
      <ImageModal modalIsOpen={modalIsOpen} closeModal={closeModal} image={image} />
    </div>
  );
};

export default App;
