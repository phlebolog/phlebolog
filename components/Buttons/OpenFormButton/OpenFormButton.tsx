'use client';

import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import classnames from 'classnames';

import Form from '@/components/Form/Form';
import { IIconBtnData } from '@/types';
import { IForm } from '@/components/Form/Form.props';

const OpenFormButton = ({
  children,
  staticData,
  actionCloseHandler,
  variant,
  view,
  className = '',
}: {
  children: React.ReactNode;
  staticData: { iconBtnData: IIconBtnData; form: IForm };
  actionCloseHandler?: () => void;
  view: 'header' | 'menu' | 'hero' | 'advantages' | 'banner';
  variant: 'dark' | 'light' | 'white';
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const primaryBtnClass = classnames(
    {
      'bg-primary-dark-300 text-white font-medium  mediaHover:hover:bg-primary-dark-400 focus:bg-primary-dark-400 focus:bg-gray-extra mediaHover:hover:font-bold focus:font-bold':
        variant === 'dark',
    },
    {
      'bg-white-light xl:bg-gray-light  text-primary-dark-400  mediaHover:hover:bg-primary-dark-400 focus:bg-primary-dark-400  mediaHover:hover:bg-white mediaHover:hover:font-bold':
        variant === 'light',
    },
    {
      'bg-white text-black-dark ': variant === 'white',
    },
    {
      'uppercase  md:w-[242px] xl:w-[290px] text-xs': view === 'header',
    },
    {
      'uppercase  w-full text-xs': view === 'menu',
    },

    {
      '  mx-auto mb-2  h-[51px] w-[256px] text-base font-bold focus:bg-white focus:font-bold md:mx-0 md:mb-0 md:ml-auto md:w-[262px] xl:w-[307px]  xl:px-8 xl:font-medium ':
        view === 'hero',
    },
    {
      'h-[51px] w-[256px] text-base hover:font-bold md:mr-auto md:w-[220px]  xl:mb-0  smOnly:mx-auto':
        view === 'advantages',
    },
    {
      ' w-[256px] h-[51px] font-bold xl:font-medium text-base focus:font-bold mx-auto mb-2 md:mx-0 md:mb-0 md:mr-auto xl:w-[183px] xl:px-0 md:w-[186px]':
        view === 'banner',
    },
    'py-3 flex items-center justify-center gap-[10px] rounded-normal  leading-normal -tracking-[0.48px] mediaHover:hover:cursor-pointer',

    'transition-all duration-300',
    className,
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={primaryBtnClass}
      >
        {children}
      </button>
      <Modal
        staticData={staticData.iconBtnData}
        onCloseClick={() => setIsOpen(false)}
        isOpen={isOpen}
        isReview
      >
        <Form
          staticData={staticData.form}
          setIsOpen={setIsOpen}
          actionCloseHandler={actionCloseHandler}
          className="mx-auto w-full rounded-extended bg-white p-4 md:w-[560px] md:px-6 md:py-10"
        />
      </Modal>
    </>
  );
};

export default OpenFormButton;
