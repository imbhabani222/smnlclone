import React from 'react';
import { HeaderNavigation } from '../payrollProcessing/payrollHeader/payrollHeader';
import { Panel } from '../../../../../libs/common/ui/Panel';
import { Leave_Management_Sub_Menu } from './route';
import { useLocation } from 'react-router-dom';

type Props = {};

const View = (props: Props) => {
  const location = useLocation();

  const compt = () => {
    const comp: any = Leave_Management_Sub_Menu?.find(
      (e: any) => e?.path === location.pathname
    );
    return <comp.component />;
  };

  return (
    <div>
      <HeaderNavigation menus={Leave_Management_Sub_Menu} />
        <div style={{ margin: '15px 20px'}}>
          {compt()}
        </div>
    </div>
  );
};

export default View;
