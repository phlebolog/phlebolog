import { IconBtnName } from '@/types';

export interface IconBtnProps {
  icon: IconBtnName;
  variant:
    | 'result'
    | 'feedback'
    | 'contacts'
    | 'footer'
    | 'location'
    | 'close'
    | 'doctor'
    | 'formModal';
  reverse?: boolean | undefined;
  onClick?: () => void;
  className?: string | undefined;
  iconFunction: string;
  iconLabel: string;
  url?: string | undefined;
}
