import { Locale } from '@/i18n.config';
import {
  ISocials,
  INavigationItemData,
  IHeaderButtonsData,
  IIconBtnData,
} from '@/types';

import { IForm } from '../Form/Form.props';
export interface BurgerMenuProps {
  staticData: BurgerMenuData;
  lang: Locale;
}

type BurgerMenuData = {
  navigation: INavigationItemData;
  header: IHeaderButtonsData;
  socials: ISocials;
  iconBtnData: IIconBtnData;
  form: IForm;
};
