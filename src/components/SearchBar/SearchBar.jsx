import React from 'react';
import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import s from './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: '',
  };

  const handleSubmit = (values, options) => {
    const newQuery = values.query.trim();
    if (newQuery) {
      handleChangeQuery(newQuery);
    } else {
      toast.error('Please enter some text to search for an image');
    }
    options.resetForm();
  };
  return (
    <header className={s.header}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form className={s.form}>
          <Field
            className={s.input}
            name="query"
            placeholder="Search images and photos"
            type="text"
            autoComplete="off"
            autoFocus
          />

          <button className={s.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
