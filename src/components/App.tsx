import React, { useEffect, useState, MouseEvent } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchHits } from '../services/api';
import s from './App.module.css';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageModal from './ImageModal/ImageModal';
import { string } from 'yup';
import { Image } from './App.types';

const App = () => {
  const [hits, setHits] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

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
      } catch (err: any) {
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

  const handleChangeQuery = (newQuery: string): void => {
    setQuery(newQuery);
    setHits([]);
    setPage(0);
    setTotalPages(0);
  };

  const handleChangePage = (): void => {
    setPage(page + 1);
  };

  function openModal(): void {
    setModalIsOpen(true);
  }

  function closeModal(): void {
    setModalIsOpen(false);
  }

  const handleOpenImage = (img: string): void => {
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
