'use client';

import { FC } from 'react';

import { AdvantagesProps } from './Advantages.props';
import { Heading, AdvantagesList, OpenFormButton } from '@/components';
import { useWindowWidth } from '@/hooks';

const Advantages: FC<AdvantagesProps> = ({ staticData, className = '' }) => {
  const { isScreenMobile } = useWindowWidth();
  const { title, mainQuestion, advList, enrollText, buttonText } =
    staticData.advantages;

  const { iconBtnData, form } = staticData;

  return (
    <section id="advantages" className={className}>
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="wrapper rounded-medium bg-gray-light pb-[62px] pt-8 md:rounded-extraLarge md:pb-[96px] md:pt-10 xl:rounded-max xl:pb-[128px] xl:pt-16"
        >
          <Heading tag="h2" className="mb-6 md:mb-[41px] xl:mb-9">
            {title}
          </Heading>
          {isScreenMobile ? (
            <>
              <p className="mb-7 whitespace-pre-wrap font-medium leading-normal -tracking-[0.64px]">
                {mainQuestion}
              </p>
              <AdvantagesList advList={advList} />
              <p className="mb-6 whitespace-pre-wrap text-center text-sm leading-normal -tracking-[0.56px]">
                {enrollText}
              </p>
              <OpenFormButton
                staticData={{ iconBtnData, form }}
                view="advantages"
                variant="white"
              >
                {buttonText}
              </OpenFormButton>
            </>
          ) : (
            <div className="flex justify-between">
              <div className="flex flex-col justify-between">
                <p className="mb-0 whitespace-pre-wrap font-medium leading-normal -tracking-[0.64px] xl:text-xl">
                  {mainQuestion}
                </p>
                <div className="flex flex-col">
                  <p className="mb-6 w-[240px] text-start text-base leading-[1.5] -tracking-[0.64px] xl:w-[391px] xl:text-xl xl:leading-[1.2] xl:-tracking-[0.8px]">
                    {enrollText}
                  </p>
                  <OpenFormButton
                    staticData={{ iconBtnData, form }}
                    view="advantages"
                    variant="white"
                  >
                    {buttonText}
                  </OpenFormButton>
                </div>
              </div>
              <AdvantagesList advList={advList} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
