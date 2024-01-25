import {
  ExternalLinkButton,
  OpenFormButton,
  LocaleSwitcher,
} from '@/components';

import { MenuActionsProps } from './MenuActions.props';

const MenuActions: React.FC<MenuActionsProps> = ({ data, actionHandler }) => {
  const { formButton, linkButton, langButton, telegram, iconBtnData, form } =
    data;
  return (
    <div className="flex flex-col gap-2">
      <OpenFormButton
        staticData={{ iconBtnData, form }}
        actionCloseHandler={actionHandler}
        view="menu"
        variant="dark"
      >
        {formButton}
      </OpenFormButton>

      <ExternalLinkButton
        linkto={telegram}
        variant="menu"
        actionHandler={actionHandler}
      >
        {linkButton}
      </ExternalLinkButton>

      <LocaleSwitcher variant="burger-menu" data={langButton} />
    </div>
  );
};

export default MenuActions;
