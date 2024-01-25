import { IIconBtnData } from '@/types';
import { IForm } from '@/components/Form/Form.props';

export type AdvantageItem = {
  id: string;
  title: string;
  description: string;
};

type StaticDataType = {
  advantages: {
    title: string;
    mainQuestion: string;
    advList: AdvantageItem[];
    enrollText: string;
    buttonText: string;
  };
  iconBtnData: IIconBtnData;
  form: IForm;
};

export interface AdvantagesProps {
  staticData: StaticDataType;
  className?: string;
}
