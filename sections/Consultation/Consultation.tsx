// 'use client';

import { FC } from 'react';

import { ConsultationProps } from './Consultation.props';
import { Heading, Form } from '@/components';
// import { useWindowWidth } from '@/hooks';

const Consultation: FC<ConsultationProps> = ({
  staticData,
  className = '',
}) => {
  // const { isScreenMobile } = useWindowWidth();
  // const { title, callText, callTextMobile, form } = staticData;
  const { title, callText, form } = staticData;
  return (
    <section id="consultation" className={className}>
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="wrapper consultation-bg relative rounded-medium bg-primary-dark-400 pb-[62px] pt-6 md:rounded-extraLarge md:pb-[96px] md:pt-10 xl:relative xl:flex xl:justify-between xl:rounded-max xl:pb-[142px] xl:pt-16"
        >
          <Heading
            tag="h2"
            className="mb-5 text-white md:mb-8 md:w-[298px] xl:mb-0 xl:w-[600px] xl:leading-[1]"
          >
            {title}
          </Heading>
          <div className="xl:pt-20">
            <p className="mx-auto mb-4 whitespace-pre-wrap text-center text-sm leading-[1.29] -tracking-[0.56px] text-white md:mb-6 md:text-xl xl:mb-4">
              {/*{isScreenMobile ? callTextMobile : callText}*/}
              {callText}
            </p>
            <Form
              staticData={form}
              className="mx-auto w-full rounded-extended bg-white p-4 md:w-[560px] md:px-6 md:py-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consultation;
