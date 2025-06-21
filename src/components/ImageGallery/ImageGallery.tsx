import React, { FC } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import s from './ImageGallery.module.css';
import { Image } from '../App.types';

interface ImageGalleryProps {
  arr: Image[];
  handleOpenImage: (img: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ arr, handleOpenImage }) => {
  return (
    <div>
      {arr.length > 0 && (
        <ul className={s.flex}>
          {arr.map(item => (
            <li key={item.id}>
              <ImageCard
                url={item.urls.small}
                alt={item.alt_description}
                handleOpenImage={handleOpenImage}
                urlModal={item.urls.regular}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageGallery;
