import { Locale } from '@/i18n.config';
import { IBannerData } from '@/types';
import { IIconBtnData } from '@/types';
import { IForm } from '@/components/Form/Form.props';

export interface BannerProps {
  staticData: { banner: IBannerData; iconBtnData: IIconBtnData; form: IForm };
  lang: Locale;
  className?: string;
}
