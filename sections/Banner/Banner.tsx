import fetchNewData from '@/utils/fetchNewData';
import { Heading, OpenFormButton } from '@/components';
import { IFetchedBannerData } from '@/types';
import { BannerProps } from './Banner.props';

const Banner: React.FC<BannerProps> = async ({
  staticData,
  lang,
  className,
}) => {
  const { buttonText, title, description } = staticData.banner;
  const { iconBtnData, form } = staticData;
  let data = {
    title,
    description,
  };

  try {
    const results: IFetchedBannerData = await fetchNewData(lang, 'banner');

    data = { ...results };
  } catch (error) {
    console.log(error);
  }

  return (
    <section id="banner" className={className}>
      <div className="container">
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          className="wrapper banner-bg flex h-[647px] flex-col justify-between rounded-medium pb-[62px] pt-6 md:h-auto md:items-start md:gap-12 md:rounded-extraLarge md:pb-[100px] md:pt-[94px] xl:relative xl:gap-16 xl:rounded-max xl:pb-[269px] xl:pt-[186px]"
        >
          <Heading
            tag="h2"
            className="mx-auto w-[260px] text-center md:mx-0 md:w-[360px] md:text-left xl:w-[592px] xl:text-[64px] xl:!-tracking-[2.56px]"
            variant="main"
          >
            {data.title}
          </Heading>

          <div className="flex flex-col md:flex-col-reverse md:items-end md:gap-6 xl:gap-12">
            <OpenFormButton
              staticData={{ iconBtnData, form }}
              view="banner"
              variant="light"
            >
              {buttonText}
            </OpenFormButton>

            <p className="mx-auto w-[260px] text-center text-xs font-medium !leading-normal -tracking-[0.48px] text-white md:w-[290px] md:text-start md:text-xl md:-tracking-[0.8px] xl:w-[530px] xl:text-left xl:text-2xl xl:-tracking-[0.96px]">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
