import { ILocaleSwitcherData, IIconBtnData } from '@/types';
import { IForm } from '../Form/Form.props';

export interface MenuActionsProps {
  data: MenuActionData;
  actionHandler: () => void;
}

type MenuActionData = {
  formButton: string;
  linkButton: string;
  langButton: ILocaleSwitcherData;
  telegram: string;
  iconBtnData: IIconBtnData;
  form: IForm;
};
