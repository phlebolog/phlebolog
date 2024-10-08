'use client';

import { FC } from 'react';
import classNames from 'classnames';

import getIconByName from '@/utils/getIconByName';

import { IconBtnProps } from './IconBtn.props';

const IconBtn: FC<IconBtnProps> = ({
  icon,
  onClick,
  reverse = false,
  variant,
  className,
  iconFunction,
  iconLabel,
  url,
}) => {
  const { iconRef: Icon } = getIconByName(icon);

  const iconStyles = classNames({
    'fill-current': true,
    'w-full h-full text-secondary-dark fill-transparent':
      variant.toLowerCase() === 'result' ||
      variant.toLowerCase() === 'feedback' ||
      variant.toLowerCase() === 'doctor',
    'w-[24px] h-[24px]':
      variant.toLowerCase() === 'contacts' ||
      variant.toLowerCase() === 'footer',
    'w-[32px] h-[32px] text-notify-error': variant.toLowerCase() === 'location',
    'h-[16px] w-[16px] md:h-[24px] md:w-[24px] text-black':
      variant.toLowerCase() === 'close',
    'h-[24px] w-[24px] md:h-[32px] md:w-[32px] text-black':
      variant === 'formModal',
    'rotate-180': reverse,
  });

  const btnStyles = classNames({
    'flex justify-center items-center rounded-extended': true,
    'transition-colors duration-300': variant.toLowerCase() !== 'location',
    'w-[48px] h-[48px] bg-gray-light hover:bg-white-light focus:hover:bg-white-light overflow-hidden':
      variant.toLowerCase() === 'result' || variant.toLowerCase() === 'doctor',
    'w-[48px] h-[48px] bg-white-light hover:bg-white focus:hover:bg-white overflow-hidden':
      variant.toLowerCase() === 'feedback',
    'w-[36px] h-[36px] text-black-dark bg-gray-light xl:bg-white-light hover:bg-white-light xl:hover:bg-gray-light focus:bg-white-light xl:focus:bg-gray-light':
      variant.toLowerCase() === 'contacts',
    'hidden md:flex w-[36px] h-[36px] text-black-dark bg-white hover:bg-secondary focus:bg-secondary hover:text-white focus:text-white':
      variant.toLowerCase() === 'footer',
    'absolute right-0 top-0 h-[56px] w-[56px] md:h-[80px] md:w-[80px]':
      variant.toLowerCase() === 'close',
    'w-[32px] h-[32px]': variant.toLowerCase() === 'location',
    'absolute right-0 top-0 h-[40px] w-[40px] md:h-[60px] md:w-[60px]':
      variant === 'formModal',
  });

  return (
    <>
      {url ? (
        <a
          href={url}
          onClick={onClick}
          rel="noopener noreferrer nofollow"
          target="_blank"
          className={`${btnStyles} ${className && className}`}
          aria-label={iconFunction}
        >
          <Icon className={iconStyles} aria-label={iconLabel} />
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={btnStyles}
          aria-label={iconFunction}
        >
          <Icon className={iconStyles} aria-label={iconLabel} />
        </button>
      )}
    </>
  );
};

export default IconBtn;
