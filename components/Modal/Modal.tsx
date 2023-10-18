'use client';

import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { useState, useEffect, useCallback } from 'react';

import { IconBtn } from '@/components';
import { ModalProps } from './Modal.props';

const Modal: React.FC<ModalProps> = ({
  staticData,
  isOpen = false,
  isReview,
  onCloseClick,
  children,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const portalRef = document.getElementById('modal');
    if (portalRef) {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isModalOpen]);

  const handleClose = useCallback(() => {
    onCloseClick();
    setIsModalOpen(false);
  }, [onCloseClick]);

  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleClose]);

  const handleBackdropClose = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      if (evt.target === evt.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  return (
    isReady &&
    createPortal(
      <div
        className={classNames({
          'fixed inset-0 z-20 flex items-center justify-center rounded-extended  bg-black-backdrop/25 backdrop-blur-sm transition-all duration-300':
            true,
          'invisible opacity-0': !isModalOpen,
          'visible opacity-100': isModalOpen,
        })}
        onClick={handleBackdropClose}
      >
        <div
          className={classNames({
            'relative max-h-[497px] max-w-[280px] overflow-hidden rounded-extended bg-white px-[20px] pb-[40px] pt-[56px] md:max-h-[639px] md:max-w-[704px] xl:max-h-[664px]  xl:max-w-[1240px]':
              true,
            'md:p-[80px] ': isReview,
            'md:px-[24px] md:py-[60px] xl:px-[100px] xl:py-[80px] smOnly:w-[80%] smOnly:max-w-[440px]':
              !isReview,
          })}
        >
          <IconBtn
            variant="close"
            icon="close"
            iconFunction={staticData.close.iconFunction}
            iconLabel={staticData.close.iconLabel}
            onClick={handleClose}
          />
          {children}
        </div>
      </div>,
      document.getElementById('modal')!,
    )
  );
};

export default Modal;
