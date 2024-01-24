'use client';

import React from 'react';
import classnames from 'classnames';

import { SubmitButtonProps } from './SubmitButton.props';

const SubmitButton: React.FC<SubmitButtonProps> = ({
  className = '',
  disabled = false,
  children,
  actionHandler,
}) => {
  const btnClass = classnames(
    'xl:bg-primary-dark-300 xl:mediaHover:hover:bg-primary-dark-400 xl:bg-primary-dark-400',

    'flex items-center justify-center w-[224px] h-[51px] bg-primary-dark-300 md:w-[179px] text-white text-base rounded-normal leading-extended -tracking-[0.64px]',

    'mediaHover:hover:cursor-pointer mediaHover:hover:font-bold focus:font-bold',

    'transition-all duration-300',
    className,
  );

  return (
    <button
      id="submitButton"
      type="submit"
      onClick={actionHandler}
      className={btnClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
