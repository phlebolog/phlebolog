import { Locale } from '@/i18n.config';
import { IIconBtnData } from '@/types';
import { IForm } from '@/components/Form/Form.props';

type StaticDataType = {
  hero: {
    title: string;
    topText: string;
    middleText: string;
    bottomText: string;
    buttonText: string;
  };
  iconBtnData: IIconBtnData;
  form: IForm;
};

export interface HeroProps {
  staticData: StaticDataType;
  lang: Locale;
  className?: string;
}
