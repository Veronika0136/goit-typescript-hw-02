import React from 'react';

const ImageCard = ({ url, alt, handleOpenImage, urlModal }) => {
  return (
    <div onClick={() => handleOpenImage(urlModal)}>
      <img src={url} alt={alt} width={320} height={300} />
    </div>
  );
};

export default ImageCard;
