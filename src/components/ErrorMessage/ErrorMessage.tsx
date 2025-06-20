import React, { FC } from 'react';
import s from './ErrorMessage.module.css';

const ErrorMessage: FC = () => {
  return (
    <div className={s.err}>
      <p>Whoops, something went wrong! Please try reloading this page!</p>
    </div>
  );
};

export default ErrorMessage;
