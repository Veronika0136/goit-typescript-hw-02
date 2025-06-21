import React, { FC } from 'react';
import { PulseLoader } from 'react-spinners';
import s from './Loader.module.css';

interface LoaderProps {
  loading: boolean;
}

const Loader: FC<LoaderProps> = ({ loading }) => {
  return <div className={s.loader}>{loading && <PulseLoader color="#9660c8" />}</div>;
};

export default Loader;
