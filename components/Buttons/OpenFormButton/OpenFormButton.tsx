'use client';

import { useState } from 'react';
import Modal from '@/components/Modal/Modal';
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';
import Form from '@/components/Form/Form';

const OpenFormButton = ({ children, staticData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonPrimary
        view="header"
        variant="dark"
        className=" py-3 -tracking-[0.48px] md:w-[242px] xl:w-[290px] "
        actionHandler={() => setIsOpen(true)}
      >
        {children}
      </ButtonPrimary>
      <Modal
        staticData={staticData.iconBtnData}
        onCloseClick={() => setIsOpen(false)}
        isOpen={isOpen}
        isReview
      >
        <Form
          staticData={staticData.form}
          setIsOpen={setIsOpen}
          className="mx-auto w-full rounded-extended bg-white p-4 md:w-[560px] md:px-6 md:py-10"
        />
      </Modal>
    </>
  );
};

export default OpenFormButton;
