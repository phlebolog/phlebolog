import { Locale } from '@/i18n.config';
import { LocaleSwitcher, Logo, BurgerMenu } from '@/components';
import { getDictionary } from '@/utils/dictionary';
import OpenFormButton from '../Buttons/OpenFormButton/OpenFormButton';
import { IIconBtnData } from '@/types';
import { IForm } from '../Form/Form.props';

const Header = async ({
  lang,
  staticData,
}: {
  lang: Locale;
  staticData: { iconBtnData: IIconBtnData; form: IForm };
}) => {
  const { navigation, header, socials } = await getDictionary(lang);
  const { linkButton, formButton, langButton } = header;
  const { telegram } = socials;

  return (
    <header className="fixed top-0 z-10 w-full bg-body/90 pb-3  pt-6  md:pb-6 xl:pt-7">
      <div className="container">
        <div className="wrapper relative flex items-center justify-between">
          <Logo lang={lang} />

          <div className="flex items-center gap-3 xl:gap-2">
            <div className="hidden items-center gap-3 md:flex xl:gap-2">
              <a
                href={telegram}
                className="outline-without flex items-center justify-center rounded-normal bg-white px-3
                  py-3 text-[12px] font-medium uppercase leading-normal -tracking-[0.48px] text-black-dark transition-all
                  duration-300 hover:bg-gray-extra hover:font-bold focus:bg-gray-extra focus:font-bold md:w-[140px] "
                rel="noopener noreferrer nofollow"
                target="_blank"
              >
                {linkButton}
              </a>
              <LocaleSwitcher
                variant="header"
                data={langButton}
                className="hidden xl:flex xl:w-[90px] xl:px-10"
              />

              <OpenFormButton staticData={staticData}>
                {formButton}
              </OpenFormButton>
            </div>
            <BurgerMenu
              staticData={{ navigation, header, socials }}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
