import React, { FC } from 'react';

interface ImageCardProps {
  handleOpenImage: (img: string) => void;
  url: string;
  urlModal: string;
  alt: string;
}

const ImageCard: FC<ImageCardProps> = ({ url, alt, handleOpenImage, urlModal }) => {
  return (
    <div onClick={() => handleOpenImage(urlModal)}>
      <img src={url} alt={alt} width={320} height={300} />
    </div>
  );
};

export default ImageCard;
