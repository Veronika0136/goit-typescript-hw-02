import React, { FC } from 'react';
import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement('#root');

interface ImageModalProps {
  image: string;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ modalIsOpen, closeModal, image }) => {
  return (
    <Modal
      className={s.content}
      overlayClassName={s.overlay}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <img src={image} alt="photo" />
    </Modal>
  );
};

export default ImageModal;
